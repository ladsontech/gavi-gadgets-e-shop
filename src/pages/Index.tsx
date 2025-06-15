
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryFilter } from "@/components/CategoryFilter";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AppBar } from "@/components/AppBar";
import { Footer } from "@/components/Footer";
import { useState, useMemo } from "react";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { MobileMainNav } from "@/components/MobileMainNav";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  // Products query depends on selected category
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
    // Show featured only if not filtering category or when filtering shows them
    if (!selectedCategory) {
      return products.filter((p: any) => p.is_featured);
    }
    // Only show featured within selected category? For now, featured filtered by current
    return products.filter((p: any) => p.is_featured);
  }, [products, selectedCategory]);

  if (productsLoading || categoriesLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppBar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-2 sm:px-4 py-4 md:py-8">
        <CategoryFilter
          categories={categories || []}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        {/* Featured section above products, only on main view */}
        {!selectedCategory && featuredProducts.length > 0 && (
          <FeaturedProducts products={featuredProducts} />
        )}
        <ProductGrid products={products || []} />
      </main>
      <Footer />
      <MobileMainNav
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories || []}
      />
    </div>
  );
};

export default Index;
