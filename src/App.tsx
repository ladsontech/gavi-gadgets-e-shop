import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { SearchProvider } from "@/contexts/SearchContext";
import { AppBar } from "@/components/AppBar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SplashScreen } from "@/components/SplashScreen";
import { MobileMainNav } from "@/components/MobileMainNav";
import { DesktopNav } from "@/components/DesktopNav";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Warranty from "./pages/Warranty";
import NotFound from "./pages/NotFound";
import SitemapPage from "./pages/Sitemap";
const queryClient = new QueryClient();
function App() {
  const queryClientHook = useQueryClient();
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splashShown');
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('splashShown', 'true');
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const {
        data,
        error
      } = await supabase.from("categories").select("*").order("name");
      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data || []);
      }
    };
    fetchCategories();
  }, []);

  // Background prefetch of all active products for instant search
  useEffect(() => {
    queryClientHook.prefetchQuery({
      queryKey: ["productsAll"],
      queryFn: async () => {
        const { data, error } = await supabase.from("products").select(`
          *,
          categories (
            id,
            name,
            slug
          )
        `).eq("is_active", true);
        if (error) {
          throw error;
        }
        return data;
      },
      staleTime: 10 * 60 * 1000
    }).catch(() => {});
  }, [queryClientHook]);
  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    window.dispatchEvent(new CustomEvent('categoryChanged', {
      detail: categoryId
    }));
  };
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }
  return <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <SearchProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen flex flex-col">
                <AppBar />
                <DesktopNav categories={categories} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
                <main className="flex-1 pb-16 md:pb-0 max-w-[1600px] mx-auto w-full md:px-12 lg:px-20 xl:px-24 2xl:px-32 px-[5px]">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/product/:slug" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/warranty" element={<Warranty />} />
                  <Route path="/sitemap" element={<SitemapPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <WhatsAppButton />
              <MobileMainNav categories={categories} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
            </div>
          </BrowserRouter>
        </TooltipProvider>
        </SearchProvider>
      </QueryClientProvider>
    </HelmetProvider>;
}
export default App;