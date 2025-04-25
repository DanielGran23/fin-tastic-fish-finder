
import { Award, Fish, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const ScoresExplanation = () => {
  return (
    <div className="py-8 md:py-16 bg-gradient-to-b from-ocean-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-ocean-800 flex items-center justify-center gap-2">
            <Award className="h-6 w-6 md:h-8 md:w-8 text-ocean-600" />
            Understanding Our Scores
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            We evaluate seafood based on two key metrics to help you make informed choices
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-ocean-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Fish className="h-5 w-5 text-ocean-600" />
                Sustainability Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Evaluates the environmental impact based on:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="bg-ocean-100 p-1 rounded-full mt-0.5">•</span>
                  <span>Stock Status (population health)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-ocean-100 p-1 rounded-full mt-0.5">•</span>
                  <span>Fishing Method Impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-ocean-100 p-1 rounded-full mt-0.5">•</span>
                  <span>CO2 Emissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-ocean-100 p-1 rounded-full mt-0.5">•</span>
                  <span>Certifications</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-ocean-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Heart className="h-5 w-5 text-ocean-600" />
                Health Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Measures nutritional value based on:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="bg-ocean-100 p-1 rounded-full mt-0.5">•</span>
                  <span>Protein Content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-ocean-100 p-1 rounded-full mt-0.5">•</span>
                  <span>Omega-3 Levels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-ocean-100 p-1 rounded-full mt-0.5">•</span>
                  <span>Mercury Content</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
