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
    let initialCheckComplete = false;

    const checkAuth = async () => {
      try {
        console.log("Starting auth check...");
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (cancelled) return;

        if (sessionError) {
          console.error("Session error:", sessionError);
          if (!cancelled) {
            setIsAuthenticated(false);
            setIsLoading(false);
            setSession(null);
            setUser(null);
          }
          return;
        }

        if (!session?.user) {
          console.log("No session found");
          if (!cancelled) {
            setIsAuthenticated(false);
            setIsLoading(false);
            setSession(null);
            setUser(null);
          }
          return;
        }

        console.log("Session found, checking admin status for:", session.user.email);
        
        if (!cancelled) {
          setSession(session);
          setUser(session.user);
        }

        // Check if user is admin
        const { data: adminData, error: adminError } = await supabase
          .from("admin_users")
          .select("email")
          .eq("email", session.user.email)
          .maybeSingle();

        if (cancelled) return;

        if (adminError) {
          console.error("Admin check error:", adminError);
          if (!cancelled) {
            setIsAuthenticated(false);
            setIsLoading(false);
          }
        } else {
          const isAdmin = !!adminData;
          console.log("Admin check result:", { email: session.user.email, isAdmin });
          if (!cancelled) {
            setIsAuthenticated(isAdmin);
            setIsLoading(false);
            initialCheckComplete = true;
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
        if (!cancelled) {
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    // Listen for auth changes (only handle sign out to prevent state resets)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change event:", event);
        
        // Only handle sign out events to prevent interfering with initial check
        if (event === 'SIGNED_OUT' || (!session?.user && initialCheckComplete)) {
          console.log("User signed out or session lost");
          if (!cancelled) {
            setIsAuthenticated(false);
            setIsLoading(false);
            setSession(null);
            setUser(null);
          }
          return;
        }

        // Ignore other events if initial check is complete to prevent state resets
        if (initialCheckComplete) {
          console.log("Initial check complete, ignoring auth state change");
          return;
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
