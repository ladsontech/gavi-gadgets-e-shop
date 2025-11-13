import React from "react";
import { ShoppingBag, Phone, MapPin, CreditCard, Facebook, Instagram } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
export const Footer = () => {
  const navigate = useNavigate();

  const socialLinks = [
    { 
      icon: Facebook, 
      url: "https://www.facebook.com/p/GAVI-Gadgets-UG-100083303156382/", 
      label: "Facebook"
    },
    { 
      icon: ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ), 
      url: "https://x.com/gavigadgetsug", 
      label: "X (Twitter)"
    },
    { 
      icon: Instagram, 
      url: "https://www.instagram.com/gavi_gadgets_0740799577/?hl=en", 
      label: "Instagram"
    },
    { 
      icon: ({ className }: { className?: string }) => (
        <img 
          src="/images/tiktok-logo.png" 
          alt="TikTok" 
          className={`${className} rounded-full object-cover`}
        />
      ), 
      url: "https://www.tiktok.com/discover/gavi-gadgets?lang=en", 
      label: "TikTok"
    },
  ];
  return <footer className="text-white pt-10 pb-5 px-4 mt-8 bg-black mb-16 md:mb-0">
      <div className="max-w-4xl mx-auto flex flex-col gap-4 md:flex-row justify-between items-center">
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag className="w-5 h-5 text-pink-500" />
            <span className="text-white font-semibold text-base">Your Mobile Source</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-pink-500" />
            <span className="text-white text-base">New Pioneer Mall Shop PA 82A</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-5 h-5 text-pink-500" />
            <span className="text-white text-base">+256 740799577</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-pink-500" />
            <span className="text-white text-base">Mobile Money & Bank Transfer</span>
          </div>
        </div>
        <div className="text-gray-300 text-sm mt-6 md:mt-0 max-w-xs">
          <strong className="block text-white mb-1">About Gavi Gadgets</strong>
          Premium Smartphones in Uganda. Your trusted shop for iPhone, Samsung, Google Pixel and other top brands at competitive prices. 
          Visit us at New Pioneer Mall or contact us for the latest offers!
          <div className="mt-3 text-xs text-gray-400">
            <strong className="block text-white mb-1">Payment Methods:</strong>
            <div>📱 Mobile Money: Pay via MTN/Airtel</div>
            <div>🏦 Bank Transfer: Available</div>
            <div>💵 Cash on Delivery: Available</div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-6 pt-4 border-t border-gray-700">
        <div className="flex justify-center gap-4 mb-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/warranty")} className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white bg-transparent">
            Warranty Policy
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate("/repair")} className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white bg-transparent">
            Repair Services
          </Button>
        </div>
        <div className="flex justify-center gap-2">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => window.open(social.url, '_blank')}
                className="w-8 h-8 p-0 text-gray-300 hover:bg-pink-500 hover:text-white"
                title={social.label}
              >
                <Icon className="w-4 h-4" />
              </Button>
            );
          })}
        </div>
      </div>
      
      <div className="text-xs text-gray-400 text-center mt-4">
        &copy; {new Date().getFullYear()} Gavi Gadgets. All rights reserved.
      </div>
    </footer>;
};