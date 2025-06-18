
import React from "react";
import { ShoppingBag, Phone, MapPin } from "lucide-react";
import { WarrantyPolicy } from "./WarrantyPolicy";

export const Footer = () => (
  <footer className="bg-gradient-to-r from-pink-500 to-purple-600 text-white pt-10 pb-5 px-4 mt-8">
    <div className="max-w-4xl mx-auto flex flex-col gap-4 md:flex-row justify-between items-center">
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <div className="flex items-center gap-2 mb-2">
          <ShoppingBag className="w-5 h-5 text-pink-100" />
          <span className="text-white font-semibold text-base">Quality Phones, Competitive Prices</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-pink-100" />
          <span className="text-white text-base">New Pioneer Mall Shop PA 82A</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-pink-100" />
          <span className="text-white text-base">+256 740799577</span>
        </div>
      </div>
      <div className="text-purple-100 text-sm mt-6 md:mt-0 max-w-xs">
        <strong className="block text-white mb-1">About Gavi Gadgets</strong>
        Premium Smartphones in Uganda. Your trusted shop for iPhone, Samsung, Google Pixel and other top brands at competitive prices. 
        Visit us at New Pioneer Mall or contact us for the latest offers!
      </div>
    </div>
    
    <div className="text-center mt-6 pt-4 border-t border-purple-400">
      <WarrantyPolicy />
    </div>
    
    <div className="text-xs text-purple-200 text-center mt-4">
      &copy; {new Date().getFullYear()} Gavi Gadgets. All rights reserved.
    </div>
  </footer>
);
