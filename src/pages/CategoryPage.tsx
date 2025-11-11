import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";
import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet";

type Product = {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  original_price?: number;
  description?: string;
  images: string[];
  category_id: string | null;
  slug: string;
  is_active: boolean;
  condition: string;
  features?: string[];
  stock_quantity: number;
  is_featured: boolean;
  is_weekly_offer: boolean;
  offer_start_date?: string;
  offer_end_date?: string;
  created_at: string;
  updated_at: string;
  categories?: {
    id: string;
    name: string;
    slug: string;
  };
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

const titleMap: Record<string, string> = {
  "phones": "Phones",
  "wearables": "Wearables",
  "pcs-laptops": "PCs & Laptops",
  "speakers": "Speakers",
  "accessories": "Accessories",
  "tvs": "TVs",
  "gaming": "Gaming",
};

export default function CategoryPage() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const [brandFilter, setBrandFilter] = useState<"all" | "apple" | "samsung" | "pixel" | "others">("all");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState("all");

  const { data: allProducts, isLoading } = useQuery({
    queryKey: ["productsAll"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          categories (
            id,
            name,
            slug
          )
        `)
        .eq("is_active", true);
      if (error) throw error;
      return data as Product[];
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("name", { ascending: true });
      if (error) throw error;
      return data as Category[];
    },
    staleTime: 10 * 60 * 1000,
  });

  const accessoriesCategoryId = useMemo(() => {
    const found = categories?.find(
      (c) => c.name?.toLowerCase().includes("accessor")
    );
    return found?.id;
  }, [categories]);

  const productsForMajor = useMemo(() => {
    const list = allProducts || [];
    const nameIncludes = (value: string | undefined, term: string) =>
      (value || "").toLowerCase().includes(term);

    if (slug === "phones") {
      return list.filter((p) => {
        const brand = (p.brand || "").toLowerCase();
        const name = (p.name || "").toLowerCase();
        return (
          brand.includes("apple") ||
          brand.includes("iphone") ||
          name.includes("iphone") ||
          brand.includes("samsung") ||
          name.includes("galaxy") ||
          brand.includes("google") ||
          name.includes("pixel") ||
          nameIncludes(name, "phone")
        );
      });
    }
    if (slug === "pcs-laptops") {
      return list.filter((p) => {
        const name = (p.name || "").toLowerCase();
        return (
          name.includes("laptop") ||
          name.includes("pc") ||
          name.includes("notebook") ||
          name.includes("macbook") ||
          name.includes("computer")
        );
      });
    }
    if (slug === "speakers") {
      return list.filter((p) => {
        const name = (p.name || "").toLowerCase();
        return (
          name.includes("speaker") ||
          name.includes("soundbar") ||
          name.includes("audio") ||
          name.includes("bluetooth speaker")
        );
      });
    }
    if (slug === "tvs") {
      return list.filter((p) => {
        const name = (p.name || "").toLowerCase();
        return (
          name.includes("tv") ||
          name.includes("television") ||
          name.includes("oled") ||
          name.includes("qled")
        );
      });
    }
    if (slug === "gaming") {
      return list.filter((p) => {
        const name = (p.name || "").toLowerCase();
        return (
          name.includes("ps5") ||
          name.includes("ps4") ||
          name.includes("playstation") ||
          name.includes("xbox") ||
          name.includes("nintendo") ||
          name.includes("switch") ||
          name.includes("console") ||
          name.includes("controller") ||
          name.includes("dualshock") ||
          name.includes("dualsense") ||
          name.includes("gaming")
        );
      });
    }
    if (slug === "wearables") {
      return list.filter((p) => {
        const name = (p.name || "").toLowerCase();
        const brand = (p.brand || "").toLowerCase();
        return (
          name.includes("watch") ||
          name.includes("smartwatch") ||
          name.includes("apple watch") ||
          name.includes("fitbit") ||
          name.includes("band") ||
          name.includes("tracker") ||
          name.includes("wearable") ||
          brand.includes("apple watch") ||
          name.includes("airpods") ||
          name.includes("earbuds") ||
          name.includes("wireless earbuds")
        );
      });
    }
    if (slug === "accessories") {
      return list.filter((p) => {
        if (accessoriesCategoryId && p.category_id) {
          return p.category_id === accessoriesCategoryId;
        }
        const name = (p.name || "").toLowerCase();
        return (
          name.includes("case") ||
          name.includes("cover") ||
          name.includes("charger") ||
          name.includes("cable") ||
          name.includes("protector") ||
          name.includes("adapter") ||
          name.includes("accessor")
        );
      });
    }
    // default: show all if slug not matched
    return list;
  }, [allProducts, slug, accessoriesCategoryId]);

  const filteredSorted = useMemo(() => {
    let result = productsForMajor;
    if (slug === "phones" && brandFilter !== "all") {
      result = result.filter((p) => {
        const b = (p.brand || "").toLowerCase();
        if (brandFilter === "apple") return b.includes("apple") || b.includes("iphone");
        if (brandFilter === "samsung") return b.includes("samsung");
        if (brandFilter === "pixel") return b.includes("google") || b.includes("pixel");
        // others
        return !(
          b.includes("apple") ||
          b.includes("iphone") ||
          b.includes("samsung") ||
          b.includes("google") ||
          b.includes("pixel")
        );
      });
    }

    // Price range
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
    } else {
      sorted.sort(
        (a, b) =>
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime()
      );
    }
    return sorted;
  }, [productsForMajor, slug, brandFilter, priceRange, sortBy]);

  const pageTitle = titleMap[slug] || "Products";

  const PriceSortControls = (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-4 h-4 text-pink-600" />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="h-9 border rounded-md px-2 text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-pink-600" />
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="h-9 border rounded-md px-2 text-sm"
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
  );

  return (
    <>
      <SEOHead
        title={`Gavi Gadgets - ${pageTitle}`}
        description={`Browse ${pageTitle} at Gavi Gadgets Uganda.`}
        keywords={`${pageTitle}, Gavi Gadgets Uganda`}
      />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-20 py-6 sm:py-8">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-normal text-black mb-1">
                {pageTitle}
              </h1>
              <p className="text-sm text-gray-500">
                {filteredSorted.length} {filteredSorted.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              {slug !== "gaming" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/category/gaming")}
                  className="text-pink-600 border-pink-200 hover:bg-pink-50"
                >
                  Gaming
                </Button>
              )}
              {PriceSortControls}
            </div>
          </div>

          {/* Mobile: sticky filters/sort bar */}
          <div className="md:hidden sticky top-16 z-30 bg-white border-b border-gray-100">
            <div className="py-2 flex items-center gap-2">
              {slug !== "gaming" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/category/gaming")}
                  className="text-pink-600 border-pink-200 hover:bg-pink-50"
                >
                  Gaming
                </Button>
              )}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="p-4">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>

                  {slug === "phones" && (
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">Brand</div>
                      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                        <Button variant={brandFilter === "all" ? "default" : "outline"} size="sm" onClick={() => setBrandFilter("all")}>All</Button>
                        <Button variant={brandFilter === "apple" ? "default" : "outline"} size="sm" onClick={() => setBrandFilter("apple")}>Apple</Button>
                        <Button variant={brandFilter === "samsung" ? "default" : "outline"} size="sm" onClick={() => setBrandFilter("samsung")}>Samsung</Button>
                        <Button variant={brandFilter === "pixel" ? "default" : "outline"} size="sm" onClick={() => setBrandFilter("pixel")}>Google Pixel</Button>
                        <Button variant={brandFilter === "others" ? "default" : "outline"} size="sm" onClick={() => setBrandFilter("others")}>Others</Button>
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Sort & Price</div>
                    <div>{PriceSortControls}</div>
                  </div>

                  <SheetFooter className="mt-4">
                    <SheetClose asChild>
                      <Button className="w-full">Apply</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-2 ml-auto">
                <ArrowUpDown className="w-4 h-4 text-pink-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-9 border rounded-md px-2 text-sm bg-white"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low</option>
                  <option value="price-high">Price: High</option>
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop: brand chips visible only on md+ */}
          {slug === "phones" && (
            <div className="hidden md:flex mb-4 flex-wrap gap-2">
              <Button
                variant={brandFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setBrandFilter("all")}
              >
                All Brands
              </Button>
              <Button
                variant={brandFilter === "apple" ? "default" : "outline"}
                size="sm"
                onClick={() => setBrandFilter("apple")}
              >
                Apple
              </Button>
              <Button
                variant={brandFilter === "samsung" ? "default" : "outline"}
                size="sm"
                onClick={() => setBrandFilter("samsung")}
              >
                Samsung
              </Button>
              <Button
                variant={brandFilter === "pixel" ? "default" : "outline"}
                size="sm"
                onClick={() => setBrandFilter("pixel")}
              >
                Google Pixel
              </Button>
              <Button
                variant={brandFilter === "others" ? "default" : "outline"}
                size="sm"
                onClick={() => setBrandFilter("others")}
              >
                Others
              </Button>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : (
            <ProductGrid products={filteredSorted || []} />
          )}

          <div className="mt-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-pink-600"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

