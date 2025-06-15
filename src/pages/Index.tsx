
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryFilter } from "@/components/CategoryFilter";
import { HeroSection } from "@/components/HeroSection";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useState } from "react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  if (productsLoading || categoriesLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      
      <div className="container mx-auto px-4 py-8">
        <CategoryFilter 
          categories={categories || []}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <ProductGrid products={products || []} />
      </div>
    </div>
  );
};

export default Index;
