
import { ShoppingBag, Phone, MapPin } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6">
          <Phone className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Gavi Gadgets E-shop
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-blue-100">
            Premium Smartphones in Uganda
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-lg">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-yellow-300" />
            <span>Quality Phones, Competitive Prices</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-yellow-300" />
            <span>New Pioneer Mall Shop PA 82A</span>
          </div>
        </div>
      </div>
    </div>
  );
};
