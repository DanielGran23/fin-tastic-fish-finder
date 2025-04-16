
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, QrCode } from "lucide-react";

interface QRCodePrinterProps {
  fishId: string;
  fishSpecies: string;
  fishWeight: string;
}

export function QRCodePrinter({ fishId, fishSpecies, fishWeight }: QRCodePrinterProps) {
  const [open, setOpen] = useState(false);

  const handlePrint = () => {
    // Store the current document title
    const originalTitle = document.title;
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      // Generate QR code SVG (simple version for demo)
      const qrSize = 200;
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Print QR Code - ${fishId}</title>
            <style>
              body {
                font-family: system-ui, -apple-system, sans-serif;
                padding: 20px;
                text-align: center;
              }
              .qr-wrapper {
                margin: 20px auto;
                padding: 15px;
                border: 1px dashed #ccc;
                display: inline-block;
              }
              .fish-info {
                margin-top: 15px;
                font-size: 14px;
                color: #333;
              }
              .fish-id {
                font-size: 12px;
                color: #666;
                margin-top: 5px;
              }
              @media print {
                button {
                  display: none;
                }
              }
            </style>
          </head>
          <body>
            <div class="qr-wrapper">
              <div style="width: ${qrSize}px; height: ${qrSize}px; margin: 0 auto;">
                <svg viewBox="0 0 ${qrSize} ${qrSize}" width="${qrSize}" height="${qrSize}">
                  <!-- Simple QR code representation (for demo) -->
                  <rect x="0" y="0" width="${qrSize}" height="${qrSize}" fill="#ffffff"/>
                  <text x="50%" y="50%" text-anchor="middle" font-size="14">
                    QR Code for ID:
                  </text>
                  <text x="50%" y="58%" text-anchor="middle" font-size="12" font-weight="bold">
                    ${fishId}
                  </text>
                </svg>
              </div>
              <div class="fish-info">
                <strong>${fishSpecies}</strong> - ${fishWeight}kg
              </div>
              <div class="fish-id">
                ID: ${fishId}
              </div>
            </div>
            <button onclick="window.print(); window.close();" style="margin-top: 20px; padding: 8px 16px;">
              Print QR Code
            </button>
          </body>
        </html>
      `);
      
      // Close the document and focus on the new window
      printWindow.document.close();
      printWindow.focus();
    }
    
    setOpen(false);
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="h-8 flex items-center gap-1"
        onClick={() => setOpen(true)}
      >
        <QrCode className="h-3.5 w-3.5" />
        <span>QR Code</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Print QR Code</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center py-4">
            <div className="bg-gray-100 p-6 rounded-lg mb-4">
              <QrCode className="h-32 w-32 mx-auto text-ocean-700" />
              <div className="mt-2 text-center">
                <p className="font-medium">{fishSpecies}</p>
                <p className="text-sm text-gray-500">{fishWeight}kg</p>
                <p className="text-xs text-gray-400 mt-1">ID: {fishId}</p>
              </div>
            </div>
            
            <Button onClick={handlePrint} className="gap-2">
              <Printer className="h-4 w-4" />
              Print QR Code
            </Button>
            
            <p className="text-xs text-gray-500 text-center max-w-xs mt-4">
              This will open a print dialog to print a QR code you can attach to this catch for tracking.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
