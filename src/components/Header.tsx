import { Fish, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <header className="bg-ocean-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Fish className="h-6 w-6 text-white" />
            <span className="text-lg font-bold">Fin-tastic</span>
          </Link>
          <Menu className="h-6 w-6" />
        </div>
      </header>
    );
  }
  
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Fish className="h-6 w-6 text-ocean-600" />
          <span className="text-xl font-bold text-ocean-700">Fin-tastic Fish Finder</span>
        </Link>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link to="/" className="text-ocean-600 hover:text-ocean-800 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/scan" className="text-ocean-600 hover:text-ocean-800 transition-colors">
                Scan
              </Link>
            </li>
            <li>
              <Link to="/history" className="text-ocean-600 hover:text-ocean-800 transition-colors">
                History
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
