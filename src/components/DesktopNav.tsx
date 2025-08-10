
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Smartphone, Package, Home } from "lucide-react";

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
  const navItems = [
    { label: "All Products", icon: Home, value: null },
    {
      label: "iPhones",
      icon: Smartphone,
      value: categories.find((c) =>
        c.slug?.toLowerCase().includes("iphone") || c.name?.toLowerCase().includes("iphone")
      )?.id,
    },
    {
      label: "Samsung",
      icon: Smartphone,
      value: categories.find((c) =>
        c.slug?.toLowerCase().includes("samsung") || c.name?.toLowerCase().includes("samsung")
      )?.id,
    },
    {
      label: "Pixel",
      icon: Smartphone,
      value: categories.find((c) =>
        c.slug?.toLowerCase().includes("pixel") ||
        c.name?.toLowerCase().includes("pixel")
      )?.id,
    },
    {
      label: "Others",
      icon: Package,
      value: "others",
    },
  ];

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
                onClick={() => onCategoryChange(item.value)}
                className={`gap-2 ${
                  selectedCategory === item.value ? "bg-pink-50 text-pink-600" : ""
                }`}
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
