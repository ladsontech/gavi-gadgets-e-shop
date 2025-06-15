
import { ShoppingBag, Phone, MapPin } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6 flex flex-col items-center">
          <img
            src="/images/gavi_gadgets_logo.png"
            alt="Gavi Gadgets Logo"
            className="w-24 h-24 rounded-full bg-white mb-4 shadow-lg border-4 border-pink-200 object-contain"
            draggable={false}
          />
          <Phone className="w-16 h-16 mx-auto mb-4 text-pink-200" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg text-white">
            Gavi Gadgets E-shop
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-purple-100">
            Premium Smartphones in Uganda
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-lg">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-pink-200" />
            <span className="text-white">Quality Phones, Competitive Prices</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-pink-200" />
            <span className="text-white">New Pioneer Mall Shop PA 82A</span>
          </div>
        </div>
      </div>
      {/* Optional: add some pink/purple decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-pink-400 blur-3xl opacity-40 rounded-full -z-10"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-2/5 bg-purple-400 blur-3xl opacity-35 rounded-full -z-10"></div>
      </div>
    </div>
  );
};
