import { useCallback, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      try {
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (cancelled) return;

        if (sessionError || !session?.user) {
          setIsAuthenticated(false);
          setIsLoading(false);
          setSession(null);
          setUser(null);
          return;
        }

        setSession(session);
        setUser(session.user);

        // Check if user is admin
        const { data: adminData, error: adminError } = await supabase
          .from("admin_users")
          .select("email")
          .eq("email", session.user.email)
          .maybeSingle();

        if (cancelled) return;

        if (adminError) {
          console.error("Admin check error:", adminError);
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(!!adminData);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Auth check error:", error);
        if (!cancelled) {
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (cancelled) return;

        if (!session?.user) {
          setIsAuthenticated(false);
          setIsLoading(false);
          setSession(null);
          setUser(null);
          return;
        }

        setSession(session);
        setUser(session.user);

        // Check admin status
        try {
          const { data: adminData, error: adminError } = await supabase
            .from("admin_users")
            .select("email")
            .eq("email", session.user.email)
            .maybeSingle();

          if (cancelled) return;

          setIsAuthenticated(!!adminData && !adminError);
          setIsLoading(false);
        } catch (error) {
          console.error("Admin check error:", error);
          if (!cancelled) {
            setIsAuthenticated(false);
            setIsLoading(false);
          }
        }
      }
    );

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  }, []);

  return { 
    isAuthenticated, 
    isAdmin: isAuthenticated,
    isLoading,
    user,
    session,
    logout,
    logoutAdmin: logout 
  };
}
