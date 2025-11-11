import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Package, ChevronDown, ChevronRight } from "lucide-react";

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
  is_featured: boolean;
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
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  if (products.length === 0) {
    return (
      <div className="text-center py-4 sm:py-6 md:py-8">
        <Package className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-2 sm:mb-4" />
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">No products yet</h3>
        <p className="text-gray-500 text-xs sm:text-sm md:text-base">Add your first smartphone to get started.</p>
      </div>
    );
  }

  const getDiscountPercentage = (price: number, originalPrice?: number) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const getConditionDisplay = (condition: string) => {
    switch(condition) {
      case 'new': return 'Brand New';
      case 'used': return 'UK Used';
      default: return condition;
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const categoryId = product.category_id || 'uncategorized';
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  // Sort categories by name and put uncategorized last
  const sortedCategoryIds = Object.keys(groupedProducts).sort((a, b) => {
    if (a === 'uncategorized') return 1;
    if (b === 'uncategorized') return -1;
    
    const categoryA = categories.find(c => c.id === a);
    const categoryB = categories.find(c => c.id === b);
    
    return (categoryA?.name || '').localeCompare(categoryB?.name || '');
  });

  // Initialize all categories as expanded by default
  React.useEffect(() => {
    const initialExpanded = sortedCategoryIds.reduce((acc, categoryId) => {
      acc[categoryId] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setExpandedCategories(initialExpanded);
  }, [products, categories]);

  const ProductCard = ({ product }: { product: Product }) => {
    const category = categories.find(c => c.id === product.category_id);
    const discount = getDiscountPercentage(product.price, product.original_price);
    
    return (
      <div className="border border-gray-200 rounded-lg p-2 sm:p-3 md:p-4 hover:shadow-md transition-shadow bg-white">
        <div className="flex gap-2 sm:gap-3 md:gap-4">
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
                    {product.brand || "No brand"}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {getConditionDisplay(product.condition)}
                  </Badge>
                  {product.is_featured && (
                    <Badge className="text-xs bg-orange-100 text-orange-800">
                      Featured
                    </Badge>
                  )}
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
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {sortedCategoryIds.map((categoryId) => {
        const categoryProducts = groupedProducts[categoryId];
        const category = categories.find(c => c.id === categoryId);
        const categoryName = categoryId === 'uncategorized' ? 'Uncategorized' : (category?.name || 'Unknown Category');
        const isExpanded = expandedCategories[categoryId];
        
        return (
          <div key={categoryId} className="border border-gray-200 rounded-lg bg-gray-50">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(categoryId)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  {categoryName}
                </h2>
                <Badge variant="outline" className="text-sm">
                  {categoryProducts.length} product{categoryProducts.length !== 1 ? 's' : ''}
                </Badge>
              </div>
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {/* Category Products */}
            {isExpanded && (
              <div className="p-4 pt-0">
                <div className="space-y-3 sm:space-y-4">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};