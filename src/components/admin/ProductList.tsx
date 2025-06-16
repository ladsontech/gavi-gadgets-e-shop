
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Package } from "lucide-react";

type Product = {
  id: string;
  name: string;
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
  category_id?: string;
  features?: string[];
  slug: string;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

interface ProductListProps {
  products: Product[];
  categories: Category[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  categories,
  onEdit,
  onDelete,
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
        <p className="text-gray-500 mb-4">Get started by adding your first product.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                {product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {product.brand} {product.model}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {categories.find(c => c.id === product.category_id)?.name || "No category"}
                      </Badge>
                      {product.is_featured && (
                        <Badge className="text-xs bg-orange-100 text-orange-800">
                          Featured
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {product.condition}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    <div className="font-semibold text-green-600">
                      UGX {Number(product.price).toLocaleString()}
                    </div>
                    {product.original_price && (
                      <div className="text-sm text-gray-400 line-through">
                        UGX {Number(product.original_price).toLocaleString()}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                      Stock: {product.stock_quantity}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(product)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete(product.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {product.description && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                  </p>
                )}

                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  {product.color && <span>Color: {product.color}</span>}
                  {product.storage_capacity && <span>Storage: {product.storage_capacity}</span>}
                  <span>{product.images.length} image{product.images.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
