
import React, { useState } from "react";
import { MoreVertical, Shield, Menu, X } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { AdminLoginModal } from "./AdminLoginModal";
import { CartIcon } from "./CartIcon";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useNavigate } from "react-router-dom";

export const AppBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin, logoutAdmin } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 backdrop-blur-md bg-white/95">
      <nav className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="relative">
            <img 
              src="/images/gavi_gadgets_logo.png" 
              alt="Gavi Gadgets Logo" 
              className="w-10 h-10 rounded-lg shadow-sm border border-gray-100 object-contain transition-transform duration-200 group-hover:scale-105" 
              draggable={false} 
            />
          </div>
          
          <div className="hidden sm:block">
            <h1 className="font-bold text-gray-900 text-xl tracking-tight">
              Gavi Gadgets UG
            </h1>
            <p className="text-sm text-gray-600 font-medium">
              Your Mobile Source
            </p>
          </div>
        </div>

        {/* Mobile Logo Title (visible only on mobile) */}
        <div className="sm:hidden flex-1 text-center">
          <h1 className="font-bold text-gray-900 text-lg tracking-tight">
            Gavi Gadgets
          </h1>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-2">
          {/* Cart Icon */}
          <div className="relative">
            <CartIcon />
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
          
          {/* Desktop Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                aria-label="More options"
              >
                <MoreVertical className="w-5 h-5 text-gray-700" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-white border border-gray-200 shadow-lg"
            >
              {!isAdmin && (
                <DropdownMenuItem 
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
                >
                  <Shield className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700 font-medium">Admin Login</span>
                </DropdownMenuItem>
              )}
              {isAdmin && (
                <>
                  <DropdownMenuItem 
                    onClick={() => navigate("/admin")}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <Shield className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700 font-medium">Admin Dashboard</span>
                  </DropdownMenuItem>
                  <div className="border-t border-gray-100 my-1"></div>
                  <DropdownMenuItem 
                    onClick={logoutAdmin}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 cursor-pointer"
                  >
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span className="text-red-600 font-medium">Logout</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="p-4 space-y-1">
              {!isAdmin && (
                <button 
                  onClick={() => {
                    setShowLogin(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-left transition-colors"
                >
                  <Shield className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">Admin Login</span>
                </button>
              )}
              {isAdmin && (
                <>
                  <button 
                    onClick={() => {
                      navigate("/admin");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-left transition-colors"
                  >
                    <Shield className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700 font-medium">Admin Dashboard</span>
                  </button>
                  <div className="border-t border-gray-100 my-2"></div>
                  <button 
                    onClick={() => {
                      logoutAdmin();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-left transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-red-500"></div>
                    <span className="text-red-600 font-medium">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        
        <AdminLoginModal open={showLogin} onOpenChange={setShowLogin} />
      </nav>
    </header>
  );
};
