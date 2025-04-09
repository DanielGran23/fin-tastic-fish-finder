
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fishDatabase, Fish } from "@/data/fishData";
import { FishDetail } from "@/components/FishDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const FishDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [fish, setFish] = useState<Fish | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setLoading(true);
    setError(false);
    
    // Simulate loading from an API
    setTimeout(() => {
      if (id && fishDatabase[id]) {
        setFish(fishDatabase[id]);
      } else {
        setError(true);
      }
      setLoading(false);
    }, 300);
  }, [id]);
  
  const goBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !fish) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={goBack} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Fish not found. The requested fish may not exist in our database.
            </AlertDescription>
          </Alert>
          
          <div className="text-center mt-8">
            <Button onClick={() => navigate('/scan')} className="bg-ocean-600 hover:bg-ocean-700">
              Scan Another Fish
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={goBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <FishDetail fish={fish} />
      </div>
    </div>
  );
};

export default FishDetailPage;
