
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AppBar } from "@/components/AppBar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SplashScreen } from "@/components/SplashScreen";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import SitemapPage from "./pages/Sitemap";
import SitemapXML from "./components/SitemapXML";

const queryClient = new QueryClient();

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    // Check if splash has been shown in this session
    return !sessionStorage.getItem('splashShown');
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('splashShown', 'true');
  };

  // Handle sitemap.xml route specially
  useEffect(() => {
    if (window.location.pathname === '/sitemap.xml') {
      // This will be handled by SitemapXML component
      return;
    }
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // Special handling for sitemap.xml
  if (window.location.pathname === '/sitemap.xml') {
    return <SitemapXML />;
  }

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <AppBar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/product/:slug" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/sitemap" element={<SitemapPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <WhatsAppButton />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
