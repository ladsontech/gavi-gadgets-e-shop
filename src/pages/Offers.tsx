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
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
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

      <div className="min-h-screen bg-white">
        <TuzisazePromo variant="full" />

        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 sm:py-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl font-normal text-black mb-1">
              Special Offers
            </h1>
            <p className="text-sm text-gray-500">
              {filteredProducts?.length || 0} {filteredProducts?.length === 1 ? 'product' : 'products'} available
            </p>
          </div>
          <div data-offers-grid>
            {productsLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-sm">Loading products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts as any} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-sm">No products found.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Offers;

