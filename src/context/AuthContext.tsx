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
        console.log('[AuthContext] getSession - initial session:', session, 'Error:', error?.message);
        if (error) {
          console.error('[AuthContext] Error getting initial session:', error.message);
        }
        setUser(session);
      } catch (e) {
        console.error('[AuthContext] Exception in getSession:', e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('[AuthContext] onAuthStateChange - event:', _event, 'session:', session);
      setUser(session);
      if (loading && _event !== 'INITIAL_SESSION') { // INITIAL_SESSION is handled by getSession
        setLoading(false);
      }
    });

    return () => {
      console.log('[AuthContext] Unsubscribing from onAuthStateChange.');
      listener?.subscription.unsubscribe();
    };
  }, []); // Keep dependency array empty for mount/unmount behavior

  const signInWithEmail = async (email: string, password: string) => {
    console.log(`[AuthContext] Attempting signInWithEmail for ${email}`);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('[AuthContext] Error in signInWithPassword:', error.message);
        throw error; // Re-throw the error to be caught by LoginScreen
      }
      console.log('[AuthContext] signInWithPassword successful, session data:', data.session);
      // setUser(data.session); // onAuthStateChange should handle this update
    } catch (error) {
      console.error('[AuthContext] signInWithEmail caught exception:', error);
      throw error; // Re-throw to ensure LoginScreen catches it
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
