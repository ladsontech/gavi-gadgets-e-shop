
import { ProductCard } from "@/components/ProductCard";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  original_price?: number;
  brand: string;
  model: string;
  storage_capacity?: string;
  color?: string;
  condition: string;
  stock_quantity: number;
  images: string[];
  description?: string;
  is_featured: boolean;
  categories?: {
    id: string;
    name: string;
    slug: string;
  };
}

interface FeaturedProductsProps {
  products: Product[];
}

export const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  const featuredProducts = products.filter(product => product.is_featured);
  
  if (!featuredProducts.length) return null;
  
  return (
    <section className="mb-6 sm:mb-10">
      <h2 className="text-xl sm:text-2xl font-bold text-pink-700 mb-3 sm:mb-4 px-4">
        <span className="bg-pink-100 rounded px-2 py-1">Featured This Week</span>
      </h2>
      {/* Mobile: horizontal scroll with 2 columns */}
      <div className="md:hidden overflow-x-auto px-4">
        <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
          {featuredProducts.map(product => (
            <div key={product.id} className="w-[160px] flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      {/* Desktop: grid layout */}
      <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 px-4">
        {featuredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
