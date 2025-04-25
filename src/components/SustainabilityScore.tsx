
import { Award } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ScoreProps {
  score: number;
  label: string;
  color: string;
}

const ScoreIndicator = ({ score, label, color }: ScoreProps) => {
  const getScoreText = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Very Good";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Poor";
  };

  return (
    <div className="text-center">
      <div className={`relative w-24 h-24 mx-auto mb-2`}>
        <div className={`absolute inset-0 rounded-full ${color} opacity-20`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold">{score}</span>
        </div>
      </div>
      <Badge variant="outline" className={color}>
        {getScoreText(score)}
      </Badge>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
};

interface Props {
  fish: {
    stockStatus: string;
    recommendation: string;
    co2Emissions: {
      rating: string;
    };
    nutrition: {
      protein: number;
      omega3: number;
      mercury: string;
    };
    certifications: string[];
  };
}

export const SustainabilityScore = ({ fish }: Props) => {
  const calculateSustainabilityScore = () => {
    let score = 0;
    
    // Stock status impact (0-30 points)
    switch (fish.stockStatus) {
      case "Abundant": score += 30; break;
      case "Moderate": score += 20; break;
      case "Low": score += 10; break;
      case "Critical": score += 0; break;
    }
    
    // Recommendation impact (0-30 points)
    switch (fish.recommendation) {
      case "Recommended": score += 30; break;
      case "Consider Alternatives": score += 15; break;
      case "Avoid": score += 0; break;
    }
    
    // CO2 emissions impact (0-20 points)
    switch (fish.co2Emissions.rating) {
      case "Low": score += 20; break;
      case "Medium": score += 13; break;
      case "High": score += 7; break;
      case "Very High": score += 0; break;
    }
    
    // Certifications impact (0-20 points)
    score += Math.min(fish.certifications.length * 10, 20);
    
    return score;
  };
  
  const calculateHealthScore = () => {
    let score = 0;
    
    // Protein content impact (0-30 points)
    score += Math.min(fish.nutrition.protein * 1.5, 30);
    
    // Omega-3 content impact (0-40 points)
    score += Math.min(fish.nutrition.omega3 * 20, 40);
    
    // Mercury level impact (0-30 points)
    switch (fish.nutrition.mercury) {
      case "Very Low": score += 30; break;
      case "Low": score += 23; break;
      case "Moderate": score += 15; break;
      case "High": score += 0; break;
    }
    
    return score;
  };

  const sustainabilityScore = calculateSustainabilityScore();
  const healthScore = calculateHealthScore();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-ocean-500" />
          Scores
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around gap-4">
          <ScoreIndicator 
            score={sustainabilityScore}
            label="Sustainability"
            color={
              sustainabilityScore >= 80 ? "text-green-600" :
              sustainabilityScore >= 60 ? "text-yellow-600" :
              "text-red-600"
            }
          />
          <ScoreIndicator 
            score={healthScore}
            label="Health"
            color={
              healthScore >= 80 ? "text-green-600" :
              healthScore >= 60 ? "text-yellow-600" :
              "text-red-600"
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

