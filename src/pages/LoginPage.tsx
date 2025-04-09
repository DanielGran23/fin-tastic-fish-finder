
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Fish, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (role: "consumer" | "fisherman") => {
    setLoading(true);
    
    // Store user role in localStorage
    localStorage.setItem("userRole", role);
    
    // Show success toast
    toast({
      title: "Login successful!",
      description: `You are logged in as a ${role}.`,
    });
    
    // Redirect based on role
    setTimeout(() => {
      setLoading(false);
      if (role === "consumer") {
        navigate("/");
      } else {
        navigate("/fisherman");
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-ocean-50 to-ocean-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ocean-700 mb-2">Welcome to Fish Trust</h1>
          <p className="text-ocean-600">Choose how you want to continue</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 space-y-6">
            <div 
              onClick={() => handleRoleSelect("consumer")}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors flex items-center"
            >
              <div className="w-12 h-12 bg-ocean-100 rounded-full flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-ocean-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg text-ocean-700">Consumer</h3>
                <p className="text-sm text-gray-500">Scan and learn about sustainable seafood</p>
              </div>
            </div>

            <div 
              onClick={() => handleRoleSelect("fisherman")}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors flex items-center"
            >
              <div className="w-12 h-12 bg-ocean-100 rounded-full flex items-center justify-center mr-4">
                <Fish className="h-6 w-6 text-ocean-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg text-ocean-700">Fisherman</h3>
                <p className="text-sm text-gray-500">Log your catch and manage your fishing data</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 text-center">
            <Button 
              variant="link" 
              className="text-ocean-600"
              onClick={() => navigate("/")}
              disabled={loading}
            >
              Continue without logging in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
