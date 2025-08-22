
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryFilter } from "@/components/CategoryFilter";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { UpdatesCarousel } from "@/components/UpdatesCarousel";
import { WeeklyOffers } from "@/components/WeeklyOffers";
import SEOHead from "@/components/SEOHead";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const {
    data: products
  } = useQuery({
    queryKey: ["products", selectedCategory, searchQuery],
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
      if (selectedCategory && selectedCategory !== "accessories") {
        query = query.eq("category_id", selectedCategory);
      } else if (selectedCategory === "accessories") {
        // Filter for accessories - products without category_id (non-phones)
        query = query.is("category_id", null);
      }

      if (searchQuery) {
        query = query.ilike("name", `%${searchQuery}%`);
      }
      
      const {
        data,
        error
      } = await query.order("created_at", {
        ascending: false
      });
      
      if (error) {
        throw error;
      }
      return data;
    }
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
    }
  });

  const getCategoryDisplayName = () => {
    if (!selectedCategory) return "All Products";
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedProducts products={products || []} />
          
          <div className="mb-8">
            <CategoryFilter 
              categories={categories || []} 
              selectedCategory={selectedCategory} 
              onCategoryChange={setSelectedCategory} 
            />
          </div>

          {/* Products section with data attribute for smooth scrolling */}
          <div className="mb-8" data-products-section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              {searchQuery ? `Search Results for "${searchQuery}"` : getCategoryDisplayName()}
            </h2>
            <ProductGrid products={products || []} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
