
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Fish, MapPin, AlertCircle } from "lucide-react";

interface CatchEntry {
  id: string;
  species: string;
  location: string;
  date: string;
  weight: string;
  notes: string;
  coordinates?: {
    latitude: number | null;
    longitude: number | null;
  };
}

const FishermanPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [catches, setCatches] = useState<CatchEntry[]>(() => {
    const savedCatches = localStorage.getItem("fishCatches");
    return savedCatches ? JSON.parse(savedCatches) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [newCatch, setNewCatch] = useState({
    species: "",
    location: "",
    date: new Date().toISOString().split('T')[0],
    weight: "",
    notes: ""
  });
  const [coordinates, setCoordinates] = useState<{latitude: number | null, longitude: number | null}>({
    latitude: null, 
    longitude: null
  });
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewCatch({
      ...newCatch,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value: string) => {
    setNewCatch({
      ...newCatch,
      species: value
    });
  };

  const getLocation = () => {
    setIsGettingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setIsGettingLocation(false);
        toast({
          title: "Location captured",
          description: `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`,
        });
      },
      (error) => {
        setLocationError(`Error getting location: ${error.message}`);
        setIsGettingLocation(false);
        toast({
          title: "Location error",
          description: error.message,
          variant: "destructive"
        });
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const catchEntry: CatchEntry = {
      id: Date.now().toString(),
      ...newCatch,
      coordinates: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      }
    };
    
    const updatedCatches = [...catches, catchEntry];
    setCatches(updatedCatches);
    localStorage.setItem("fishCatches", JSON.stringify(updatedCatches));
    
    toast({
      title: "Catch logged successfully!",
      description: `You logged a ${newCatch.weight}kg ${newCatch.species}.`,
    });
    
    // Reset form
    setNewCatch({
      species: "",
      location: "",
      date: new Date().toISOString().split('T')[0],
      weight: "",
      notes: ""
    });
    setCoordinates({ latitude: null, longitude: null });
    setShowForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/login");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
  };

  const formatCoordinates = (coords: {latitude: number | null, longitude: number | null} | undefined) => {
    if (!coords || coords.latitude === null || coords.longitude === null) return "Not recorded";
    return `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`;
  };

  return (
    <div className="container mx-auto p-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-ocean-700">Fisherman Dashboard</h1>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      {!showForm ? (
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Your Catch Log</CardTitle>
            </CardHeader>
            <CardContent>
              {catches.length > 0 ? (
                <div className="space-y-4">
                  {catches.map((entry) => (
                    <div key={entry.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{entry.species}</h3>
                          <p className="text-sm text-gray-500">
                            {entry.location} • {entry.date} • {entry.weight}kg
                          </p>
                          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>GPS: {formatCoordinates(entry.coordinates)}</span>
                          </div>
                        </div>
                      </div>
                      {entry.notes && <p className="text-sm mt-2">{entry.notes}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Fish className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                  <p className="text-gray-500">No catches logged yet</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="fixed bottom-20 right-4 md:bottom-4">
            <Button 
              onClick={() => setShowForm(true)} 
              className="rounded-full h-14 w-14 flex items-center justify-center shadow-lg"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Log New Catch</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="species">Species</Label>
                <Select 
                  onValueChange={handleSelectChange} 
                  value={newCatch.species}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fish species" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Atlantic Salmon">Atlantic Salmon</SelectItem>
                    <SelectItem value="Alaskan Pollock">Alaskan Pollock</SelectItem>
                    <SelectItem value="Bluefin Tuna">Bluefin Tuna</SelectItem>
                    <SelectItem value="Rainbow Trout">Rainbow Trout</SelectItem>
                    <SelectItem value="Pacific Cod">Pacific Cod</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location"
                  name="location"
                  value={newCatch.location}
                  onChange={handleInputChange}
                  placeholder="Fishing location"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gps">GPS Coordinates</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 p-3 bg-gray-50 rounded-md border text-sm">
                    {coordinates.latitude !== null 
                      ? `Lat: ${coordinates.latitude.toFixed(4)}, Lng: ${coordinates.longitude !== null ? coordinates.longitude.toFixed(4) : ''}` 
                      : "No coordinates captured"}
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={getLocation} 
                    disabled={isGettingLocation}
                    className="shrink-0"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    {isGettingLocation ? "Getting..." : "Get Location"}
                  </Button>
                </div>
                {locationError && (
                  <div className="text-sm text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {locationError}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date"
                  name="date"
                  type="date"
                  value={newCatch.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input 
                  id="weight"
                  name="weight"
                  type="number"
                  step="0.1"
                  value={newCatch.weight}
                  onChange={handleInputChange}
                  placeholder="Weight in kg"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes"
                  name="notes"
                  value={newCatch.notes}
                  onChange={handleInputChange}
                  placeholder="Additional notes"
                  rows={3}
                />
              </div>
              
              <div className="flex gap-3 pt-3">
                <Button type="submit" className="flex-1">Log Catch</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FishermanPage;
