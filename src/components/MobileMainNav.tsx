
import { Home, Tag, Package, Smartphone, Tv } from "lucide-react";
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
      label: "Phones",
      icon: Smartphone,
      value: null,
      route: "/category/phones",
    },
    {
      label: "Offers",
      icon: Tag,
      value: "featured",
      route: "/",
    },
    {
      label: "TVs",
      icon: Tv,
      value: null,
      route: "/category/tvs",
    },
    { label: "Accessories", icon: Package, value: null, route: "/category/accessories" },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    // Immediately update category for faster response when staying on same page
    if (item.route === "/") {
      onCategoryChange(item.value);
    }

    if (location.pathname !== item.route) {
      navigate(item.route);
    }
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
            className={`flex-1 py-1.5 flex flex-col items-center justify-center gap-0.5 text-xs font-medium
              ${active
                ? "text-pink-600 bg-pink-50"
                : "text-gray-500 hover:text-pink-500"}
              transition-colors`}
            onClick={() => handleNavClick(item)}
            aria-current={active ? "page" : undefined}
          >
            <Icon className={`w-4 h-4 mb-0.5 ${active ? "text-pink-600" : ""}`} />
            <span className={`text-xs leading-tight ${active ? "font-semibold" : ""}`}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
