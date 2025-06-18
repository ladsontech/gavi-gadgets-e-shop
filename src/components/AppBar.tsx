
import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { AdminLoginModal } from "./AdminLoginModal";
import { CartIcon } from "./CartIcon";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useNavigate } from "react-router-dom";

export const AppBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { isAdmin, logoutAdmin } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-pink-500 shadow sticky top-0 z-20">
      <nav className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 md:py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer flex-1 min-w-0" onClick={() => navigate("/")}>
          <img 
            src="/images/gavi_gadgets_logo.png" 
            alt="Gavi Gadgets Logo" 
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow border-2 border-pink-200 object-contain flex-shrink-0" 
            draggable={false} 
          />
          <div className="min-w-0 flex-1">
            <span className="font-bold text-white sm:text-lg md:text-xl lg:text-2xl tracking-wide drop-shadow block truncate text-2xl">
              Gavi Gadgets UG
            </span>
            <span className="text-xs text-pink-100 hidden sm:block">
              Your Mobile Source
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <CartIcon />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 sm:p-2 rounded-full hover:bg-pink-600 focus-visible:ring-2 focus:outline-none text-white transition-colors" aria-label="More options">
                <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-50">
              {!isAdmin && (
                <DropdownMenuItem onClick={() => setShowLogin(true)}>
                  Admin Login
                </DropdownMenuItem>
              )}
              {isAdmin && (
                <>
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    Admin Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutAdmin}>
                    Logout
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <AdminLoginModal open={showLogin} onOpenChange={setShowLogin} />
      </nav>
    </header>
  );
};
