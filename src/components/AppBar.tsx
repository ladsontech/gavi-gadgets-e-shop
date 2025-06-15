
import React from "react";

export const AppBar = () => (
  <header className="w-full bg-gradient-to-r from-pink-500 to-purple-500 shadow sticky top-0 z-20">
    <nav className="flex items-center justify-between px-4 py-3 md:py-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <img
          src="/images/gavi_gadgets_logo.png"
          alt="Gavi Gadgets Logo"
          className="w-12 h-12 rounded-full bg-white shadow border-2 border-pink-200 object-contain"
          draggable={false}
        />
        <span className="font-bold text-white text-lg md:text-2xl tracking-wide drop-shadow">
          Gavi Gadgets
        </span>
      </div>
      {/* Extra navigation/actions can go here */}
    </nav>
  </header>
);
