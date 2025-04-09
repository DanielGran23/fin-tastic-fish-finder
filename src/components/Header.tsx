
import { Fish, Menu, LogIn, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export function Header() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userRole, setUserRole] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const storedRole = localStorage.getItem("userRole");
    setUserRole(storedRole);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setUserRole(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
  };
  
  const handleLogin = () => {
    navigate("/login");
  };
  
  if (isMobile) {
    return (
      <header className="bg-ocean-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Fish className="h-6 w-6 text-white" />
            <span className="text-lg font-bold">Fin-tastic</span>
          </Link>
          {userRole ? (
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white p-1"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white p-1"
              onClick={handleLogin}
            >
              <LogIn className="h-5 w-5" />
            </Button>
          )}
        </div>
      </header>
    );
  }
  
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Fish className="h-6 w-6 text-ocean-600" />
          <span className="text-xl font-bold text-ocean-700">Fin-tastic Fish Finder</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link to="/" className="text-ocean-600 hover:text-ocean-800 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/scan" className="text-ocean-600 hover:text-ocean-800 transition-colors">
                  Scan
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-ocean-600 hover:text-ocean-800 transition-colors">
                  History
                </Link>
              </li>
            </ul>
          </nav>
          
          {userRole ? (
            <Button 
              variant="outline" 
              size="sm"
              className="ml-4"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm"
              className="ml-4"
              onClick={handleLogin}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
