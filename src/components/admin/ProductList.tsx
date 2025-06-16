
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
  condition: string;
  images: string[];
  description?: string;
  category_id?: string;
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
      <div className="text-center py-8 sm:py-12">
        <Package className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
        <p className="text-gray-500 text-sm sm:text-base">Add your first smartphone to get started.</p>
      </div>
    );
  }

  const getDiscountPercentage = (price: number, originalPrice?: number) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {products.map((product) => {
        const category = categories.find(c => c.id === product.category_id);
        const discount = getDiscountPercentage(product.price, product.original_price);
        
        return (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex gap-3 sm:gap-4">
              {/* Product Image */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                {product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                      {product.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {category?.name || "No brand"}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {product.condition}
                      </Badge>
                      {discount > 0 && (
                        <Badge className="text-xs bg-red-100 text-red-800">
                          -{discount}%
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex flex-col sm:items-end gap-2">
                    <div className="text-right">
                      <div className="font-semibold text-green-600 text-sm sm:text-base">
                        UGX {Number(product.price).toLocaleString()}
                      </div>
                      {product.original_price && discount > 0 && (
                        <div className="text-xs text-gray-400 line-through">
                          UGX {Number(product.original_price).toLocaleString()}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(product)}
                        className="p-1 sm:p-2"
                      >
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(product.id)}
                        className="p-1 sm:p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Description (mobile friendly) */}
                {product.description && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                  </p>
                )}

                {/* Image count */}
                <div className="text-xs text-gray-500 mt-1">
                  {product.images.length} image{product.images.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
