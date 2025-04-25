
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fishDatabase, Fish, getPurchasedFish, togglePurchasedFish } from "@/data/fishData";
import { Link, useNavigate } from "react-router-dom";
import { Clock, Fish as FishIcon, Trash2, MapPin, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const HistoryPage = () => {
  const [history, setHistory] = useState<Fish[]>([]);
  const [purchasedFish, setPurchasedFish] = useState<string[]>([]);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  // Load history from localStorage
  useEffect(() => {
    loadHistory();
    loadPurchasedFish();
  }, []);
  
  const loadHistory = () => {
    const storedHistory = JSON.parse(localStorage.getItem("scanHistory") || "[]");
    const fishData = storedHistory
      .map((id: string) => fishDatabase[id])
      .filter((fish: Fish | undefined) => fish !== undefined);
    
    setHistory(fishData);
  };
  
  const loadPurchasedFish = () => {
    const purchased = getPurchasedFish();
    setPurchasedFish(purchased);
  };

  const handleTogglePurchased = (fishId: string) => {
    const updated = togglePurchasedFish(fishId);
    setPurchasedFish(updated);
    
    toast({
      title: updated.includes(fishId) ? "Fish marked as purchased" : "Fish removed from purchases",
      description: updated.includes(fishId) 
        ? "This fish has been added to your purchases" 
        : "This fish has been removed from your purchases",
    });
  };
  
  const clearHistory = () => {
    localStorage.removeItem("scanHistory");
    setHistory([]);
    toast({
      title: "History cleared",
      description: "Your scan history has been cleared",
    });
  };

  const viewWorldMap = () => {
    navigate('/world-map');
  };

  return (
    <div className={isMobile ? "px-4 py-4 pb-20" : "container mx-auto px-4 py-16"}>
      <div className={isMobile ? "" : "max-w-3xl mx-auto"}>
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h1 className={`font-bold text-ocean-800 ${isMobile ? "text-xl" : "text-3xl"}`}>Scan History</h1>
          
          <div className="flex gap-2">
            {purchasedFish.length > 0 && (
              <Button 
                variant="outline"
                onClick={viewWorldMap}
                className="bg-ocean-50 text-ocean-600 border-ocean-200 hover:bg-ocean-100"
                size={isMobile ? "sm" : "default"}
              >
                <Globe className="w-4 h-4 mr-2" />
                View Map
              </Button>
            )}
            
            {history.length > 0 && (
              <Button 
                variant="outline" 
                onClick={clearHistory}
                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                size={isMobile ? "sm" : "default"}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>
        
        <Card className={isMobile ? "shadow-sm" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Previous Scans
              </div>
              {history.length > 0 && (
                <div className="text-sm text-muted-foreground font-normal">
                  Check to mark as purchased
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <div className="text-center py-8 md:py-12 text-gray-500">
                <FishIcon className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 opacity-30" />
                <p>No scan history found</p>
                <p className="text-xs md:text-sm mt-1 md:mt-2">When you scan fish QR codes, they will appear here</p>
                <Link to="/scan">
                  <Button className={`mt-4 md:mt-6 bg-ocean-600 hover:bg-ocean-700 ${isMobile ? 'rounded-full px-6' : ''}`}>
                    Scan a Fish QR Code
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {history.map((fish) => (
                  <div key={fish.id} className="flex items-center gap-3 md:gap-4 p-2 md:p-3 hover:bg-gray-50 rounded-md transition-colors border border-gray-100">
                    <Link 
                      to={`/fish/${fish.id}`}
                      className="flex flex-1 items-center gap-3 md:gap-4"
                    >
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-ocean-100 rounded-md flex items-center justify-center">
                        <FishIcon className="w-7 h-7 md:w-10 md:h-10 text-ocean-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-ocean-700 text-base md:text-lg">{fish.name}</p>
                        <p className="text-xs md:text-sm text-gray-500">{fish.origin} • {fish.fishery}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge 
                            className={`text-xs ${
                              fish.stockStatus === "Abundant" ? "bg-green-100 text-green-800" :
                              fish.stockStatus === "Moderate" ? "bg-yellow-100 text-yellow-800" :
                              fish.stockStatus === "Low" ? "bg-orange-100 text-orange-800" :
                              "bg-red-100 text-red-800"
                            }`}
                            variant="outline"
                          >
                            {fish.stockStatus}
                          </Badge>
                          <Badge 
                            className={`text-xs ${
                              fish.recommendation === "Recommended" ? "bg-green-100 text-green-800" :
                              fish.recommendation === "Consider Alternatives" ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }`}
                            variant="outline"
                          >
                            {fish.recommendation}
                          </Badge>
                          {purchasedFish.includes(fish.id) && (
                            <Badge className="bg-ocean-100 text-ocean-700">
                              Purchased
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Link>
                    <div className="flex items-center justify-center">
                      <Checkbox 
                        id={`purchase-${fish.id}`} 
                        checked={purchasedFish.includes(fish.id)}
                        onCheckedChange={() => handleTogglePurchased(fish.id)}
                      />
                    </div>
                  </div>
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
