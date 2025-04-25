import { Fish } from "@/data/fishData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, BarChart2, ChefHat, Fish as FishIcon, Award, ThumbsUp, ThumbsDown, Anchor, Cloud } from "lucide-react";
import { SustainabilityScore } from "./SustainabilityScore";

interface FishDetailProps {
  fish: Fish;
}

export function FishDetail({ fish }: FishDetailProps) {
  // Helper function to get color based on stock status
  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'Abundant': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Helper function to get color based on recommendation
  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'Recommended': return 'bg-green-100 text-green-800';
      case 'Consider Alternatives': return 'bg-yellow-100 text-yellow-800';
      case 'Avoid': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Helper for mercury level color
  const getMercuryColor = (level: string) => {
    switch (level) {
      case 'Very Low': return 'text-green-600';
      case 'Low': return 'text-green-500';
      case 'Moderate': return 'text-yellow-500';
      case 'High': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  // Helper for emissions rating color
  const getEmissionsColor = (rating: string) => {
    switch (rating) {
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-yellow-500';
      case 'High': return 'text-orange-500';
      case 'Very High': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <Card className="overflow-hidden h-full">
            <div className="h-48 bg-ocean-100 flex items-center justify-center">
              <FishIcon className="w-24 h-24 text-ocean-400" />
            </div>
            <CardContent className="pt-4">
              <h1 className="text-2xl font-bold text-ocean-700">{fish.name}</h1>
              <p className="text-sm text-gray-500 italic">{fish.scientificName}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className={getStockStatusColor(fish.stockStatus)} variant="outline">
                  {fish.stockStatus} Stock
                </Badge>
                <Badge className={getRecommendationColor(fish.recommendation)} variant="outline">
                  {fish.recommendation}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-2/3 space-y-4">
          <SustainabilityScore fish={fish} />
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <ThumbsUp className={`h-5 w-5 ${fish.recommendation === 'Recommended' ? 'text-green-500' : 'text-gray-400'}`} />
                <ThumbsDown className={`h-5 w-5 ${fish.recommendation === 'Avoid' ? 'text-red-500' : 'text-gray-400'}`} />
                Consumer Advice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{fish.description}</p>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-ocean-500" />
                  Origin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="font-medium">{fish.origin}</p>
                  <p className="text-sm text-gray-500">Fishery: {fish.fishery}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-ocean-500" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {fish.certifications.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {fish.certifications.map((cert) => (
                      <Badge key={cert} variant="secondary">{cert}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No certifications</p>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-ocean-500" />
                Nutrition Facts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Protein</p>
                  <p className="text-lg font-bold">{fish.nutrition.protein}g</p>
                  <p className="text-xs">per 100g</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Omega-3</p>
                  <p className="text-lg font-bold">{fish.nutrition.omega3}g</p>
                  <p className="text-xs">per 100g</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Calories</p>
                  <p className="text-lg font-bold">{fish.nutrition.calories}</p>
                  <p className="text-xs">per 100g</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Mercury</p>
                  <p className={`text-lg font-bold ${getMercuryColor(fish.nutrition.mercury)}`}>
                    {fish.nutrition.mercury}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Anchor className="h-5 w-5 text-ocean-500" />
                  Fishing Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{fish.fishingMethod}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-ocean-500" />
                  CO2 Emissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{fish.co2Emissions.value} kg CO2 per kg</p>
                  <Badge 
                    className={`ml-2 ${
                      fish.co2Emissions.rating === "Low" ? "bg-green-100 text-green-800" :
                      fish.co2Emissions.rating === "Medium" ? "bg-yellow-100 text-yellow-800" :
                      fish.co2Emissions.rating === "High" ? "bg-orange-100 text-orange-800" :
                      "bg-red-100 text-red-800"
                    }`}
                    variant="outline"
                  >
                    {fish.co2Emissions.rating}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
