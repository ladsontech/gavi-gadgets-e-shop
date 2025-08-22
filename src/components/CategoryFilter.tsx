
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown, Smartphone, Package } from "lucide-react";
import React from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const getSelectedLabel = () => {
    if (!selectedCategory) return "All Products";
    if (selectedCategory === "accessories") return "Accessories";
    return categories.find((cat) => cat.id === selectedCategory)?.name || "All Products";
  };

  return (
    <div className="mb-8 w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl shadow-lg">
          <Smartphone className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Shop by Category</h2>
          <p className="text-gray-600">Find phones, accessories, and more</p>
        </div>
      </div>
      
      {/* Mobile: dropdown menu */}
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between h-12 rounded-xl border-pink-200 hover:bg-pink-50 hover:border-pink-300 text-left"
            >
              <span className="flex items-center gap-2">
                {selectedCategory === "accessories" ? (
                  <Package className="w-4 h-4 text-pink-600" />
                ) : (
                  <Smartphone className="w-4 h-4 text-pink-600" />
                )}
                {getSelectedLabel()}
              </span>
              <ChevronDown className="ml-2 w-4 h-4 text-pink-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full !z-50 bg-white/95 backdrop-blur-md border-pink-200 shadow-xl">
            <DropdownMenuItem
              onClick={() => onCategoryChange(null)}
              className={`py-3 px-4 ${!selectedCategory ? "font-bold bg-pink-50 text-pink-700" : "hover:bg-pink-50"}`}
            >
              All Products
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`py-3 px-4 ${selectedCategory === category.id ? "font-bold bg-pink-50 text-pink-700" : "hover:bg-pink-50"}`}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              onClick={() => onCategoryChange("accessories")}
              className={`py-3 px-4 ${selectedCategory === "accessories" ? "font-bold bg-pink-50 text-pink-700" : "hover:bg-pink-50"}`}
            >
              Accessories
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Desktop/tablet: horizontal buttons */}
      <div className="hidden sm:flex flex-wrap gap-3">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => onCategoryChange(null)}
          className={`mb-2 rounded-xl px-6 py-3 transition-all duration-300 ${
            selectedCategory === null 
              ? "bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white shadow-lg" 
              : "border-pink-200 hover:bg-pink-50 hover:border-pink-300 hover:text-pink-700"
          }`}
        >
          All Products
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className={`mb-2 rounded-xl px-6 py-3 transition-all duration-300 ${
              selectedCategory === category.id 
                ? "bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white shadow-lg" 
                : "border-pink-200 hover:bg-pink-50 hover:border-pink-300 hover:text-pink-700"
            }`}
          >
            {category.name}
          </Button>
        ))}
        <Button
          variant={selectedCategory === "accessories" ? "default" : "outline"}
          onClick={() => onCategoryChange("accessories")}
          className={`mb-2 rounded-xl px-6 py-3 transition-all duration-300 flex items-center gap-2 ${
            selectedCategory === "accessories" 
              ? "bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white shadow-lg" 
              : "border-pink-200 hover:bg-pink-50 hover:border-pink-300 hover:text-pink-700"
          }`}
        >
          <Package className="w-4 h-4" />
          Accessories
        </Button>
      </div>
    </div>
  );
};
