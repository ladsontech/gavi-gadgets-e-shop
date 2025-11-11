import { Home, Tag, LayoutGrid } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useCallback, useState, useEffect } from "react";

interface MobileMainNavProps {
  selectedCategory?: string | null;
  onCategoryChange?: (categoryId: string | null) => void;
  categories?: { id: string; name: string; slug: string }[];
}

export const MobileMainNav = ({
  selectedCategory,
  onCategoryChange,
  categories,
}: MobileMainNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const clickTimeoutRef = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const [activeTab, setActiveTab] = useState<"home" | "categories" | "offers">("home");

  const navItems = [
    { label: "Home", icon: Home, route: "/", tab: "home" as const },
    { label: "Categories", icon: LayoutGrid, route: "/categories", tab: "categories" as const },
    { label: "Offers", icon: Tag, route: "/offers", tab: "offers" as const },
  ];

  // Listen for tab changes from Index page
  useEffect(() => {
    const handleTabChange = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };
    window.addEventListener('mobileTabChanged', handleTabChange as EventListener);
    return () => {
      window.removeEventListener('mobileTabChanged', handleTabChange as EventListener);
    };
  }, []);

  // Sync with location changes
  useEffect(() => {
    if (location.pathname === "/categories") {
      setActiveTab("categories");
    } else if (location.pathname === "/offers") {
      setActiveTab("offers");
    } else if (location.pathname === "/") {
      setActiveTab("home");
    }
  }, [location.pathname]);

  const handleNavClick = useCallback(
    (item: typeof navItems[number]) => {
      const itemKey = item.route;
      if (clickTimeoutRef.current[itemKey]) {
        return;
      }

      clickTimeoutRef.current[itemKey] = setTimeout(() => {
        delete clickTimeoutRef.current[itemKey];
      }, 450);

      // On mobile, always navigate to home and switch tabs
      const tabMap: Record<string, "home" | "categories" | "offers"> = {
        "/": "home",
        "/categories": "categories",
        "/offers": "offers",
      };
      const targetTab = tabMap[item.route];
      
      if (targetTab) {
        // Always navigate to home page first
        if (location.pathname !== "/") {
          navigate("/", { replace: false });
        }
        // Then switch to the appropriate tab
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("switchMobileTab", { detail: targetTab }));
        }, 100);
      }
    },
    [location.pathname, navigate]
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden pointer-events-none">
      <div className="w-full">
        <div className="relative h-20">
          <div className="absolute inset-0 bg-gray-900 shadow-[0_-2px_10px_rgba(0,0,0,0.2)]" />
          <div className="absolute inset-0 bg-gray-950/95 border-t border-gray-800 backdrop-blur pointer-events-auto flex items-end justify-between px-6 pb-3">
            {navItems.map((item, index) => {
              // On mobile, check active based on current tab when on home page
              const active = location.pathname === "/" 
                ? activeTab === item.tab 
                : location.pathname === item.route;
              const Icon = item.icon;
              const isMiddle = index === 1;

              if (isMiddle) {
                return (
                  <button
                    key={item.label}
                    type="button"
                    aria-current={active ? "page" : undefined}
                    aria-label={item.label}
                    disabled={!!clickTimeoutRef.current[item.route]}
                    onClick={() => handleNavClick(item)}
                    className="absolute left-1/2 -translate-x-1/2 -top-7 flex flex-col items-center gap-1"
                  >
                    <div
                      className={`w-16 h-16 rounded-full border-4 border-gray-900 flex items-center justify-center transition-all duration-200 shadow-[0_12px_24px_rgba(236,72,153,0.35)] ${
                        active ? "bg-pink-500" : "bg-pink-500"
                      }`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="block max-w-[72px] truncate text-center text-[10px] font-semibold text-white/90">
                      {item.label}
                    </span>
                  </button>
                );
              }

              return (
                <button
                  key={item.label}
                  type="button"
                  aria-current={active ? "page" : undefined}
                  aria-label={item.label}
                  disabled={!!clickTimeoutRef.current[item.route]}
                  onClick={() => handleNavClick(item)}
                  className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                    active ? "text-pink-400" : "text-white/70"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-200 ${
                      active ? "bg-white/10" : "bg-transparent"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-medium leading-none">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
