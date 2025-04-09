
import { Fish } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
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
