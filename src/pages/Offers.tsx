import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductGrid } from "@/components/ProductGrid";
import SEOHead from "@/components/SEOHead";
import { useSearch } from "@/contexts/SearchContext";
import { TuzisazePromo } from "@/components/TuzisazePromo";

const Offers = () => {
  const { searchQuery } = useSearch();

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
      original_price?: number | null;
      created_at?: string | null;
    }>;

    let result = base.filter(
      (p) => p.is_featured && p.original_price !== null && p.original_price !== undefined
    );

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

    result.sort(
      (a, b) =>
        new Date(b.created_at || 0).getTime() -
        new Date(a.created_at || 0).getTime()
    );

    return result;
  }, [allProducts, searchQuery]);

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
          <div className="mt-8 sm:mt-12" data-offers-grid>
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
                  Check back soon for fresh promotions.
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

