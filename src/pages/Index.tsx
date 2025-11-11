import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductSidebar } from "@/components/ProductSidebar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { UpdatesCarousel } from "@/components/UpdatesCarousel";
import { WeeklyOffers } from "@/components/WeeklyOffers";
import { TuzisazePromo } from "@/components/TuzisazePromo";
import SEOHead from "@/components/SEOHead";
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useSearch } from "@/contexts/SearchContext";
const Index = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const {
    searchQuery
  } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState("all");

  // Listen for category changes from mobile nav
  useEffect(() => {
    const handleCategoryChange = (event: CustomEvent) => {
      setSelectedCategory(event.detail);
    };
    window.addEventListener('categoryChanged', handleCategoryChange as EventListener);
    return () => {
      window.removeEventListener('categoryChanged', handleCategoryChange as EventListener);
    };
  }, []);

  // Background-fetched all products (prefetched in App) for instant client-side filtering
  const { data: allProducts, isLoading: productsLoading } = useQuery({
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
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000
  });
  const {
    data: categories
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("categories").select("*").eq("is_active", true).order("name", {
        ascending: true
      });
      if (error) {
        throw error;
      }
      return data;
    },
    staleTime: 10 * 60 * 1000 // Categories don't change often
  });

  // Compute filtered/sorted products locally for instant search
  const filteredProducts = useMemo(() => {
    const base = allProducts || [];

    // Resolve accessories category id if needed
    const accessoriesCategory = categories?.find(c => typeof c.name === "string" && c.name.toLowerCase().includes("accessories"));
    const accessoriesCategoryId = accessoriesCategory?.id;

    let result = base;

    // If searching, only show search results (ignore category filters)
    if (searchQuery && searchQuery.trim().length > 0) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(p => {
        const name = (p.name || "").toLowerCase();
        const brand = (p.brand || "").toLowerCase?.() || "";
        const desc = (p.description || "").toLowerCase?.() || "";
        return name.includes(q) || brand.includes(q) || desc.includes(q);
      });
    } else {
      // Category filter (only when not searching)
      if (selectedCategory === "featured") {
        result = result.filter(p => p.is_featured);
      } else if (selectedCategory === "accessories" && accessoriesCategoryId) {
        result = result.filter(p => p.category_id === accessoriesCategoryId);
      } else if (selectedCategory) {
        result = result.filter(p => p.category_id === selectedCategory);
      }
    }

    // Price filter
    if (priceRange !== "all") {
      if (priceRange === "5000000+") {
        result = result.filter(p => (p.price ?? 0) >= 5000000);
      } else if (priceRange.includes("-")) {
        const [min, max] = priceRange.split("-").map(Number);
        result = result.filter(p => (p.price ?? 0) >= min && (p.price ?? 0) <= max);
      } else if (priceRange.startsWith("0-")) {
        const max = Number(priceRange.split("-")[1]);
        result = result.filter(p => (p.price ?? 0) <= max);
      }
    }

    // Sorting
    const sorted = [...result];
    if (sortBy === "newest") {
      sorted.sort((a, b) => (new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    } else if (sortBy === "oldest") {
      sorted.sort((a, b) => (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()));
    } else if (sortBy === "price-low") {
      sorted.sort((a, b) => ((a.price ?? 0) - (b.price ?? 0)));
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => ((b.price ?? 0) - (a.price ?? 0)));
    } else if (sortBy === "name-asc") {
      sorted.sort((a, b) => (String(a.name || "").localeCompare(String(b.name || ""))));
    } else if (sortBy === "name-desc") {
      sorted.sort((a, b) => (String(b.name || "").localeCompare(String(a.name || ""))));
    } else {
      sorted.sort((a, b) => (new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    }

    return sorted;
  }, [allProducts, categories, selectedCategory, searchQuery, priceRange, sortBy]);
  const getCategoryDisplayName = () => {
    if (!selectedCategory) return "All Products";
    if (selectedCategory === "featured") return "Featured Offers";
    if (selectedCategory === "accessories") return "Accessories";
    const category = categories?.find(c => c.id === selectedCategory);
    return category ? `${category.name} Products` : "Products";
  };
  return <>
      <SEOHead title="Gavi Gadgets - Premium Smartphones in Uganda" description="Shop the latest smartphones including iPhone, Samsung, Huawei and more. Best prices on new and UK used phones in Uganda with warranty." keywords="smartphones, iPhone, Samsung, Huawei, Uganda, phones, mobile" />
      
      <div className="min-h-screen bg-white">
        {/* Only show carousel sections when not searching */}
        {!searchQuery && (
          <>
            {isHomePage && <UpdatesCarousel />}
            
            {/* Weekly offers section with data attribute for smooth scrolling */}
            <div data-offers-section>
              <WeeklyOffers />
            </div>
            
            {/* Tuzisaze Ebeeyi Promo Section */}
            {isHomePage && <TuzisazePromo />}
          </>
        )}
        
        <div className="w-full">
          {/* Only show FeaturedProducts if not viewing offers and not searching */}
          {!searchQuery && selectedCategory !== "featured" && <FeaturedProducts products={allProducts || []} />}
          
          {/* Desktop Layout with Sidebar */}
          <div className="flex gap-4 max-w-7xl mx-auto px-4 sm:px-6 xl:px-20 lg:px-[6px]">
            {/* Sidebar - Desktop Only, hidden when searching */}
            {!searchQuery && (
              <ProductSidebar categories={categories || []} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} sortBy={sortBy} onSortChange={setSortBy} priceRange={priceRange} onPriceRangeChange={setPriceRange} />
            )}
            
            {/* Main Content */}
            <div className={`flex-1 ${searchQuery ? 'max-w-full' : ''}`} data-products-section>
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-normal text-black mb-1">
                  {searchQuery ? `Search Results for "${searchQuery}"` : getCategoryDisplayName()}
                </h2>
                {searchQuery && (
                  <p className="text-sm text-gray-500">
                    {filteredProducts?.length || 0} {filteredProducts?.length === 1 ? 'product' : 'products'} found
                  </p>
                )}
              </div>
              {productsLoading ? (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-sm">Loading products...</p>
                </div>
              ) : (
                <ProductGrid products={filteredProducts || []} />
              )}
            </div>
          </div>
        </div>
        
        {/* Hero section moved to bottom on home page */}
        {isHomePage && <HeroSection />}
      </div>
    </>;
};
export default Index;