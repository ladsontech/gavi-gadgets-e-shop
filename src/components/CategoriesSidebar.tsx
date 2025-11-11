import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Smartphone, Package, Laptop, Tv, Speaker, Gamepad2, Watch, Home } from "lucide-react";

interface CategoriesSidebarProps {
  categories: { id: string; name: string; slug: string }[];
}

export const CategoriesSidebar = ({ categories }: CategoriesSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide sidebar on certain pages
  const hideSidebarPages = ["/admin", "/cart", "/warranty", "/sitemap"];
  const shouldHide = hideSidebarPages.some(page => location.pathname === page);
  
  if (shouldHide) {
    return null;
  }

  const navItems = [
    { label: "All Products", icon: Home, route: "/" },
    { label: "Phones", icon: Smartphone, route: "/category/phones" },
    { label: "Wearables", icon: Watch, route: "/category/wearables" },
    { label: "PCs & Laptops", icon: Laptop, route: "/category/pcs-laptops" },
    { label: "Speakers", icon: Speaker, route: "/category/speakers" },
    { label: "TVs", icon: Tv, route: "/category/tvs" },
    { label: "Accessories", icon: Package, route: "/category/accessories" },
    { label: "Gaming", icon: Gamepad2, route: "/category/gaming" },
  ] as const;

  const isActive = (route: string) => {
    if (route === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(route);
  };

  return (
    <aside className="hidden md:block w-64 flex-shrink-0 border-r border-gray-200 bg-white">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-6 px-4">
        <h2 className="text-lg font-semibold text-black mb-4 px-2">Categories</h2>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.route);
            return (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => navigate(item.route)}
                className={`w-full justify-start gap-3 px-3 py-2 h-auto ${
                  active
                    ? "bg-pink-50 text-pink-600 hover:bg-pink-100"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

