import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductGrid } from "@/components/ProductGrid";
import SEOHead from "@/components/SEOHead";
import { useSearch } from "@/contexts/SearchContext";
import { TuzisazePromo } from "@/components/TuzisazePromo";
import { ArrowUpDown, SlidersHorizontal } from "lucide-react";

const Offers = () => {
  const { searchQuery } = useSearch();
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState("all");

  const { data: allProducts, isLoading: productsLoading } = useQuery({
    queryKey: ["productsAll"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true);
      if (error) throw error;
      return data;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  const filteredProducts = useMemo(() => {
    const base = (allProducts || []) as Array<{
      is_featured?: boolean;
      name?: string | null;
      brand?: string | null;
      description?: string | null;
      price?: number | null;
      created_at?: string | null;
    }>;

    let result = base.filter((p) => p.is_featured);

    if (searchQuery && searchQuery.trim().length > 0) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((p) => {
        const name = (p.name || "").toLowerCase();
        const brand =
          typeof p.brand === "string" ? p.brand.toLowerCase() : "";
        const desc =
          typeof p.description === "string"
            ? p.description.toLowerCase()
            : "";
        return name.includes(q) || brand.includes(q) || desc.includes(q);
      });
    }

    if (priceRange !== "all") {
      if (priceRange === "5000000+") {
        result = result.filter((p) => (p.price ?? 0) >= 5000000);
      } else if (priceRange.includes("-")) {
        const [min, max] = priceRange.split("-").map(Number);
        result = result.filter(
          (p) => (p.price ?? 0) >= min && (p.price ?? 0) <= max
        );
      } else if (priceRange.startsWith("0-")) {
        const max = Number(priceRange.split("-")[1]);
        result = result.filter((p) => (p.price ?? 0) <= max);
      }
    }

    const sorted = [...result];
    if (sortBy === "newest") {
      sorted.sort(
        (a, b) =>
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime()
      );
    } else if (sortBy === "oldest") {
      sorted.sort(
        (a, b) =>
          new Date(a.created_at || 0).getTime() -
          new Date(b.created_at || 0).getTime()
      );
    } else if (sortBy === "price-low") {
      sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    } else if (sortBy === "name-asc") {
      sorted.sort((a, b) =>
        String(a.name || "").localeCompare(String(b.name || ""))
      );
    } else if (sortBy === "name-desc") {
      sorted.sort((a, b) =>
        String(b.name || "").localeCompare(String(a.name || ""))
      );
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

      <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/25 to-white">
        <TuzisazePromo variant="full" />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-20 pb-14 sm:pb-20">
          <div className="bg-white/90 backdrop-blur shadow-sm border border-pink-100 rounded-3xl px-4 sm:px-8 py-6 sm:py-8 -mt-10 sm:-mt-14 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-pink-700">
                  Special Offers
                </h1>
                <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-xl">
                  Explore curated discounts on premium tech. These deals refresh
                  often, so grab your favorite gadget while it lasts!
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 bg-pink-50/70 border border-pink-100 rounded-full px-4 py-2 shadow-sm">
                  <ArrowUpDown className="w-4 h-4 text-pink-600" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-sm font-medium text-pink-700 focus:outline-none focus:ring-0"
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-white border border-pink-100 rounded-full px-4 py-2 shadow-sm">
                  <SlidersHorizontal className="w-4 h-4 text-pink-600" />
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="bg-transparent text-sm font-medium text-pink-700 focus:outline-none focus:ring-0"
                  >
                    <option value="all">All Prices</option>
                    <option value="0-500000">Under 500K</option>
                    <option value="500000-1000000">500K - 1M</option>
                    <option value="1000000-2000000">1M - 2M</option>
                    <option value="2000000-5000000">2M - 5M</option>
                    <option value="5000000+">Above 5M</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 sm:mt-14" data-offers-grid>
            {productsLoading ? (
              <div className="text-center py-12">
                <p className="text-pink-600 font-semibold">
                  Loading the latest deals...
                </p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts as any} />
            ) : (
              <div className="bg-white/80 border border-pink-100 rounded-3xl shadow-sm py-12 px-6 text-center">
                <h2 className="text-pink-600 text-xl font-semibold mb-2">
                  No offers found
                </h2>
                <p className="text-gray-500 text-sm">
                  Try adjusting your filters or check back soon for fresh
                  promotions.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Offers;

