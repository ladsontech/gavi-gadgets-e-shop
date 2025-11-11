import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutGrid, Grid3x3 } from "lucide-react";

interface CategoriesSidebarProps {
  categories: { id: string; name: string; slug: string }[];
}

type CategoryCard = {
  label: string;
  slug: string;
  route: string;
  imageSrc?: string;
};

const categoryData: CategoryCard[] = [
  { label: "All", slug: "all", route: "/", imageSrc: undefined },
  { label: "Phones", slug: "phones", route: "/category/phones", imageSrc: "/images/gavi_accessories/phones.png" },
  { label: "Wearables", slug: "wearables", route: "/category/wearables", imageSrc: "/images/gavi_accessories/wearables.png" },
  { label: "PCs & Laptops", slug: "pcs-laptops", route: "/category/pcs-laptops", imageSrc: "/images/gavi_accessories/PCs.png" },
  { label: "Speakers", slug: "speakers", route: "/category/speakers", imageSrc: "/images/gavi_accessories/speakers.png" },
  { label: "TVs", slug: "tvs", route: "/category/tvs", imageSrc: "/images/gavi_accessories/TVS.png" },
  { label: "Accessories", slug: "accessories", route: "/category/accessories", imageSrc: "/images/gavi_accessories/accessories.png" },
  { label: "Gaming", slug: "gaming", route: "/category/gaming", imageSrc: "/images/gavi_accessories/gaming.png" },
];

export const CategoriesSidebar = ({ categories }: CategoriesSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide sidebar on certain pages
  const hideSidebarPages = ["/admin", "/cart", "/warranty", "/sitemap"];
  const shouldHide = hideSidebarPages.some(page => location.pathname === page);
  
  if (shouldHide) {
    return null;
  }

  const isActive = (route: string) => {
    if (route === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(route);
  };

  return (
    <aside className="hidden md:block w-72 flex-shrink-0 border-r border-gray-200 bg-white">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-6 px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-pink-600 rounded-lg">
            <LayoutGrid className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-black">Gavi Gadgets Shelves</h2>
            <p className="text-xs text-gray-600">Browse categories</p>
          </div>
        </div>
        <nav className="space-y-3">
          {categoryData.map((item) => {
            const active = isActive(item.route);
            return (
              <CategoryTile
                key={item.slug}
                label={item.label}
                route={item.route}
                imageSrc={item.imageSrc}
                active={active}
                onClick={() => navigate(item.route)}
              />
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

const CategoryTile: React.FC<{
  label: string;
  route: string;
  imageSrc?: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, route, imageSrc, active, onClick }) => {
  const [imgOk, setImgOk] = useState(!!imageSrc);
  const isAll = label === "All";
  
  return (
    <button
      onClick={onClick}
      className={`group w-full focus:outline-none text-left ${
        active ? "ring-2 ring-pink-500" : ""
      }`}
    >
      <div className="relative overflow-visible rounded-lg ring-1 ring-gray-200 hover:ring-2 hover:ring-gray-300 transition-all shadow-sm hover:shadow-md bg-white aspect-square">
        {/* Circular background - pink */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full transition-colors ${
          active ? "bg-pink-200" : "bg-pink-100 group-hover:bg-pink-200"
        }`} />
        
        {/* Image layer - overflowing from top */}
        {imageSrc && imgOk && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-24 h-24">
            <img
              src={imageSrc}
              alt={label}
              className="w-full h-full object-contain"
              onError={() => setImgOk(false)}
              loading="lazy"
            />
          </div>
        )}
        {(!imageSrc || !imgOk) && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-24 h-24 flex items-center justify-center">
            {isAll ? (
              <Grid3x3 className="w-12 h-12 text-pink-600" />
            ) : (
              <div className="w-12 h-12 bg-pink-200 rounded-full" />
            )}
          </div>
        )}
        
        {/* Content at bottom - just text */}
        <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center justify-center">
          <div className={`text-xs font-semibold ${active ? "text-pink-600" : "text-gray-800"}`}>
            {label}
          </div>
        </div>
      </div>
    </button>
  );
};

