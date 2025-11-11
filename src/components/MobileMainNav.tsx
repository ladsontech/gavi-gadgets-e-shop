import { Home, Tag, LayoutGrid } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useCallback } from "react";

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
  const clickTimeoutRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  // Map nav labels to actual category slugs/ids for filtering
  const navItems = [
    { label: "Home", icon: Home, value: null, route: "/" },
    { label: "Categories", icon: LayoutGrid, value: null, route: "/categories" },
    { label: "Offers", icon: Tag, value: "featured", route: "/" },
  ];

  const handleNavClick = useCallback((item: typeof navItems[0]) => {
    // Prevent double clicks and freezing
    const itemKey = item.route;
    if (clickTimeoutRef.current[itemKey]) {
      return; // Already processing
    }

    // Set timeout to prevent rapid clicks
    clickTimeoutRef.current[itemKey] = setTimeout(() => {
      delete clickTimeoutRef.current[itemKey];
    }, 500);

    // Immediately update category for faster response when staying on same page
    if (item.route === "/") {
      onCategoryChange(item.value);
    }

    // Navigate if needed
    if (location.pathname !== item.route) {
      navigate(item.route, { replace: false });
    } else if (item.route === "/" && item.value) {
      // If already on home and clicking offers, just update category
      onCategoryChange(item.value);
      // Scroll to offers section
      setTimeout(() => {
        const element = document.querySelector('[data-offers-section]');
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [location.pathname, navigate, onCategoryChange]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl z-50 md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const active = location.pathname === item.route && 
            ((item.value === null && !selectedCategory) || item.value === selectedCategory);
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavClick(item)}
              disabled={!!clickTimeoutRef.current[item.route]}
              className={`
                relative flex flex-col items-center justify-center gap-1 
                flex-1 h-full rounded-xl transition-all duration-200
                ${active
                  ? "text-pink-600 bg-pink-50 scale-105"
                  : "text-gray-500 active:scale-95"}
                disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2
              `}
              aria-current={active ? "page" : undefined}
              aria-label={item.label}
            >
              <div className={`
                relative p-2 rounded-lg transition-all duration-200
                ${active ? "bg-pink-100" : "bg-transparent"}
              `}>
                <Icon className={`w-5 h-5 transition-transform duration-200 ${active ? "scale-110" : ""}`} />
                {active && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-600 rounded-full animate-pulse" />
                )}
              </div>
              <span className={`
                text-[10px] sm:text-xs font-medium leading-tight transition-all duration-200
                ${active ? "font-bold" : "font-normal"}
              `}>
                {item.label}
              </span>
              {active && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-pink-600 rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
