import React, { useState } from "react";
import { MoreVertical, Sparkles, Shield } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { AdminLoginModal } from "./AdminLoginModal";
import { CartIcon } from "./CartIcon";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useNavigate } from "react-router-dom";

export const AppBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const {
    isAdmin,
    logoutAdmin
  } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-gradient-to-r from-pink-600 via-pink-500 to-rose-500 shadow-xl sticky top-0 z-20 backdrop-blur-sm">
      {/* Subtle top highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent opacity-50"></div>
      
      <nav className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:py-5 max-w-7xl mx-auto relative">
        {/* Background pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-700/20 via-transparent to-pink-700/20 rounded-lg"></div>
        
        <div 
          className="flex items-center gap-3 sm:gap-4 cursor-pointer flex-1 min-w-0 group relative z-10" 
          onClick={() => navigate("/")}
        >
          {/* Logo container with enhanced styling */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white to-pink-50 rounded-full blur-sm opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
            <img 
              src="/images/gavi_gadgets_logo.png" 
              alt="Gavi Gadgets Logo" 
              className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white shadow-lg border-3 border-white/80 object-contain flex-shrink-0 group-hover:scale-105 transition-transform duration-300" 
              draggable={false} 
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80 animate-pulse"></div>
          </div>
          
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white sm:text-xl md:text-2xl lg:text-3xl tracking-wide drop-shadow-lg block truncate bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
                Gavi Gadgets UG
              </span>
              <Sparkles className="w-4 h-4 text-yellow-300 opacity-80 animate-pulse hidden sm:block" />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-pink-100/90 hidden sm:block font-medium">
                Your Premium Mobile Source
              </span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse hidden sm:block"></div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 relative z-10">
          {/* Enhanced cart icon area */}
          <div className="relative">
            <CartIcon />
          </div>
          
          {/* Enhanced dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-2 sm:p-2.5 rounded-xl hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/50 focus:outline-none text-white transition-all duration-300 group backdrop-blur-sm border border-white/20 hover:border-white/40" 
                      aria-label="More options">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <MoreVertical className="relative w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-50 bg-white/95 backdrop-blur-md border-pink-200 shadow-xl min-w-[180px]">
              {!isAdmin && (
                <DropdownMenuItem 
                  onClick={() => setShowLogin(true)}
                  className="hover:bg-pink-50 focus:bg-pink-50 text-gray-700 font-medium py-3 px-4 cursor-pointer"
                >
                  <Shield className="w-4 h-4 mr-2 text-pink-600" />
                  Admin Login
                </DropdownMenuItem>
              )}
              {isAdmin && (
                <>
                  <DropdownMenuItem 
                    onClick={() => navigate("/admin")}
                    className="hover:bg-pink-50 focus:bg-pink-50 text-gray-700 font-medium py-3 px-4 cursor-pointer"
                  >
                    <Shield className="w-4 h-4 mr-2 text-pink-600" />
                    Admin Dashboard
                  </DropdownMenuItem>
                  <div className="border-t border-pink-100 my-1"></div>
                  <DropdownMenuItem 
                    onClick={logoutAdmin}
                    className="hover:bg-red-50 focus:bg-red-50 text-red-600 font-medium py-3 px-4 cursor-pointer"
                  >
                    <div className="w-4 h-4 mr-2 rounded-full bg-red-500"></div>
                    Logout
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <AdminLoginModal open={showLogin} onOpenChange={setShowLogin} />
      </nav>
      
      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-300/50 to-transparent"></div>
    </header>
  );
};