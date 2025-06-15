
import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { AdminLoginModal } from "./AdminLoginModal";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useNavigate } from "react-router-dom";

export const AppBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { isAdmin, logoutAdmin } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-gradient-to-r from-pink-500 to-purple-500 shadow sticky top-0 z-20">
      <nav className="flex items-center justify-between px-4 py-3 md:py-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <img src="/images/gavi_gadgets_logo.png" alt="Gavi Gadgets Logo" className="w-12 h-12 rounded-full bg-white shadow border-2 border-pink-200 object-contain" draggable={false} />
          <span className="font-bold text-white md:text-2xl tracking-wide drop-shadow text-3xl">
            Gavi Gadgets
          </span>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-2 rounded-full hover:bg-pink-100 focus-visible:ring-2 focus:outline-none text-white"
                aria-label="More options"
              >
                <MoreVertical />
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
                  <DropdownMenuItem onClick={logoutAdmin}>Logout</DropdownMenuItem>
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
