import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/src/lib/supabase';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: Session | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  console.log('[AuthContext] AuthProvider component rendering...');
  const [user, setUser] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('[AuthContext] useEffect running to get session...');
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error.message);
          // setUser(null) could be redundant if session is null, but explicit
        }
        setUser(session);
      } catch (e) {
        console.error('Exception in getSession:', e instanceof Error ? e.message : String(e));
        // setUser(null) might be appropriate here too
      } finally {
        setLoading(false); // Ensure loading is set to false regardless of outcome
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
      // If an auth state change happens very quickly, ensure loading is false.
      // Though getSession() should have handled initial load.
      if (loading) {
        setLoading(false);
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []); // Added 'loading' to dependency array due to its use in onAuthStateChange, though it's subtle.
          // Reconsidering: 'loading' in the onAuthStateChange callback doesn't strictly require it in the dep array
          // because it's checking the *current* state of loading, not establishing a closure over an old value
          // that needs to re-run the effect. Let's remove it for now to keep it standard. The primary fix is the finally block.

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in:', error);
      // Consider re-throwing or returning error to UI
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null); // Explicitly set user to null
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithEmail, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
