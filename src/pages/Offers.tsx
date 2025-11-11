import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductSidebar } from "@/components/ProductSidebar";
import SEOHead from "@/components/SEOHead";
import { useState, useMemo } from "react";
import { useSearch } from "@/contexts/SearchContext";
import { WeeklyOffers } from "@/components/WeeklyOffers";
import { TuzisazePromo } from "@/components/TuzisazePromo";

const Offers = () => {
  const { searchQuery } = useSearch();
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState("all");

  // Fetch all products (using cached data)
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

  const { data: categories } = useQuery({
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
    staleTime: 10 * 60 * 1000
  });

  // Filter only featured products
  const filteredProducts = useMemo(() => {
    const base = allProducts || [];
    let result = base.filter(p => p.is_featured);

    // Search filter
    if (searchQuery && searchQuery.trim().length > 0) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(p => {
        const name = (p.name || "").toLowerCase();
        const brand = (p.brand || "").toLowerCase?.() || "";
        const desc = (p.description || "").toLowerCase?.() || "";
        return name.includes(q) || brand.includes(q) || desc.includes(q);
      });
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
  }, [allProducts, searchQuery, priceRange, sortBy]);

  return (
    <>
      <SEOHead 
        title="Gavi Gadgets - Special Offers & Promotions" 
        description="Browse our latest offers, promotions, and featured products at Gavi Gadgets Uganda. Best deals on smartphones and electronics." 
        keywords="offers, promotions, deals, featured products, discounts, Gavi Gadgets" 
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Tuzisaze Ebeeyi Promo Banner - Only this design on offers page */}
        <TuzisazePromo variant="full" />
      </div>
    </>
  );
};

export default Offers;

