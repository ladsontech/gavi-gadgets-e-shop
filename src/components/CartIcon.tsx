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
      className="relative h-10 w-10 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 text-gray-700 hover:text-pink-600 transition-all duration-300 hover:scale-110 group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      <ShoppingCart className="w-5 h-5 relative z-10" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold min-w-5 shadow-lg animate-pulse">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </Button>
  );
};