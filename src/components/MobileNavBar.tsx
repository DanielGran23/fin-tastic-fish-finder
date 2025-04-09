
import { Home, Scan, History } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function MobileNavBar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex items-center justify-around py-3 px-2">
        <Link 
          to="/" 
          className={`flex flex-col items-center ${isActive('/') ? 'text-ocean-600' : 'text-gray-500'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link 
          to="/scan" 
          className={`flex flex-col items-center ${isActive('/scan') ? 'text-ocean-600' : 'text-gray-500'}`}
        >
          <Scan className="w-6 h-6" />
          <span className="text-xs mt-1">Scan</span>
        </Link>
        <Link 
          to="/history" 
          className={`flex flex-col items-center ${isActive('/history') ? 'text-ocean-600' : 'text-gray-500'}`}
        >
          <History className="w-6 h-6" />
          <span className="text-xs mt-1">History</span>
        </Link>
      </div>
    </div>
  );
}
