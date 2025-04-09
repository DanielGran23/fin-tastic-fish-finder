
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Fish } from "lucide-react";

interface CatchEntry {
  id: string;
  species: string;
  location: string;
  date: string;
  weight: string;
  notes: string;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const catchEntry: CatchEntry = {
      id: Date.now().toString(),
      ...newCatch
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
