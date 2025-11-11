import { useCallback, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    // Set a timeout to prevent infinite loading
    timeoutId = setTimeout(() => {
      if (isMounted) {
        console.warn("Auth check timeout - setting loading to false");
        setIsLoading(false);
      }
    }, 5000); // 5 second timeout

    // Check for existing session first
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          if (isMounted) {
            setIsAuthenticated(false);
            setIsLoading(false);
          }
          return;
        }

        if (isMounted) {
          setSession(session);
          setUser(session?.user ?? null);
        }
        
        if (session?.user) {
          try {
            const { data: adminData, error: adminError } = await supabase
              .from("admin_users")
              .select("email")
              .eq("email", session.user.email)
              .maybeSingle();
            
            if (adminError) {
              console.error("Error checking admin status:", adminError);
            }
            
            if (isMounted) {
              setIsAuthenticated(!!adminData && !adminError);
              setIsLoading(false);
              clearTimeout(timeoutId);
            }
          } catch (error) {
            console.error("Error checking admin status:", error);
            if (isMounted) {
              setIsAuthenticated(false);
              setIsLoading(false);
              clearTimeout(timeoutId);
            }
          }
        } else {
          if (isMounted) {
            setIsAuthenticated(false);
            setIsLoading(false);
            clearTimeout(timeoutId);
          }
        }
      } catch (error) {
        console.error("Error in checkSession:", error);
        if (isMounted) {
          setIsAuthenticated(false);
          setIsLoading(false);
          clearTimeout(timeoutId);
        }
      }
    };

    checkSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          try {
            const { data: adminData, error: adminError } = await supabase
              .from("admin_users")
              .select("email")
              .eq("email", session.user.email)
              .maybeSingle();
            
            if (isMounted) {
              setIsAuthenticated(!!adminData && !adminError);
              setIsLoading(false);
              clearTimeout(timeoutId);
            }
          } catch (error) {
            console.error("Error checking admin status:", error);
            if (isMounted) {
              setIsAuthenticated(false);
              setIsLoading(false);
              clearTimeout(timeoutId);
            }
          }
        } else {
          if (isMounted) {
            setIsAuthenticated(false);
            setIsLoading(false);
            clearTimeout(timeoutId);
          }
        }
      }
    );

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAuthenticated(false);
    window.location.href = "/";
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
