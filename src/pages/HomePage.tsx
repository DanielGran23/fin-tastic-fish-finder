import { Button } from "@/components/ui/button";
import { QRCodeScanner } from "@/components/QRCodeScanner";
import { RecentScans } from "@/components/RecentScans";
import { Link, useNavigate } from "react-router-dom";
import { Scan, Fish, Award, MapPin, Waves } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const HomePage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const handleScanClick = () => {
    console.log("Navigating to /scan page");
    navigate('/scan');
  };
  
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Ocean Wave Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="wave-pattern absolute inset-0 animate-wave"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-ocean-50/30"></div>
      </div>

      {/* Hero section */}
      <div className="relative bg-gradient-to-b from-ocean-600 to-ocean-800 py-8 md:py-16 z-10">
        <div className="absolute inset-0 opacity-10 wave-pattern animate-wave"></div>
        <div className="container mx-auto px-4 text-white text-center relative z-20">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">Know Your Fish</h1>
          <p className="text-lg md:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Scan to discover sustainability metrics.
          </p>
          <Button 
            size="lg" 
            className={`bg-white text-ocean-700 hover:bg-ocean-50 ${isMobile ? 'rounded-full px-8' : ''}`}
            onClick={handleScanClick}
          >
            <Scan className="mr-2 h-5 w-5" />
            Start Scanning
          </Button>
        </div>
      </div>
      
      {/* Features section */}
      <div className="bg-white py-8 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-ocean-800">
            Make Informed Choices
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="text-center p-4 md:p-6 border border-gray-100 rounded-lg shadow-sm">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Fish className="h-6 w-6 md:h-8 md:w-8 text-ocean-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-ocean-700">Stock Status</h3>
              <p className="text-sm md:text-base text-gray-600">
                Learn which fish populations are thriving and which are threatened.
              </p>
            </div>
            
            <div className="text-center p-4 md:p-6 border border-gray-100 rounded-lg shadow-sm">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Award className="h-6 w-6 md:h-8 md:w-8 text-ocean-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-ocean-700">Nutrition Facts</h3>
              <p className="text-sm md:text-base text-gray-600">
                Discover protein content, omega-3 levels, and mercury levels.
              </p>
            </div>
            
            <div className="text-center p-4 md:p-6 border border-gray-100 rounded-lg shadow-sm">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <MapPin className="h-6 w-6 md:h-8 md:w-8 text-ocean-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-ocean-700">Origin & Fisheries</h3>
              <p className="text-sm md:text-base text-gray-600">
                Track where your seafood comes from and learn about fisheries.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent scans section */}
      <div className="bg-gray-50 py-8 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-ocean-800">
            Your Recent Scans
          </h2>
          
          <div className="max-w-md mx-auto">
            <RecentScans />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
