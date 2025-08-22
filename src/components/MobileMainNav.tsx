
import { Home, Smartphone, Package } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface MobileMainNavProps {
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  categories: { id: string; name: string; slug: string }[];
}

export const MobileMainNav = ({
  selectedCategory,
  onCategoryChange,
  categories,
}: MobileMainNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Map nav labels to actual category slugs/ids for filtering
  const navItems = [
    { label: "Home", icon: Home, value: null, route: "/" },
    {
      label: "iPhones",
      icon: Smartphone,
      value: categories.find((c) =>
        c.slug?.toLowerCase().includes("iphone") || c.name?.toLowerCase().includes("iphone")
      )?.id || null,
      route: "/",
    },
    {
      label: "Samsung",
      icon: Smartphone,
      value: categories.find((c) =>
        c.slug?.toLowerCase().includes("samsung") || c.name?.toLowerCase().includes("samsung")
      )?.id || null,
      route: "/",
    },
    {
      label: "Pixel",
      icon: Smartphone,
      value: categories.find((c) =>
        c.slug?.toLowerCase().includes("pixel") ||
        c.name?.toLowerCase().includes("pixel")
      )?.id || null,
      route: "/",
    },
    {
      label: "Accessories",
      icon: Package,
      value: "accessories",
      route: "/",
    },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (location.pathname !== item.route) {
      navigate(item.route);
    }
    onCategoryChange(item.value);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-white shadow-lg border-t flex z-20 md:hidden">
      {navItems.map((item) => {
        const active =
          location.pathname === item.route && 
          ((item.value === null && !selectedCategory) || item.value === selectedCategory);
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            type="button"
            className={`flex-1 py-2 flex flex-col items-center justify-center gap-0.5 text-xs font-medium
              ${active
                ? "text-pink-600 bg-pink-50"
                : "text-gray-500 hover:text-pink-500"}
              transition-colors`}
            onClick={() => handleNavClick(item)}
            aria-current={active ? "page" : undefined}
          >
            <Icon className={`w-5 h-5 mb-1 ${active ? "text-pink-600" : ""}`} />
            <span className={active ? "font-semibold" : ""}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
