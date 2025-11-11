import React, { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Smartphone, Laptop, Tv, Speaker, Package, LayoutGrid, Gamepad2 } from "lucide-react";

type CategoryCard = {
  label: string;
  slug: string;
  route: string;
  imageSrc: string;
  icon: React.ComponentType<{ className?: string }>;
  bg: string;
  fg: string;
  ring: string;
};

const categories: CategoryCard[] = [
  { label: "Phones", slug: "phones", route: "/category/phones", imageSrc: "/images/gavi_accessories/wearables.png", icon: Smartphone, bg: "bg-pink-50", fg: "text-pink-700", ring: "ring-pink-200" },
  { label: "PCs & Laptops", slug: "pcs-laptops", route: "/category/pcs-laptops", imageSrc: "/images/gavi_accessories/PCs.png", icon: Laptop, bg: "bg-indigo-50", fg: "text-indigo-700", ring: "ring-indigo-200" },
  { label: "Speakers", slug: "speakers", route: "/category/speakers", imageSrc: "/images/gavi_accessories/speakers.png", icon: Speaker, bg: "bg-emerald-50", fg: "text-emerald-700", ring: "ring-emerald-200" },
  { label: "TVs", slug: "tvs", route: "/category/tvs", imageSrc: "/images/gavi_accessories/TVS.png", icon: Tv, bg: "bg-amber-50", fg: "text-amber-700", ring: "ring-amber-200" },
  { label: "Accessories", slug: "accessories", route: "/category/accessories", imageSrc: "/images/gavi_accessories/accessories.png", icon: Package, bg: "bg-sky-50", fg: "text-sky-700", ring: "ring-sky-200" },
  { label: "Gaming", slug: "gaming", route: "/category/gaming", imageSrc: "/images/gavi_accessories/gaming.png", icon: Gamepad2, bg: "bg-purple-50", fg: "text-purple-700", ring: "ring-purple-200" },
];

const CategoriesPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Gavi Gadgets - Shop by Category"
        description="Browse major categories: Phones, PCs & Laptops, Speakers, TVs, Accessories."
        keywords="phones, laptops, speakers, tvs, accessories"
      />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-20 py-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl shadow-lg">
              <LayoutGrid className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Shop by Category
              </h1>
              <p className="text-gray-600 text-sm">
                Pick a category to explore products
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {categories.map(({ label, route, imageSrc, icon: Icon, bg, fg, ring }) => (
              <CategoryTile
                key={label}
                label={label}
                route={route}
                imageSrc={imageSrc}
                Icon={Icon}
                bg={bg}
                fg={fg}
                ring={ring}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const CategoryTile: React.FC<{
  label: string;
  route: string;
  imageSrc: string;
  Icon: React.ComponentType<{ className?: string }>;
  bg: string;
  fg: string;
  ring: string;
}> = ({ label, route, imageSrc, Icon, bg, fg, ring }) => {
  const [imgOk, setImgOk] = useState(true);
  return (
    <Link to={route} className="group focus:outline-none">
      <div className={`relative overflow-visible rounded-xl ring-1 ${ring} hover:ring-2 transition-all shadow-sm hover:shadow-md ${bg} h-32 sm:h-36`}>
        {/* Circular background */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full ${bg} opacity-80 group-hover:opacity-100 transition-opacity`} />
        
        {/* Image layer - overflowing from top */}
        {imgOk && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 sm:-translate-y-3 w-28 h-28 sm:w-32 sm:h-32">
            <img
              src={imageSrc}
              alt={label}
              className="w-full h-full object-contain"
              onError={() => setImgOk(false)}
              loading="lazy"
            />
          </div>
        )}
        {!imgOk && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 sm:-translate-y-3 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
            <Icon className={`w-12 h-12 sm:w-14 sm:h-14 ${fg} opacity-60`} />
          </div>
        )}
        
        {/* Content at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-center gap-2">
          <div className={`rounded-lg bg-white/90 group-hover:bg-white p-1.5 shadow-sm`}>
            <Icon className={`w-4 h-4 ${fg}`} />
          </div>
          <div className={`text-sm font-semibold ${fg} drop-shadow-sm`}>{label}</div>
        </div>
      </div>
    </Link>
  );
};

export default CategoriesPage;


