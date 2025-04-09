
import { Button } from "@/components/ui/button";
import { QRCodeScanner } from "@/components/QRCodeScanner";
import { RecentScans } from "@/components/RecentScans";
import { Link } from "react-router-dom";
import { Scan, Fish, Award, MapPin } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <div className="relative bg-gradient-to-b from-ocean-600 to-ocean-800 py-16">
        <div className="absolute inset-0 opacity-10 wave-pattern animate-wave"></div>
        <div className="container mx-auto px-4 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Know Your Fish</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Scan to discover sustainability metrics, nutritional info, and origins.
          </p>
          <Link to="/scan">
            <Button size="lg" className="bg-white text-ocean-700 hover:bg-ocean-50">
              <Scan className="mr-2 h-5 w-5" />
              Start Scanning
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Features section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-ocean-800">
            Make Informed Choices
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Fish className="h-8 w-8 text-ocean-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-ocean-700">Stock Status</h3>
              <p className="text-gray-600">
                Learn which fish populations are thriving and which are threatened so you can make sustainable choices.
              </p>
            </div>
            
            <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-ocean-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-ocean-700">Nutrition Facts</h3>
              <p className="text-gray-600">
                Discover protein content, omega-3 levels, calories, and mercury levels in the seafood you consume.
              </p>
            </div>
            
            <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-ocean-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-ocean-700">Origin & Fisheries</h3>
              <p className="text-gray-600">
                Track where your seafood comes from and learn about the fisheries and their practices.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent scans section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-ocean-800">
            Your Recent Scans
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <RecentScans />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
