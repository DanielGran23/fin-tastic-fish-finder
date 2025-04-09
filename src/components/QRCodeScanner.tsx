
import { useState } from "react";
import { Scan, ZapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { scanQRCode } from "@/data/fishData";
import { useNavigate } from "react-router-dom";

export function QRCodeScanner() {
  const [scanning, setScanning] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const startScan = () => {
    setScanning(true);
    // This is where we would integrate a real QR code scanner
    // For demo purposes, we'll simulate finding a code after a delay
    toast({
      title: "Scanning...",
      description: "Looking for QR codes",
    });

    setTimeout(() => {
      // Simulate finding a QR code 
      const qrCodes = ["FISH001", "FISH002", "FISH003", "FISH004", "FISH005"];
      const randomQR = qrCodes[Math.floor(Math.random() * qrCodes.length)];
      
      const fish = scanQRCode(randomQR);
      
      if (fish) {
        toast({
          title: "Fish Found!",
          description: `Found ${fish.name}`,
        });
        // Save to recent scans in localStorage
        saveToHistory(fish.id);
        // Navigate to fish detail page
        navigate(`/fish/${fish.id}`);
      } else {
        toast({
          title: "No fish found",
          description: "The scanned QR code is not recognized",
          variant: "destructive",
        });
      }
      
      setScanning(false);
    }, 2000);
  };

  const saveToHistory = (fishId: string) => {
    const history = JSON.parse(localStorage.getItem("scanHistory") || "[]");
    // Add to beginning, avoid duplicates
    const newHistory = [fishId, ...history.filter((id: string) => id !== fishId)].slice(0, 10);
    localStorage.setItem("scanHistory", JSON.stringify(newHistory));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full">
      <div 
        className={`w-full aspect-square rounded-xl border-2 ${scanning ? 'border-ocean-400 animate-pulse' : 'border-dashed border-ocean-300'} flex items-center justify-center relative overflow-hidden`}
      >
        {scanning ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="bg-ocean-500/10 absolute inset-0 z-0"></div>
            <div className="h-px w-full bg-ocean-400 absolute z-10 animate-[wave_2s_ease-in-out_infinite]"></div>
            <Scan className="w-16 h-16 text-ocean-500 mx-auto animate-pulse z-20" />
            <p className="mt-4 text-ocean-600 font-medium z-20">Scanning...</p>
          </div>
        ) : (
          <div className="text-center p-6">
            <div className="mx-auto w-36 h-36 rounded-full bg-ocean-50 flex items-center justify-center mb-4">
              <Scan className="w-16 h-16 text-ocean-400" />
            </div>
            <p className="mt-2 text-gray-500 text-sm">Position the QR code within the frame to scan</p>
          </div>
        )}
      </div>
      
      <Button 
        onClick={startScan} 
        disabled={scanning}
        className="bg-ocean-600 hover:bg-ocean-700 rounded-full px-8 h-14 text-base font-medium shadow-lg"
        size="lg"
      >
        {scanning ? "Scanning..." : "Scan Fish QR Code"}
        {!scanning && <ZapIcon className="ml-2 h-4 w-4" />}
      </Button>
      
      <p className="text-xs text-gray-500 text-center max-w-xs mt-2">
        For this demo, clicking the scan button will randomly select a fish from our database.
      </p>
    </div>
  );
}
