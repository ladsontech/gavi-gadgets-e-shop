
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

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <p className="text-gray-500 text-sm sm:text-lg">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        {products.length} Product{products.length !== 1 ? 's' : ''} Available
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

