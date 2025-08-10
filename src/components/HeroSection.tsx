
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, Shield } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Premium Smartphones
          </h1>
          <p className="text-lg sm:text-xl mb-6 text-pink-100">
            Discover the latest iPhones, Samsung, and more at unbeatable prices
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Warranty Included</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-sm">Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span className="text-sm">Fast Delivery</span>
            </div>
          </div>
          <Button 
            size="lg"
            className="bg-white text-pink-600 hover:bg-pink-50 font-semibold px-8"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  );
};
