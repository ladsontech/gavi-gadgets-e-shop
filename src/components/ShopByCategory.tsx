import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Smartphone } from "lucide-react";

export const ShopByCategory: React.FC = () => {
  const items = [
    { label: "Phones", route: "/category/phones", imageSrc: "/images/gavi_accessories/phones.png" },
    { label: "Wearables", route: "/category/wearables", imageSrc: "/images/gavi_accessories/wearables.png" },
    { label: "PCs & Laptops", route: "/category/pcs-laptops", imageSrc: "/images/gavi_accessories/PCs.png" },
    { label: "Speakers", route: "/category/speakers", imageSrc: "/images/gavi_accessories/speakers.png" },
    { label: "TVs", route: "/category/tvs", imageSrc: "/images/gavi_accessories/TVS.png" },
    { label: "Accessories", route: "/category/accessories", imageSrc: "/images/gavi_accessories/accessories.png" },
    { label: "Gaming", route: "/category/gaming", imageSrc: "/images/gavi_accessories/gaming.png" },
  ] as const;

  return (
    <section aria-label="Shop by category" className="w-full py-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-pink-600 rounded-xl shadow-lg">
          <Smartphone className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Shop by Category</h2>
          <p className="text-gray-600 text-sm">Jump into our most popular categories</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {items.map(({ label, route, imageSrc }) => {
          const [imgOk, setImgOk] = useState(true);
          return (
            <Link key={label} to={route} className="group focus:outline-none" aria-label={`Browse ${label}`}>
              <div className="relative overflow-visible rounded-xl ring-1 ring-gray-200 hover:ring-2 hover:ring-gray-300 transition-all shadow-sm hover:shadow-md bg-white h-28 sm:h-32">
                {/* Circular background - pink */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-pink-100 group-hover:bg-pink-200 transition-colors" />
                
                {/* Image layer - overflowing from top */}
                {imgOk && imageSrc && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 sm:-translate-y-3 w-24 h-24 sm:w-28 sm:h-28">
                    <img
                      src={imageSrc}
                      alt={label}
                      className="w-full h-full object-contain"
                      onError={() => setImgOk(false)}
                      loading="lazy"
                    />
                  </div>
                )}
                {(!imgOk || !imageSrc) && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 sm:-translate-y-3 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-200 rounded-full" />
                  </div>
                )}
                
                {/* Content at bottom - just text, no icon */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 flex items-center justify-center">
                  <div className="text-xs sm:text-sm font-semibold text-gray-800 drop-shadow-sm">{label}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

