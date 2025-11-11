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
export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange
}: CategoryFilterProps) => {
  const getSelectedLabel = () => {
    if (!selectedCategory) return "All Products";
    if (selectedCategory === "accessories") return "Accessories";
    return categories.find(cat => cat.id === selectedCategory)?.name || "All Products";
  };
  return <div className="mb-8 w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-pink-600 rounded-xl shadow-lg">
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
          <div className="w-full h-12 rounded-xl border border-pink-200 hover:bg-pink-50 hover:border-pink-300 flex items-center justify-between px-4">
            <span className="flex items-center gap-2 flex-1">
              {selectedCategory === "accessories" ? <Package className="w-4 h-4 text-pink-600" /> : <Smartphone className="w-4 h-4 text-pink-600" />}
              <span className="text-sm">{getSelectedLabel()}</span>
            </span>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-pink-100 rounded transition-colors">
                <ChevronDown className="w-4 h-4 text-pink-600" />
              </button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="w-full !z-50 bg-white/95 backdrop-blur-md border-pink-200 shadow-xl">
            <DropdownMenuItem onClick={() => onCategoryChange(null)} className={`py-3 px-4 ${!selectedCategory ? "font-bold bg-pink-50 text-pink-700" : "hover:bg-pink-50"}`}>
              All Products
            </DropdownMenuItem>
            {categories.map(category => <DropdownMenuItem key={category.id} onClick={() => onCategoryChange(category.id)} className={`py-3 px-4 ${selectedCategory === category.id ? "font-bold bg-pink-50 text-pink-700" : "hover:bg-pink-50"}`}>
                {category.name}
              </DropdownMenuItem>)}
            <DropdownMenuItem onClick={() => onCategoryChange("accessories")} className={`py-3 px-4 ${selectedCategory === "accessories" ? "font-bold bg-pink-50 text-pink-700" : "hover:bg-pink-50"}`}>
              Accessories
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Desktop/tablet: horizontal buttons */}
      
    </div>;
};