
import { useState } from "react";
import { Scan } from "lucide-react";
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
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`w-full max-w-md aspect-square rounded-lg border-2 border-dashed border-ocean-300 flex items-center justify-center ${scanning ? 'bg-ocean-50 animate-pulse' : 'bg-white'}`}>
        {scanning ? (
          <div className="text-center">
            <Scan className="w-16 h-16 text-ocean-500 mx-auto animate-bounce" />
            <p className="mt-4 text-ocean-600">Scanning...</p>
          </div>
        ) : (
          <div className="text-center p-6">
            <Scan className="w-16 h-16 text-ocean-300 mx-auto" />
            <p className="mt-4 text-gray-500">Position the QR code within the frame to scan</p>
          </div>
        )}
      </div>
      
      <Button 
        onClick={startScan} 
        disabled={scanning}
        className="bg-ocean-600 hover:bg-ocean-700"
        size="lg"
      >
        {scanning ? "Scanning..." : "Scan QR Code"}
      </Button>
      
      <p className="text-sm text-gray-500 text-center max-w-md">
        For this demo, clicking the scan button will randomly select a fish from our database.
      </p>
    </div>
  );
}
