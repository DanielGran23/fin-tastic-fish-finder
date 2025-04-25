
import { useState, useEffect, useRef } from "react";
import { fishDatabase, Fish, getPurchasedFish } from "@/data/fishData";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Fish as FishIcon, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const WorldMapPage = () => {
  const [purchasedFish, setPurchasedFish] = useState<Fish[]>([]);
  const [selectedFish, setSelectedFish] = useState<Fish | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  
  // Load purchased fish
  useEffect(() => {
    loadPurchasedFish();
  }, []);

  // Initialize map when token is set
  useEffect(() => {
    if (mapboxToken && mapContainer.current && purchasedFish.length > 0) {
      initializeMap();
    }
  }, [mapboxToken, purchasedFish]);

  const loadPurchasedFish = () => {
    const purchasedIds = getPurchasedFish();
    const fishData = purchasedIds
      .map(id => fishDatabase[id])
      .filter((fish): fish is Fish => !!fish && !!fish.coordinates);
    
    setPurchasedFish(fishData);
    
    if (fishData.length === 0) {
      toast({
        title: "No purchased fish",
        description: "You haven't marked any fish as purchased yet",
        variant: "destructive"
      });
      navigate('/history');
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;
    
    // Clear previous markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    
    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    if (map.current) map.current.remove();
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [0, 20],
      zoom: 1.5
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add markers for each fish
    purchasedFish.forEach(fish => {
      if (!fish.coordinates || !map.current) return;

      // Create a custom marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'cursor-pointer';
      markerEl.innerHTML = `
        <div class="bg-ocean-500 p-1 rounded-full shadow-md hover:bg-ocean-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      `;

      // Create and add the marker
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([fish.coordinates.lng, fish.coordinates.lat])
        .addTo(map.current);
      
      // Add click event
      markerEl.addEventListener('click', () => {
        setSelectedFish(fish);
        
        // Fly to marker
        map.current?.flyTo({
          center: [fish.coordinates!.lng, fish.coordinates!.lat],
          zoom: 5,
          duration: 1500
        });
      });
      
      markers.current.push(marker);
    });
    
    // Fit markers
    if (purchasedFish.length > 1 && map.current) {
      const bounds = new mapboxgl.LngLatBounds();
      purchasedFish.forEach(fish => {
        if (fish.coordinates) {
          bounds.extend([fish.coordinates.lng, fish.coordinates.lat]);
        }
      });
      
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 5
      });
    }
  };

  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get('mapbox-token') as string;
    
    if (!token) {
      toast({
        title: "Token required",
        description: "Please enter your Mapbox token",
        variant: "destructive"
      });
      return;
    }
    
    setMapboxToken(token);
    localStorage.setItem('mapbox-token', token);
  };

  // Check for token in localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox-token');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);

  return (
    <div className={isMobile ? "px-4 py-4 pb-20" : "container mx-auto px-4 py-16"}>
      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="text-ocean-600" 
            onClick={() => navigate('/history')}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to History
          </Button>
          <h1 className={`font-bold text-ocean-800 ${isMobile ? "text-xl" : "text-3xl"}`}>
            World Fish Map
          </h1>
          <div className="w-24" />
        </div>
      </div>
      
      {!mapboxToken ? (
        <div className="max-w-md mx-auto py-8">
          <Card className="p-4">
            <h2 className="text-lg font-medium mb-4">Enter Mapbox Token</h2>
            <p className="text-sm text-muted-foreground mb-4">
              To view the map, you need to provide a Mapbox public access token.
              You can get one for free at <a href="https://mapbox.com" target="_blank" rel="noreferrer" className="text-ocean-600 underline">mapbox.com</a>
            </p>
            <form onSubmit={handleTokenSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="mapbox-token" className="text-sm font-medium">
                    Mapbox Public Access Token
                  </label>
                  <input
                    id="mapbox-token"
                    name="mapbox-token"
                    type="text"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="pk.eyJ1IjoiZXhhbXBsZSIsImEi..."
                    required
                  />
                </div>
                <Button type="submit">Show Map</Button>
              </div>
            </form>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-100 rounded-lg overflow-hidden" style={{ height: "70vh", minHeight: "400px" }}>
              <div ref={mapContainer} className="h-full w-full" />
            </div>
            <p className="text-xs text-center mt-2 text-gray-500">
              Click on markers to view fish details
            </p>
          </div>
          
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-ocean-700">Your Purchased Fish</h2>
            <div className="space-y-3 overflow-auto" style={{ maxHeight: "65vh" }}>
              {purchasedFish.map(fish => (
                <Card 
                  key={fish.id} 
                  className={`p-3 cursor-pointer transition-all ${selectedFish?.id === fish.id ? 'ring-2 ring-ocean-500' : ''}`}
                  onClick={() => {
                    setSelectedFish(fish);
                    if (fish.coordinates && map.current) {
                      map.current.flyTo({
                        center: [fish.coordinates.lng, fish.coordinates.lat],
                        zoom: 5,
                        duration: 1500
                      });
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-ocean-100 rounded-md flex items-center justify-center">
                      <FishIcon className="w-7 h-7 text-ocean-400" />
                    </div>
                    <div>
                      <p className="font-medium">{fish.name}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        {fish.origin}
                      </div>
                      <Badge 
                        className={`text-xs mt-1 ${
                          fish.recommendation === "Recommended" ? "bg-green-100 text-green-800" :
                          fish.recommendation === "Consider Alternatives" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}
                        variant="outline"
                      >
                        {fish.recommendation}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {selectedFish && (
        <div className="mt-4">
          <h3 className="font-medium text-lg">{selectedFish.name} Details</h3>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm"><span className="font-medium">Origin:</span> {selectedFish.origin}</p>
              <p className="text-sm"><span className="font-medium">Fishery:</span> {selectedFish.fishery}</p>
              <p className="text-sm"><span className="font-medium">Method:</span> {selectedFish.fishingMethod}</p>
              <p className="text-sm">
                <span className="font-medium">Coordinates:</span> {selectedFish.coordinates?.lat.toFixed(6)}, {selectedFish.coordinates?.lng.toFixed(6)}
              </p>
            </div>
            <div>
              <p className="text-sm"><span className="font-medium">Protein:</span> {selectedFish.nutrition.protein}g/100g</p>
              <p className="text-sm"><span className="font-medium">Omega-3:</span> {selectedFish.nutrition.omega3}g/100g</p>
              <p className="text-sm"><span className="font-medium">Mercury Level:</span> {selectedFish.nutrition.mercury}</p>
              <p className="text-sm"><span className="font-medium">CO₂ Emission:</span> {selectedFish.co2Emissions.value} kg/kg ({selectedFish.co2Emissions.rating})</p>
            </div>
          </div>
          <p className="text-sm mt-3">{selectedFish.description}</p>
        </div>
      )}
    </div>
  );
};

export default WorldMapPage;
