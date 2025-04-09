
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileNavBar } from "./MobileNavBar";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function Layout() {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {isMobile ? (
        <>
          <div className="flex-1 overflow-auto pb-20">
            <Outlet />
          </div>
          <MobileNavBar />
        </>
      ) : (
        <>
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
