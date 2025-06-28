import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export const CartIcon = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateCartCount();

    // Listen for storage changes
    window.addEventListener("storage", updateCartCount);

    // Custom event for cart updates within the same tab
    window.addEventListener("cartUpdated", updateCartCount);
    
    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => navigate("/cart")} 
      className="relative h-12 w-12 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 text-gray-700 hover:text-pink-600 transition-all duration-300 hover:scale-110 hover:shadow-lg border border-pink-200 hover:border-pink-300 group"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      
      {/* Cart icon with enhanced styling */}
      <div className="relative">
        <ShoppingCart className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
        
        {/* Cart count badge with premium styling */}
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold min-w-6 shadow-lg border-2 border-white animate-bounce">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </div>
    </Button>
  );
};