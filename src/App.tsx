import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { SearchProvider } from "@/contexts/SearchContext";
import { AppBar } from "@/components/AppBar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SplashScreen } from "@/components/SplashScreen";
import { MobileMainNav } from "@/components/MobileMainNav";
import { CategoriesSidebar } from "@/components/CategoriesSidebar";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Warranty from "./pages/Warranty";
import NotFound from "./pages/NotFound";
import SitemapPage from "./pages/Sitemap";
import CategoriesPage from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import Offers from "./pages/Offers";
const queryClient = new QueryClient();
function App() {
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

  // Seed products cache from localStorage, then background prefetch and persist
  useEffect(() => {
    try {
      const cachedRaw = localStorage.getItem("productsAllCacheV1");
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw);
        if (cached && Array.isArray(cached.data)) {
          queryClient.setQueryData(["productsAll"], cached.data);
        }
      }
    } catch {
      // ignore cache read errors
    }

    queryClient
      .prefetchQuery({
        queryKey: ["productsAll"],
        queryFn: async () => {
          const { data, error } = await supabase
            .from("products")
            .select(`
              *,
              categories (
                id,
                name,
                slug
              )
            `)
            .eq("is_active", true);
          if (error) throw error;
          return data;
        },
        staleTime: 10 * 60 * 1000,
      })
      .then((data) => {
        try {
          localStorage.setItem(
            "productsAllCacheV1",
            JSON.stringify({ updatedAt: Date.now(), data })
          );
        } catch {
          // ignore cache write errors
        }
      })
      .catch(() => {});
  }, []);

  // Prefetch category images for faster loading
  useEffect(() => {
    const categoryImages = [
      "/images/gavi_accessories/phones.png",
      "/images/gavi_accessories/wearables.png",
      "/images/gavi_accessories/PCs.png",
      "/images/gavi_accessories/speakers.png",
      "/images/gavi_accessories/TVS.png",
      "/images/gavi_accessories/accessories.png",
      "/images/gavi_accessories/gaming.png",
    ];

    // Prefetch images using Image API
    categoryImages.forEach((imageSrc) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = imageSrc;
      document.head.appendChild(link);

      // Also preload using Image object for better browser support
      const img = new Image();
      img.src = imageSrc;
    });
  }, []);

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
                <div className="flex flex-1">
                  <CategoriesSidebar categories={categories} />
                  <main className="flex-1 pb-16 md:pb-0 max-w-[1600px] mx-auto w-full md:px-12 lg:px-20 xl:px-24 2xl:px-32 px-[5px]">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/categories" element={<CategoriesPage />} />
                      <Route path="/offers" element={<Offers />} />
                      <Route path="/category/:slug" element={<CategoryPage />} />
                      <Route path="/product/:slug" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/warranty" element={<Warranty />} />
                      <Route path="/sitemap" element={<SitemapPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
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