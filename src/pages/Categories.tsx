import React, { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { LayoutGrid } from "lucide-react";

type CategoryCard = {
  label: string;
  slug: string;
  route: string;
  imageSrc: string;
};

const categories: CategoryCard[] = [
  { label: "Phones", slug: "phones", route: "/category/phones", imageSrc: "/images/gavi_accessories/wearables.png" },
  { label: "PCs & Laptops", slug: "pcs-laptops", route: "/category/pcs-laptops", imageSrc: "/images/gavi_accessories/PCs.png" },
  { label: "Speakers", slug: "speakers", route: "/category/speakers", imageSrc: "/images/gavi_accessories/speakers.png" },
  { label: "TVs", slug: "tvs", route: "/category/tvs", imageSrc: "/images/gavi_accessories/TVS.png" },
  { label: "Accessories", slug: "accessories", route: "/category/accessories", imageSrc: "/images/gavi_accessories/accessories.png" },
  { label: "Gaming", slug: "gaming", route: "/category/gaming", imageSrc: "/images/gavi_accessories/gaming.png" },
];

const CategoriesPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Gavi Gadgets Shelves - Browse Categories"
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
                Gavi Gadgets Shelves
              </h1>
              <p className="text-gray-600 text-sm">
                Browse our product categories
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {categories.map(({ label, route, imageSrc }) => (
              <CategoryTile
                key={label}
                label={label}
                route={route}
                imageSrc={imageSrc}
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
}> = ({ label, route, imageSrc }) => {
  const [imgOk, setImgOk] = useState(true);
  return (
    <Link to={route} className="group focus:outline-none">
      <div className="relative overflow-visible rounded-xl ring-1 ring-gray-200 hover:ring-2 hover:ring-gray-300 transition-all shadow-sm hover:shadow-md bg-white h-32 sm:h-36">
        {/* Circular background - pink */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-pink-100 group-hover:bg-pink-200 transition-colors" />
        
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
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-pink-200 rounded-full" />
          </div>
        )}
        
        {/* Content at bottom - just text, no icon */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-center">
          <div className="text-sm font-semibold text-gray-800 drop-shadow-sm">{label}</div>
        </div>
      </div>
    </Link>
  );
};

export default CategoriesPage;


