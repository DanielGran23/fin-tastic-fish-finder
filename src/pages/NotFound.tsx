
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Fish } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-24 h-24 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Fish className="h-12 w-12 text-ocean-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-ocean-700">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">The page you're looking for has swum away.</p>
        <Link to="/">
          <Button className="bg-ocean-600 hover:bg-ocean-700">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
