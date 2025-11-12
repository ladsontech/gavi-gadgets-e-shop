import { useCallback, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let isCheckingAuth = false;
    const adminStatusCache: { [email: string]: boolean } = {};
    let latestSession: Session | null = null;

    const checkAuth = async (showLoading = true) => {
      if (isCheckingAuth || cancelled) return;
      
      try {
        console.log("Starting auth check...");
        isCheckingAuth = true;
        
        // Only show loading on initial load
        if (showLoading && isInitialLoad) {
          setIsLoading(true);
        }
        
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (cancelled) return;

        if (sessionError) {
          console.error("Session error:", sessionError);
          if (!cancelled) {
            latestSession = null;
            setIsAuthenticated(false);
            if (showLoading && isInitialLoad) setIsLoading(false);
            setSession(null);
            setUser(null);
          }
          return;
        }

        if (!session?.user) {
          console.log("No session found");
          if (!cancelled) {
            latestSession = null;
            setIsAuthenticated(false);
            if (showLoading && isInitialLoad) setIsLoading(false);
            setSession(null);
            setUser(null);
          }
          return;
        }

        console.log("Session found, checking admin status for:", session.user.email);
        
        if (!cancelled) {
          latestSession = session;
          setSession(session);
          setUser(session.user);
        }

        // Check cache first
        if (adminStatusCache[session.user.email] !== undefined) {
          console.log("Using cached admin status");
          if (!cancelled) {
            setIsAuthenticated(adminStatusCache[session.user.email]);
            if (showLoading && isInitialLoad) setIsLoading(false);
            if (isInitialLoad) setIsInitialLoad(false);
          }
          return;
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
            if (showLoading && isInitialLoad) setIsLoading(false);
            if (isInitialLoad) setIsInitialLoad(false);
          }
          return;
        }

        const isAdmin = !!adminData;
        console.log("Admin check result:", { email: session.user.email, isAdmin, adminData });
        
        // Cache the result
        adminStatusCache[session.user.email] = isAdmin;
        
        if (!cancelled) {
          setIsAuthenticated(isAdmin);
          if (showLoading && isInitialLoad) setIsLoading(false);
          if (isInitialLoad) setIsInitialLoad(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        if (!cancelled) {
          setIsAuthenticated(false);
          if (showLoading && isInitialLoad) setIsLoading(false);
          if (isInitialLoad) setIsInitialLoad(false);
        }
      } finally {
        isCheckingAuth = false;
      }
    };

    checkAuth(true);

    // Listen for auth changes - only handle critical events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state change event:", event, currentSession?.user?.email);
        
        if (cancelled) return;

        // Handle sign out
        if (event === 'SIGNED_OUT') {
          console.log("User signed out");
          latestSession = null;
          setIsAuthenticated(false);
          setIsLoading(false);
          setSession(null);
          setUser(null);
          return;
        }

        // Handle sign in - don't show loading spinner
        if (event === 'SIGNED_IN' && currentSession?.user) {
          console.log("User signed in, rechecking admin status");
          await checkAuth(false);
          return;
        }

        // Handle token refresh - maintain current auth state, no loading
        if (event === 'TOKEN_REFRESHED' && currentSession?.user) {
          console.log("Token refreshed, maintaining session");
          if (!cancelled) {
            latestSession = currentSession;
            setSession(currentSession);
            setUser(currentSession.user);
            // Silently verify admin status in background if cache is empty
            if (!adminStatusCache[currentSession.user.email]) {
              await checkAuth(false);
            }
          }
          return;
        }

        // Ignore other events to prevent unnecessary state changes
        console.log("Ignoring auth event:", event);
      }
    );

    // Handle page visibility changes - prevent session loss when switching tabs
    const handleVisibilityChange = () => {
      if (!document.hidden && latestSession) {
        console.log("Tab became visible, refreshing session silently");
        // Silently refresh session when tab becomes visible
        supabase.auth.getSession().then(({ data: { session: refreshedSession } }) => {
          if (refreshedSession && !cancelled) {
            latestSession = refreshedSession;
            setSession(refreshedSession);
            setUser(refreshedSession.user);
          }
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelled = true;
      subscription.unsubscribe();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
