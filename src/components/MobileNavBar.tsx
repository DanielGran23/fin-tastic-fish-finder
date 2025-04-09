
import { Home, Scan, History, Fish } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export function MobileNavBar() {
  const location = useLocation();
  const [userRole, setUserRole] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const storedRole = localStorage.getItem("userRole");
    setUserRole(storedRole);
  }, []);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // If user is a fisherman, provide different navigation
  if (userRole === "fisherman") {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex items-center justify-around py-3 px-2">
          <Link 
            to="/fisherman" 
            className="flex flex-col items-center text-ocean-600"
          >
            <Fish className="w-6 h-6" />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          <Link 
            to="/login" 
            className="flex flex-col items-center text-gray-500"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Change Role</span>
          </Link>
        </div>
      </div>
    );
  }
  
  // Default consumer navigation
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
