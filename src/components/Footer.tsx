
import { Fish } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ocean-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Fish className="h-5 w-5" />
            <span className="font-bold text-lg">Fin-tastic Fish Finder</span>
          </div>
          
          <div className="text-sm text-ocean-100">
            <p>© 2025 Fin-tastic Fish Finder</p>
            <p>A demo app for sustainable seafood choices</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
