
import { Home, Tag, Package, Headphones } from "lucide-react";
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
      label: "Offers",
      icon: Tag,
      value: "featured",
      route: "/",
    },
    {
      label: "Accessories",
      icon: Package,
      value: categories.find((c) =>
        c.slug?.toLowerCase().includes("accessories") || c.name?.toLowerCase().includes("accessories")
      )?.id || null,
      route: "/",
    },
    {
      label: "Audio",
      icon: Headphones,
      value: categories.find((c) =>
        c.slug?.toLowerCase().includes("audio") || 
        c.name?.toLowerCase().includes("audio") ||
        c.slug?.toLowerCase().includes("headphones") ||
        c.name?.toLowerCase().includes("headphones") ||
        c.slug?.toLowerCase().includes("speakers") ||
        c.name?.toLowerCase().includes("speakers")
      )?.id || null,
      route: "/",
    },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    // Immediately update category for faster response
    onCategoryChange(item.value);
    
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
