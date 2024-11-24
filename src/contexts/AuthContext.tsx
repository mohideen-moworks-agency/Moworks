import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import AuthSetupGuide from '../components/AuthSetupGuide';
import { isAllowedDomain } from '../config/app-config';

type User = {
  email: string | null;
  id: string;
};

type AuthContextType = {
  user: User | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  error: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          setUser({
            email: result.user.email,
            id: result.user.uid
          });
        }
      } catch (error: any) {
        console.error('Redirect sign-in failed:', error);
        setError(error.message || 'Authentication failed');
      }
    };

    if (isAllowedDomain()) {
      handleRedirectResult();
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          email: firebaseUser.email,
          id: firebaseUser.uid
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      setError('');
      
      if (!isAllowedDomain()) {
        setError('This domain is not authorized. Please check the setup guide.');
        return;
      }

      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      if (error.code === 'auth/popup-blocked') {
        try {
          await signInWithRedirect(auth, googleProvider);
        } catch (redirectError: any) {
          console.error('Redirect sign-in failed:', redirectError);
          setError(redirectError.message || 'Authentication failed');
        }
      } else {
        console.error('Authentication failed:', error);
        setError(error.message || 'Authentication failed');
      }
    }
  };

  const signOut = async () => {
    try {
      setError('');
      await firebaseSignOut(auth);
    } catch (error: any) {
      console.error('Sign out failed:', error);
      setError(error.message || 'Sign out failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading, error }}>
      <AuthSetupGuide error={error} />
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}