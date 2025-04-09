
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fish, fishDatabase } from "@/data/fishData";
import { Clock, Fish as FishIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export function RecentScans() {
  const [recentFish, setRecentFish] = useState<Fish[]>([]);
  
  useEffect(() => {
    // Get recent scans from localStorage
    const history = JSON.parse(localStorage.getItem("scanHistory") || "[]");
    const fishData = history
      .map((id: string) => fishDatabase[id])
      .filter((fish: Fish | undefined) => fish !== undefined);
    
    setRecentFish(fishData);
  }, []);

  if (recentFish.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Scans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-gray-500">
            <p>No recent scans</p>
            <p className="text-sm mt-1">Scan a fish to see it here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Scans
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentFish.map((fish) => (
            <Link 
              key={fish.id}
              to={`/fish/${fish.id}`}
              className="block"
            >
              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                <div className="w-12 h-12 bg-ocean-100 rounded-md flex items-center justify-center">
                  <FishIcon className="w-8 h-8 text-ocean-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-ocean-700">{fish.name}</p>
                  <p className="text-xs text-gray-500">{fish.origin}</p>
                </div>
                <Badge 
                  className={
                    fish.recommendation === "Recommended" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                    fish.recommendation === "Consider Alternatives" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" :
                    "bg-red-100 text-red-800 hover:bg-red-200"
                  }
                  variant="outline"
                >
                  {fish.recommendation}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
