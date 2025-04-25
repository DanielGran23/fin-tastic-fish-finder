import { Button } from "@/components/ui/button";
import { QRCodeScanner } from "@/components/QRCodeScanner";
import { RecentScans } from "@/components/RecentScans";
import { Link, useNavigate } from "react-router-dom";
import { Scan, Fish, Award, MapPin, Sailboat, Waves } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const HomePage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const handleScanClick = () => {
    console.log("Navigating to /scan page");
    navigate('/scan');
  };
  
  return (
    <div className="flex flex-col">
      {/* Hero section with animated fish background */}
      <div className="relative bg-gradient-to-b from-ocean-600 to-ocean-800 py-8 md:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="wave-pattern animate-wave"></div>
          <div className="absolute inset-0 opacity-20">
            {[...Array(6)].map((_, i) => (
              <Fish
                key={i}
                className={`absolute text-white w-8 h-8 animate-float-${i % 3}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4 text-white text-center relative z-10">
          <div className="flex items-center justify-center mb-4">
            <Sailboat className="h-8 w-8 mr-2 text-ocean-200" />
            <h1 className="text-3xl md:text-5xl font-bold">Know Your Fish</h1>
            <Sailboat className="h-8 w-8 ml-2 text-ocean-200 transform scale-x-[-1]" />
          </div>
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
      
      {/* Features section with enhanced styling */}
      <div className="bg-white py-8 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Waves className="absolute text-ocean-400 w-full h-full" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-ocean-800 flex items-center justify-center">
            <Fish className="h-6 w-6 md:h-8 md:w-8 mr-2 text-ocean-600" />
            Make Informed Choices
            <Fish className="h-6 w-6 md:h-8 md:w-8 ml-2 text-ocean-600 transform scale-x-[-1]" />
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
      
      {/* Recent scans section with enhanced ocean theme */}
      <div className="bg-gradient-to-b from-gray-50 to-ocean-50 py-8 md:py-16 relative">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-ocean-800 flex items-center justify-center">
            <Fish className="h-6 w-6 md:h-8 md:w-8 mr-2 text-ocean-600" />
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
