
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SearchBar } from "@/components/SearchBar";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory, searchQuery]);

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

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");
    
    if (error) {
      console.error("Error fetching categories:", error);
    } else {
      setCategories(data || []);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase.from("products").select("*").eq("is_active", true);

    if (selectedCategory && selectedCategory !== "others") {
      query = query.eq("category_id", selectedCategory);
    } else if (selectedCategory === "others") {
      // For "others", we might want to show products that don't belong to phone categories
      // This logic can be adjusted based on your category structure
      query = query.is("category_id", null);
    }

    if (searchQuery) {
      query = query.ilike("name", `%${searchQuery}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const homepageSEO = {
    title: "Gavi Gadgets Uganda - Buy iPhone 15, 14, 13, Samsung Galaxy S24, S23, Google Pixel 8, 7 | Better than Jumia & Jiji Uganda",
    description: "Uganda's premier electronics store offering genuine iPhone 15 Pro Max, iPhone 14, Samsung Galaxy S24 Ultra, S23, Google Pixel 8 Pro, Huawei smartphones at unbeatable prices in Kampala. Better service than Jumia Uganda and Jiji Uganda. Visit New Pioneer Mall Shop PA 82A for authentic smartphones with warranty.",
    keywords: "smartphones Uganda, iPhone 15 Uganda, iPhone 14 Uganda, iPhone 13 Uganda, Samsung Galaxy S24 Uganda, Samsung Galaxy S23 Uganda, Google Pixel 8 Uganda, Google Pixel 7 Uganda, Huawei Uganda, mobile phones Kampala, electronics Uganda, gadgets Uganda, better than Jumia Uganda, better than Jiji Uganda, New Pioneer Mall electronics, authentic smartphones Uganda, iPhone Pro Max Uganda, Samsung Ultra Uganda, Pixel Pro Uganda"
  };

  return (
    <>
      <SEOHead
        title={homepageSEO.title}
        description={homepageSEO.description}
        keywords={homepageSEO.keywords}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <SearchBar onSearch={handleSearch} />
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange} 
          />
          {loading ? (
            <LoadingSpinner />
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
