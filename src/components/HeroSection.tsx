import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Clock, Shield } from 'lucide-react';
export const HeroSection = () => {
  return <div className="relative bg-gradient-to-r from-pink-600 to-purple-700 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-fuchsia-700">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Premium <span className="text-pink-200">Electronics</span> in Uganda
          </h1>
          
          <p className="text-xl sm:text-2xl mb-8 text-pink-100 max-w-3xl mx-auto">
            Discover the latest smartphones, accessories, and gadgets with authentic warranties and competitive prices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50 font-semibold px-8 py-3">
              Shop Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white hover:bg-white font-semibold px-8 py-3 text-pink-700">
              View Offers
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 mb-3 text-pink-200" />
              <h3 className="font-semibold mb-2">New Pioneer Mall</h3>
              <p className="text-pink-100 text-sm">Shop PA 82A, Kampala</p>
            </div>
            
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 mb-3 text-pink-200" />
              <h3 className="font-semibold mb-2">Fast Delivery</h3>
              <p className="text-pink-100 text-sm">Same day delivery in Kampala</p>
            </div>
            
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 mb-3 text-pink-200" />
              <h3 className="font-semibold mb-2">Authentic Warranty</h3>
              <p className="text-pink-100 text-sm">All products come with warranty</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};