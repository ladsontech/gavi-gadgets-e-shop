
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductSidebar } from "@/components/ProductSidebar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { UpdatesCarousel } from "@/components/UpdatesCarousel";
import { WeeklyOffers } from "@/components/WeeklyOffers";
import SEOHead from "@/components/SEOHead";
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
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

  // Memoize query key to prevent unnecessary refetches
  const queryKey = useMemo(() => 
    ["products", selectedCategory, searchQuery, sortBy, priceRange], 
    [selectedCategory, searchQuery, sortBy, priceRange]
  );

  const {
    data: products,
    isLoading: productsLoading
  } = useQuery({
    queryKey,
    queryFn: async () => {
      let query = supabase.from("products").select(`
          *,
          categories (
            id,
            name,
            slug
          )
        `).eq("is_active", true);

      // Handle different category filtering
      if (selectedCategory === "featured") {
        // Filter for featured products (offers)
        query = query.eq("is_featured", true);
      } else if (selectedCategory && selectedCategory !== "accessories") {
        query = query.eq("category_id", selectedCategory);
      } else if (selectedCategory === "accessories") {
        // Filter for accessories category
        const accessoriesCategory = await supabase
          .from("categories")
          .select("id")
          .ilike("name", "%accessories%")
          .single();
        
        if (accessoriesCategory.data) {
          query = query.eq("category_id", accessoriesCategory.data.id);
        }
      }

      if (searchQuery) {
        query = query.ilike("name", `%${searchQuery}%`);
      }

      // Handle price range filtering
      if (priceRange !== "all") {
        if (priceRange === "5000000+") {
          query = query.gte("price", 5000000);
        } else if (priceRange.includes("-")) {
          const [min, max] = priceRange.split("-").map(Number);
          query = query.gte("price", min).lte("price", max);
        } else if (priceRange.startsWith("0-")) {
          const max = Number(priceRange.split("-")[1]);
          query = query.lte("price", max);
        }
      }
      
      // Handle sorting
      if (sortBy === "newest") {
        query = query.order("created_at", { ascending: false });
      } else if (sortBy === "oldest") {
        query = query.order("created_at", { ascending: true });
      } else if (sortBy === "price-low") {
        query = query.order("price", { ascending: true });
      } else if (sortBy === "price-high") {
        query = query.order("price", { ascending: false });
      } else if (sortBy === "name-asc") {
        query = query.order("name", { ascending: true });
      } else if (sortBy === "name-desc") {
        query = query.order("name", { ascending: false });
      } else {
        query = query.order("created_at", { ascending: false });
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      return data;
    },
    staleTime: 5 * 60 * 1000, // Keep data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
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
    staleTime: 10 * 60 * 1000, // Categories don't change often
  });

  const getCategoryDisplayName = () => {
    if (!selectedCategory) return "All Products";
    if (selectedCategory === "featured") return "Featured Offers";
    if (selectedCategory === "accessories") return "Accessories";
    
    const category = categories?.find(c => c.id === selectedCategory);
    return category ? `${category.name} Products` : "Products";
  };

  return (
    <>
      <SEOHead 
        title="Gavi Gadgets - Premium Smartphones in Uganda" 
        description="Shop the latest smartphones including iPhone, Samsung, Huawei and more. Best prices on new and UK used phones in Uganda with warranty." 
        keywords="smartphones, iPhone, Samsung, Huawei, Uganda, phones, mobile" 
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Only show hero section on home page */}
        {isHomePage && <HeroSection />}
        
        {isHomePage && <UpdatesCarousel />}
        
        {/* Weekly offers section with data attribute for smooth scrolling */}
        <div data-offers-section>
          <WeeklyOffers />
        </div>
        
        <div className="w-full">
          <FeaturedProducts products={products || []} />
          
          {/* Mobile Category Filter */}
          <div className="lg:hidden mb-4">
            <CategoryFilter 
              categories={categories || []} 
              selectedCategory={selectedCategory} 
              onCategoryChange={setSelectedCategory} 
            />
          </div>

          {/* Desktop Layout with Sidebar */}
          <div className="flex gap-6">
            {/* Sidebar - Desktop Only */}
            <ProductSidebar 
              categories={categories || []}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />
            
            {/* Main Content */}
            <div className="flex-1" data-products-section>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                {searchQuery ? `Search Results for "${searchQuery}"` : getCategoryDisplayName()}
              </h2>
              {productsLoading ? (
                <div className="text-center py-6 lg:py-8">
                  <p className="text-gray-500">Loading products...</p>
                </div>
              ) : (
                <ProductGrid products={products || []} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
