
import React from "react";
import { ShoppingBag, Phone, MapPin, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="text-white pt-10 pb-5 px-4 mt-8 bg-pink-700 mb-16 md:mb-0">
      <div className="max-w-4xl mx-auto flex flex-col gap-4 md:flex-row justify-between items-center">
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag className="w-5 h-5 text-pink-100" />
            <span className="text-white font-semibold text-base">Your Mobile Source</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-pink-100" />
            <span className="text-white text-base">New Pioneer Mall Shop PA 82A</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-5 h-5 text-pink-100" />
            <span className="text-white text-base">+256 740799577</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-pink-100" />
            <span className="text-white text-base">Mobile Money & Bank Transfer</span>
          </div>
        </div>
        <div className="text-pink-100 text-sm mt-6 md:mt-0 max-w-xs">
          <strong className="block text-white mb-1">About Gavi Gadgets</strong>
          Premium Smartphones in Uganda. Your trusted shop for iPhone, Samsung, Google Pixel and other top brands at competitive prices. 
          Visit us at New Pioneer Mall or contact us for the latest offers!
          <div className="mt-3 text-xs">
            <strong className="block text-white mb-1">Payment Methods:</strong>
            <div>📱 Mobile Money: Pay via MTN/Airtel</div>
            <div>🏦 Bank Transfer: Available</div>
            <div>💵 Cash on Delivery: Available</div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-6 pt-4 border-t border-pink-400">
        <div className="flex justify-center gap-4 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/warranty")}
            className="text-white border-white hover:bg-white hover:text-pink-700"
          >
            Warranty Policy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/sitemap")}
            className="text-white border-white hover:bg-white hover:text-pink-700"
          >
            Sitemap
          </Button>
        </div>
      </div>
      
      <div className="text-xs text-pink-200 text-center mt-4">
        &copy; {new Date().getFullYear()} Gavi Gadgets. All rights reserved.
      </div>
    </footer>
  );
};
