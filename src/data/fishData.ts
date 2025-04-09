
export interface Fish {
  id: string;
  name: string;
  scientificName: string;
  stockStatus: 'Abundant' | 'Moderate' | 'Low' | 'Critical';
  recommendation: 'Recommended' | 'Consider Alternatives' | 'Avoid';
  nutrition: {
    protein: number; // grams per 100g
    omega3: number; // grams per 100g
    calories: number; // per 100g
    mercury: 'Very Low' | 'Low' | 'Moderate' | 'High';
  };
  origin: string;
  fishery: string;
  certifications: string[];
  imageUrl: string;
  description: string;
}

export const fishDatabase: { [key: string]: Fish } = {
  "FISH001": {
    id: "FISH001",
    name: "Atlantic Salmon",
    scientificName: "Salmo salar",
    stockStatus: "Moderate",
    recommendation: "Consider Alternatives",
    nutrition: {
      protein: 20,
      omega3: 2.2,
      calories: 208,
      mercury: "Low"
    },
    origin: "Norway",
    fishery: "Fjord Aquaculture",
    certifications: ["ASC Certified"],
    imageUrl: "/placeholder.svg",
    description: "Farm-raised Atlantic salmon from Norwegian fjords. Medium environmental impact with good nutrition profile."
  },
  "FISH002": {
    id: "FISH002",
    name: "Alaskan Pollock",
    scientificName: "Gadus chalcogrammus",
    stockStatus: "Abundant",
    recommendation: "Recommended",
    nutrition: {
      protein: 15.6,
      omega3: 0.5,
      calories: 92,
      mercury: "Very Low"
    },
    origin: "Bering Sea, Alaska",
    fishery: "North Pacific Sustainable Fishery",
    certifications: ["MSC Certified", "Ocean Wise"],
    imageUrl: "/placeholder.svg",
    description: "Wild-caught whitefish from sustainable Alaskan fisheries. Low environmental impact and excellent choice for consumers."
  },
  "FISH003": {
    id: "FISH003",
    name: "Bluefin Tuna",
    scientificName: "Thunnus thynnus",
    stockStatus: "Critical",
    recommendation: "Avoid",
    nutrition: {
      protein: 23.3,
      omega3: 1.2,
      calories: 144,
      mercury: "High"
    },
    origin: "Mediterranean Sea",
    fishery: "Open Ocean Fishing",
    certifications: [],
    imageUrl: "/placeholder.svg",
    description: "Wild-caught predatory fish with declining populations. High mercury content and unsustainable fishing practices."
  },
  "FISH004": {
    id: "FISH004",
    name: "Rainbow Trout",
    scientificName: "Oncorhynchus mykiss",
    stockStatus: "Abundant",
    recommendation: "Recommended",
    nutrition: {
      protein: 20.5,
      omega3: 1.0,
      calories: 141,
      mercury: "Very Low"
    },
    origin: "Idaho, USA",
    fishery: "Clear Springs Aquaculture",
    certifications: ["BAP Certified", "Ocean Wise"],
    imageUrl: "/placeholder.svg",
    description: "Farm-raised freshwater trout from land-based tanks. Environmentally responsible with excellent nutrition profile."
  },
  "FISH005": {
    id: "FISH005",
    name: "Pacific Cod",
    scientificName: "Gadus macrocephalus",
    stockStatus: "Moderate",
    recommendation: "Recommended",
    nutrition: {
      protein: 18.0,
      omega3: 0.3,
      calories: 85,
      mercury: "Low"
    },
    origin: "Gulf of Alaska",
    fishery: "Alaska Sustainable Fisheries",
    certifications: ["MSC Certified"],
    imageUrl: "/placeholder.svg",
    description: "Wild-caught whitefish from managed Alaskan fisheries. Good alternative to overfished Atlantic cod."
  }
};

// Function to simulate scanning a QR code
export const scanQRCode = (qrCode: string): Fish | null => {
  return fishDatabase[qrCode] || null;
};
