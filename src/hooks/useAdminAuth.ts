import { useCallback, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session first
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        try {
          const { data: adminData } = await supabase
            .from("admin_users")
            .select("email")
            .eq("email", session.user.email)
            .maybeSingle();
          
          setIsAuthenticated(!!adminData);
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          try {
            const { data: adminData } = await supabase
              .from("admin_users")
              .select("email")
              .eq("email", session.user.email)
              .maybeSingle();
            
            setIsAuthenticated(!!adminData);
            setIsLoading(false);
          } catch (error) {
            console.error("Error checking admin status:", error);
            setIsAuthenticated(false);
            setIsLoading(false);
          }
        } else {
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
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
