
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fishDatabase, Fish } from "@/data/fishData";
import { Link } from "react-router-dom";
import { Clock, Fish as FishIcon, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const HistoryPage = () => {
  const [history, setHistory] = useState<Fish[]>([]);
  const { toast } = useToast();
  
  // Load history from localStorage
  useEffect(() => {
    loadHistory();
  }, []);
  
  const loadHistory = () => {
    const storedHistory = JSON.parse(localStorage.getItem("scanHistory") || "[]");
    const fishData = storedHistory
      .map((id: string) => fishDatabase[id])
      .filter((fish: Fish | undefined) => fish !== undefined);
    
    setHistory(fishData);
  };
  
  const clearHistory = () => {
    localStorage.removeItem("scanHistory");
    setHistory([]);
    toast({
      title: "History cleared",
      description: "Your scan history has been cleared",
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-ocean-800">Scan History</h1>
          
          {history.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearHistory}
              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear History
            </Button>
          )}
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Previous Scans
            </CardTitle>
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FishIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>No scan history found</p>
                <p className="text-sm mt-2">When you scan fish QR codes, they will appear here</p>
                <Link to="/scan">
                  <Button className="mt-6 bg-ocean-600 hover:bg-ocean-700">
                    Scan a Fish QR Code
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((fish) => (
                  <Link 
                    key={fish.id}
                    to={`/fish/${fish.id}`}
                    className="block"
                  >
                    <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-md transition-colors border border-gray-100">
                      <div className="w-16 h-16 bg-ocean-100 rounded-md flex items-center justify-center">
                        <FishIcon className="w-10 h-10 text-ocean-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-ocean-700 text-lg">{fish.name}</p>
                        <p className="text-sm text-gray-500">{fish.origin} • {fish.fishery}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge 
                            className={
                              fish.stockStatus === "Abundant" ? "bg-green-100 text-green-800" :
                              fish.stockStatus === "Moderate" ? "bg-yellow-100 text-yellow-800" :
                              fish.stockStatus === "Low" ? "bg-orange-100 text-orange-800" :
                              "bg-red-100 text-red-800"
                            }
                            variant="outline"
                          >
                            {fish.stockStatus} Stock
                          </Badge>
                          <Badge 
                            className={
                              fish.recommendation === "Recommended" ? "bg-green-100 text-green-800" :
                              fish.recommendation === "Consider Alternatives" ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }
                            variant="outline"
                          >
                            {fish.recommendation}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HistoryPage;
