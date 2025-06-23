import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryFilter } from "@/components/CategoryFilter";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useState, useMemo } from "react";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { MobileMainNav } from "@/components/MobileMainNav";
import { UpdatesCarousel } from "@/components/UpdatesCarousel";
import { Search } from "lucide-react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          categories (
            id,
            name,
            slug
          )
        `)
        .eq('is_active', true);

      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory);
      }

      const { data, error } = await query.order('is_featured', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Memoize featured products (only when not filtering by category)
  const featuredProducts = useMemo(() => {
    if (!products) return [];
    // Show featured only if not filtering category
    if (!selectedCategory) {
      return products.filter((p: any) => p.is_featured);
    }
    return [];
  }, [products, selectedCategory]);

  // Apply search filter and remove featured products from main grid when showing featured section
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    let productsToShow = products;
    
    // If we're showing featured section (no category selected), exclude featured products from main grid
    if (!selectedCategory) {
      productsToShow = products.filter((p: any) => !p.is_featured);
    }
    
    // Apply search filter
    if (!searchValue.trim()) return productsToShow;
    const search = searchValue.toLowerCase();
    return productsToShow.filter((prod: any) =>
      [prod.name, prod.model, prod.brand].join(" ").toLowerCase().includes(search)
    );
  }, [products, searchValue, selectedCategory]);

  if (productsLoading || categoriesLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-pink-50 min-h-screen">
      <UpdatesCarousel />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 md:py-8">
        <CategoryFilter
          categories={categories || []}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        {/* Enhanced Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto lg:mx-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-pink-400" />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-base border-2 border-pink-200 rounded-2xl outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 placeholder-gray-500"
              placeholder="Search for smartphones by name, model, or brand..."
              aria-label="Search products"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <div className="text-sm text-gray-400">
                {filteredProducts.length} found
              </div>
            </div>
          </div>
        </div>
        
        {!selectedCategory && featuredProducts.length > 0 && (
          <FeaturedProducts products={featuredProducts} />
        )}
        
        <ProductGrid products={filteredProducts} />
        
        <MobileMainNav
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories || []}
        />
      </div>
    </div>
  );
};

export default Index;