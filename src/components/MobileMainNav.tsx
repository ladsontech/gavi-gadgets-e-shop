
import { Home, Smartphone, Package } from "lucide-react";
import { useEffect } from "react";

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
  // Map nav labels to actual category slugs/ids for filtering
  const navItems = [
    { label: "Home", icon: Home, value: null },
    {
      label: "iPhones",
      icon: Smartphone,
      value: categories.find((c) =>
        c.slug?.toLowerCase().includes("iphone")
      )?.id,
    },
    {
      label: "Samsung",
      icon: Smartphone,
      value: categories.find((c) =>
        c.slug?.toLowerCase().includes("samsung")
      )?.id,
    },
    {
      label: "Google Pixel",
      icon: Smartphone,
      value: categories.find((c) =>
        c.slug?.toLowerCase().includes("pixel") ||
        c.name?.toLowerCase().includes("pixel")
      )?.id,
    },
    {
      label: "Others",
      icon: Package,
      value: "others", // Special value for non-phone items
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-white shadow-lg border-t flex z-20 md:hidden">
      {navItems.map((item) => {
        const active =
          (item.value === null && !selectedCategory) ||
          item.value === selectedCategory;
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            type="button"
            className={`flex-1 py-2 flex flex-col items-center justify-center gap-0.5 text-xs font-medium
              ${active
                ? "text-pink-600"
                : "text-gray-500 hover:text-pink-500"}
              transition-colors`}
            onClick={() => onCategoryChange(item.value)}
            aria-current={active ? "page" : undefined}
          >
            <Icon className={`w-5 h-5 mb-1`} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
