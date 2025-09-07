import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown, Smartphone, Package, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductSidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  priceRange: string;
  onPriceRangeChange: (range: string) => void;
}

export const ProductSidebar = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange
}: ProductSidebarProps) => {
  const getSelectedLabel = () => {
    if (!selectedCategory) return "All Products";
    if (selectedCategory === "accessories") return "Accessories";
    return categories.find((cat) => cat.id === selectedCategory)?.name || "All Products";
  };

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ];

  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-500000", label: "Under 500K" },
    { value: "500000-1000000", label: "500K - 1M" },
    { value: "1000000-2000000", label: "1M - 2M" },
    { value: "2000000-5000000", label: "2M - 5M" },
    { value: "5000000+", label: "Above 5M" },
  ];

  return (
    <div className="hidden md:block w-48 bg-white rounded-lg border border-gray-200 p-3 h-fit sticky top-4">
      {/* Categories Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Smartphone className="w-5 h-5 text-pink-600" />
          <h3 className="font-semibold text-gray-900">Categories</h3>
        </div>
        
        <div className="space-y-2">
          <Button
            variant={selectedCategory === null ? "default" : "ghost"}
            onClick={() => onCategoryChange(null)}
            className={`w-full justify-start text-sm h-9 ${
              selectedCategory === null 
                ? "bg-pink-600 text-white hover:bg-pink-700" 
                : "hover:bg-gray-100"
            }`}
          >
            All Products
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full justify-start text-sm h-9 ${
                selectedCategory === category.id 
                  ? "bg-pink-600 text-white hover:bg-pink-700" 
                  : "hover:bg-gray-100"
              }`}
            >
              {category.name}
            </Button>
          ))}
          
          <Button
            variant={selectedCategory === "accessories" ? "default" : "ghost"}
            onClick={() => onCategoryChange("accessories")}
            className={`w-full justify-start text-sm h-9 ${
              selectedCategory === "accessories" 
                ? "bg-pink-600 text-white hover:bg-pink-700" 
                : "hover:bg-gray-100"
            }`}
          >
            <Package className="w-4 h-4 mr-2" />
            Accessories
          </Button>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Sort Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <ArrowUpDown className="w-5 h-5 text-pink-600" />
          <h3 className="font-semibold text-gray-900">Sort By</h3>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between h-9 text-sm"
            >
              {sortOptions.find(opt => opt.value === sortBy)?.label || "Newest First"}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full !z-50 bg-white border shadow-lg">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onSortChange(option.value)}
                className={`text-sm ${sortBy === option.value ? "font-medium bg-pink-50 text-pink-700" : ""}`}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator className="mb-6" />

      {/* Price Range Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="w-5 h-5 text-pink-600" />
          <h3 className="font-semibold text-gray-900">Price Range</h3>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between h-9 text-sm"
            >
              {priceRanges.find(range => range.value === priceRange)?.label || "All Prices"}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full !z-50 bg-white border shadow-lg">
            {priceRanges.map((range) => (
              <DropdownMenuItem
                key={range.value}
                onClick={() => onPriceRangeChange(range.value)}
                className={`text-sm ${priceRange === range.value ? "font-medium bg-pink-50 text-pink-700" : ""}`}
              >
                {range.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};