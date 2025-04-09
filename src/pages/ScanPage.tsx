
import { QRCodeScanner } from "@/components/QRCodeScanner";

const ScanPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-8 text-ocean-800">Scan Fish QR Code</h1>
      <div className="max-w-xl mx-auto">
        <QRCodeScanner />
      </div>
    </div>
  );
};

export default ScanPage;
