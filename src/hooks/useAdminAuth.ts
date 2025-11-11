
import { useCallback, useState, useEffect } from "react";

const ADMIN_PASS = "gavi2025";
const ADMIN_KEY = "__gavi_admin__";

export function useAdminAuth() {
  // Initialize with synchronous check to avoid race conditions
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return !!window.localStorage.getItem(ADMIN_KEY);
    }
    return false;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount and when storage changes
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const isAdmin = !!window.localStorage.getItem(ADMIN_KEY);
        setIsAuthenticated(isAdmin);
      }
      setIsLoading(false);
    };

    // Initial check
    checkAuth();

    // Listen for storage changes (including from other tabs)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const loginAdmin = useCallback((pass: string) => {
    if (pass === ADMIN_PASS) {
      window.localStorage.setItem(ADMIN_KEY, "true");
      setIsAuthenticated(true);
      window.dispatchEvent(new Event("storage")); // trigger reactivity in other tabs
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(ADMIN_KEY);
    setIsAuthenticated(false);
    window.dispatchEvent(new Event("storage"));
    window.location.href = "/"; // redirect to home/logout
  }, []);

  // Provide both naming conventions for compatibility
  return { 
    isAuthenticated, 
    isAdmin: isAuthenticated,
    isLoading,
    loginAdmin, 
    logout,
    logoutAdmin: logout 
  };
}
