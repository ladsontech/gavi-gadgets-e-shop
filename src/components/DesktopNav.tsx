
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Smartphone, Package, Home, Laptop, Tv, Speaker } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DesktopNavProps {
  categories: { id: string; name: string; slug: string }[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export const DesktopNav = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: DesktopNavProps) => {
  const navigate = useNavigate();
  const navItems = [
    { label: "All Products", icon: Home, route: "/" },
    { label: "Phones", icon: Smartphone, route: "/category/phones" },
    { label: "PCs & Laptops", icon: Laptop, route: "/category/pcs-laptops" },
    { label: "Speakers", icon: Speaker, route: "/category/speakers" },
    { label: "TVs", icon: Tv, route: "/category/tvs" },
    { label: "Accessories", icon: Package, route: "/category/accessories" },
  ] as const;

  return (
    <div className="hidden md:flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <Menu className="w-4 h-4" />
            Categories
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <DropdownMenuItem
                key={item.label}
                onClick={() => {
                  onCategoryChange(null);
                  navigate(item.route);
                }}
                className={`gap-2`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
