import { Home, Smartphone, Package } from "lucide-react";

interface MobileMainNavProps {
  // Keeping the interface for compatibility but not using category functionality
  selectedCategory?: string | null;
  onCategoryChange?: (categoryId: string | null) => void;
  categories?: { id: string; name: string; slug: string }[];
}

export const MobileMainNav = ({}: MobileMainNavProps) => {
  // Simplified nav items without category filtering
  const navItems = [
    { label: "Home", icon: Home, action: () => window.location.href = "/" },
    { label: "Call", icon: Smartphone, action: () => window.location.href = "tel:+256740799577" },
    { label: "WhatsApp", icon: Package, action: () => window.open("https://wa.me/256740799577", "_blank") },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-white shadow-lg border-t flex z-20 md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            type="button"
            className="flex-1 py-2 flex flex-col items-center justify-center gap-0.5 text-xs font-medium text-gray-500 hover:text-pink-500 transition-colors"
            onClick={item.action}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};