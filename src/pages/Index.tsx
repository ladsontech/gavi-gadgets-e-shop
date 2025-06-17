import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryFilter } from "@/components/CategoryFilter";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useState, useMemo } from "react";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { MobileMainNav } from "@/components/MobileMainNav";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState(""); // for search

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
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-4 md:py-8">
      <CategoryFilter
        categories={categories || []}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      {/* Search feature above featured & product list */}
      <div className="mb-6 flex items-center">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full border rounded-md px-4 py-2 text-base outline-none focus:ring-2 focus:ring-pink-400 bg-white text-black"
          placeholder="Search for a phone by name, model, or brand..."
          aria-label="Search products"
        />
      </div>
      {/* Featured section above products, only on main view */}
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
  );
};

export default Index;