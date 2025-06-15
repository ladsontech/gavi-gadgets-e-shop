
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
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
  return (
    <div className="mb-8 w-full">
      <h2 className="text-2xl font-bold mb-4">Shop by Brand</h2>
      {/* Mobile: dropdown menu */}
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedCategory
                ? categories.find((cat) => cat.id === selectedCategory)?.name || "All Phones"
                : "All Phones"}
              <ChevronDown className="ml-2 w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full !z-50">
            <DropdownMenuItem
              onClick={() => onCategoryChange(null)}
              className={!selectedCategory ? "font-bold text-pink-600" : ""}
            >
              All Phones
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={selectedCategory === category.id ? "font-bold text-pink-600" : ""}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Desktop/tablet: horizontal buttons */}
      <div className="hidden sm:flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => onCategoryChange(null)}
          className="mb-2"
        >
          All Phones
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className="mb-2"
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
