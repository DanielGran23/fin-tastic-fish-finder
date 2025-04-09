
import { QRCodeScanner } from "@/components/QRCodeScanner";
import { useIsMobile } from "@/hooks/use-mobile";

const ScanPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`${isMobile ? 'h-full pt-4' : 'container mx-auto px-4 py-16'}`}>
      {!isMobile && (
        <h1 className="text-3xl font-bold text-center mb-8 text-ocean-800">Scan Fish QR Code</h1>
      )}
      <div className={`${isMobile ? 'h-full px-4' : 'max-w-xl mx-auto'}`}>
        <QRCodeScanner />
      </div>
    </div>
  );
};

export default ScanPage;
