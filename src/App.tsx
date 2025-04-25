
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import HomePage from "./pages/HomePage";
import ScanPage from "./pages/ScanPage";
import HistoryPage from "./pages/HistoryPage";
import FishDetailPage from "./pages/FishDetailPage";
import WorldMapPage from "./pages/WorldMapPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import FishermanPage from "./pages/FishermanPage";

const queryClient = new QueryClient();

// Simple auth guard component
const RequireRole = ({ 
  children, 
  requiredRole 
}: { 
  children: JSX.Element, 
  requiredRole: "fisherman" | "consumer" | null 
}) => {
  const userRole = localStorage.getItem("userRole");
  
  if (requiredRole === null || userRole === requiredRole) {
    return children;
  }
  
  return <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/fisherman" element={
            <RequireRole requiredRole="fisherman">
              <FishermanPage />
            </RequireRole>
          } />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/fish/:id" element={<FishDetailPage />} />
            <Route path="/world-map" element={<WorldMapPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
