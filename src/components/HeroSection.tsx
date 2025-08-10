
import { ShoppingBag, Phone, MapPin } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10" />
          <h1 className="text-2xl sm:text-4xl font-bold">
            Gavi Gadgets
          </h1>
        </div>
        <p className="text-lg sm:text-xl mb-6 opacity-90">
          Your trusted source for premium smartphones in Uganda
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <span>+256 XXX XXX XXX</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>Kampala, Uganda</span>
          </div>
        </div>
      </div>
    </section>
  );
};
