
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
    <header className="w-full bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg sticky top-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10"></div>
      
      <nav className="relative flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div 
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="relative">
            <img 
              src="/images/gavi_gadgets_logo.png" 
              alt="Gavi Gadgets Logo" 
              className="w-12 h-12 rounded-xl object-contain transition-all duration-300 group-hover:scale-110 animate-logo-rotation" 
              draggable={false} 
            />
          </div>
          
          <div className="hidden sm:block">
            <h1 className="font-bold text-gray-900 text-xl tracking-tight group-hover:text-purple-700 transition-colors duration-200">
              Gavi Gadgets UG
            </h1>
            <p className="text-sm text-gray-600 font-medium group-hover:text-purple-600 transition-colors duration-200">
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
        <div className="flex items-center gap-3">
          {/* Cart Icon */}
          <div className="relative">
            <CartIcon />
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-200 hover:shadow-md"
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
                className="hidden md:flex p-2.5 rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-200 hover:shadow-md"
                aria-label="More options"
              >
                <MoreVertical className="w-5 h-5 text-gray-700" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-white/90 backdrop-blur-md border border-white/20 shadow-xl rounded-xl"
            >
              {!isAdmin && (
                <DropdownMenuItem 
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50/80 cursor-pointer rounded-lg mx-1 mt-1"
                >
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-700 font-medium">Admin Login</span>
                </DropdownMenuItem>
              )}
              {isAdmin && (
                <>
                  <DropdownMenuItem 
                    onClick={() => navigate("/admin")}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50/80 cursor-pointer rounded-lg mx-1 mt-1"
                  >
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-700 font-medium">Admin Dashboard</span>
                  </DropdownMenuItem>
                  <div className="border-t border-gray-200/50 my-2 mx-2"></div>
                  <DropdownMenuItem 
                    onClick={logoutAdmin}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-red-50/80 cursor-pointer rounded-lg mx-1 mb-1"
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
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-lg border-b border-white/20 shadow-xl rounded-b-xl">
            <div className="p-4 space-y-2">
              {!isAdmin && (
                <button 
                  onClick={() => {
                    setShowLogin(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50/80 text-left transition-all duration-200"
                >
                  <Shield className="w-5 h-5 text-purple-600" />
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
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50/80 text-left transition-all duration-200"
                  >
                    <Shield className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700 font-medium">Admin Dashboard</span>
                  </button>
                  <div className="border-t border-gray-200/50 my-2"></div>
                  <button 
                    onClick={() => {
                      logoutAdmin();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50/80 text-left transition-all duration-200"
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

      <style>{`
        @keyframes logoRotation {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(90deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-90deg); }
          100% { transform: rotate(0deg); }
        }
        
        .animate-logo-rotation {
          animation: logoRotation 6s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
};
