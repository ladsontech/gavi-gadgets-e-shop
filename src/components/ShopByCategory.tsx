import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Smartphone, Laptop, Tv, Speaker, Package, Gamepad2 } from "lucide-react";

export const ShopByCategory: React.FC = () => {
  const items = [
    { label: "Phones", icon: Smartphone, route: "/category/phones", imageSrc: "/images/gavi_accessories/wearables.png", bg: "bg-pink-50", fg: "text-pink-700", ring: "ring-pink-200" },
    { label: "PCs & Laptops", icon: Laptop, route: "/category/pcs-laptops", imageSrc: "/images/gavi_accessories/PCs.png", bg: "bg-indigo-50", fg: "text-indigo-700", ring: "ring-indigo-200" },
    { label: "Speakers", icon: Speaker, route: "/category/speakers", imageSrc: "/images/gavi_accessories/speakers.png", bg: "bg-emerald-50", fg: "text-emerald-700", ring: "ring-emerald-200" },
    { label: "TVs", icon: Tv, route: "/category/tvs", imageSrc: "/images/gavi_accessories/TVS.png", bg: "bg-amber-50", fg: "text-amber-700", ring: "ring-amber-200" },
    { label: "Accessories", icon: Package, route: "/category/accessories", imageSrc: "/images/gavi_accessories/accessories.png", bg: "bg-sky-50", fg: "text-sky-700", ring: "ring-sky-200" },
    { label: "Gaming", icon: Gamepad2, route: "/category/gaming", imageSrc: "/images/gavi_accessories/gaming.png", bg: "bg-purple-50", fg: "text-purple-700", ring: "ring-purple-200" },
  ] as const;

  return (
    <section aria-label="Shop by category" className="w-full py-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl shadow-lg">
          <Smartphone className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Shop by Category</h2>
          <p className="text-gray-600 text-sm">Jump into our most popular categories</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {items.map(({ label, icon: Icon, route, imageSrc, bg, fg, ring }) => {
          const [imgOk, setImgOk] = useState(true);
          return (
            <Link key={label} to={route} className="group focus:outline-none" aria-label={`Browse ${label}`}>
              <div
                className={`relative overflow-visible rounded-xl ${bg} ring-1 ${ring} hover:ring-2 transition-all shadow-sm hover:shadow-md h-28 sm:h-32`}
              >
                {/* Circular background */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full ${bg} opacity-80 group-hover:opacity-100 transition-opacity`} />
                
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
                    <Icon className={`w-10 h-10 sm:w-12 sm:h-12 ${fg} opacity-60`} />
                  </div>
                )}
                
                {/* Content at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 flex items-center justify-center gap-2">
                  <div className={`rounded-lg bg-white/90 group-hover:bg-white p-1.5 shadow-sm`}>
                    <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${fg}`} />
                  </div>
                  <div className={`text-xs sm:text-sm font-semibold ${fg} drop-shadow-sm`}>{label}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

