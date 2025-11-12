
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
      <h2 className="text-xl sm:text-2xl font-bold text-pink-700 mb-3 sm:mb-4 px-1">
        <span className="bg-pink-100 rounded px-2 py-1">Featured This Week</span>
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {featuredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
