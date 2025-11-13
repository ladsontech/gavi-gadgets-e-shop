import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutGrid, Grid3x3, Wrench } from "lucide-react";

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
  { label: "Repair", slug: "repair", route: "/repair", imageSrc: undefined },
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
    <aside className="hidden md:block w-56 flex-shrink-0 border-r border-gray-200 bg-white">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-6 px-3">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-1.5 bg-pink-600 rounded-lg">
            <LayoutGrid className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-black">Categories</h2>
            <p className="text-[10px] text-gray-600">Browse all</p>
          </div>
        </div>
        <nav className="grid grid-cols-2 gap-2">
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
      className={`group w-full focus:outline-none ${
        active ? "ring-2 ring-pink-500" : ""
      }`}
    >
      <div className="relative overflow-visible rounded-lg ring-1 ring-gray-200 hover:ring-2 hover:ring-gray-300 transition-all shadow-sm hover:shadow-md bg-white h-[72px]">
        {/* Circular background - pink */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full transition-colors ${
          active ? "bg-pink-200" : "bg-pink-100 group-hover:bg-pink-200"
        }`} />
        
        {/* Image layer - overflowing from top */}
        {imageSrc && imgOk && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-14 h-14">
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-14 h-14 flex items-center justify-center">
            {isAll ? (
              <Grid3x3 className="w-7 h-7 text-pink-600" />
            ) : label === "Repair" ? (
              <Wrench className="w-7 h-7 text-pink-600" />
            ) : (
              <div className="w-7 h-7 bg-pink-200 rounded-full" />
            )}
          </div>
        )}
        
        {/* Content at bottom - just text */}
        <div className="absolute bottom-0 left-0 right-0 p-1 flex items-center justify-center">
          <div className={`text-[10px] font-semibold leading-tight ${active ? "text-pink-600" : "text-gray-800"}`}>
            {label}
          </div>
        </div>
      </div>
    </button>
  );
};

