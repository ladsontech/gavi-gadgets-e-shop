import React from "react";
import { Link } from "react-router-dom";
import { Smartphone, Laptop, Tv, Speaker, Package } from "lucide-react";

export const ShopByCategory: React.FC = () => {
  const items = [
    { label: "Phones", icon: Smartphone, route: "/category/phones", bg: "bg-pink-50", fg: "text-pink-700", ring: "ring-pink-200" },
    { label: "PCs & Laptops", icon: Laptop, route: "/category/pcs-laptops", bg: "bg-indigo-50", fg: "text-indigo-700", ring: "ring-indigo-200" },
    { label: "Speakers", icon: Speaker, route: "/category/speakers", bg: "bg-emerald-50", fg: "text-emerald-700", ring: "ring-emerald-200" },
    { label: "TVs", icon: Tv, route: "/category/tvs", bg: "bg-amber-50", fg: "text-amber-700", ring: "ring-amber-200" },
    { label: "Accessories", icon: Package, route: "/category/accessories", bg: "bg-sky-50", fg: "text-sky-700", ring: "ring-sky-200" },
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
        {items.map(({ label, icon: Icon, route, bg, fg, ring }) => (
          <Link key={label} to={route} className="group focus:outline-none" aria-label={`Browse ${label}`}>
            <div
              className={`rounded-xl ${bg} ring-1 ${ring} hover:ring-2 transition-all shadow-sm hover:shadow-md p-4 flex items-center gap-3`}
            >
              <div className={`rounded-lg ${fg} bg-white/60 group-hover:bg-white p-2 transition-colors`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-sm font-semibold text-gray-800">{label}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

