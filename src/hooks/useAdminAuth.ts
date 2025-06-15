
import { useCallback } from "react";

const ADMIN_PASS = "gavi2025";
const ADMIN_KEY = "__gavi_admin__";

export function useAdminAuth() {
  const isAdmin = !!window.localStorage.getItem(ADMIN_KEY);

  const loginAdmin = useCallback((pass: string) => {
    if (pass === ADMIN_PASS) {
      window.localStorage.setItem(ADMIN_KEY, "true");
      window.dispatchEvent(new Event("storage")); // trigger reactivity in other tabs
      return true;
    }
    return false;
  }, []);

  const logoutAdmin = useCallback(() => {
    window.localStorage.removeItem(ADMIN_KEY);
    window.dispatchEvent(new Event("storage"));
    window.location.href = "/"; // redirect to home/logout
  }, []);

  return { isAdmin, loginAdmin, logoutAdmin };
}
