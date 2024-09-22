// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuthenticate, useLogout, useSignerStatus, useUser, useAccount } from '@alchemy/aa-alchemy/react'; 
import { accountType } from '@/lib/config';

interface User {
  address?: string;
  email?: string;
  orgId?: string;
  type?: string;
  userId?: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  user?: User;
  login(email: string): Promise<void>;
  logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>();
  const currentUser = useUser();
  const { address } = useAccount({ type: accountType });
  const { isInitializing, isConnected, status } = useSignerStatus();
  const { authenticate } = useAuthenticate();
  const { logout } = useLogout();
  // const signer = useSigner();



  useEffect(() => {
    // Determine authentication status based on signer status
    const checkAuthenticationStatus = () => {
      const isAuthenticated = !isInitializing && isConnected && status !== "AWAITING_EMAIL_AUTH";
      setIsAuthenticated(isAuthenticated);
      if (isAuthenticated) {
        setUser({
          ...currentUser,
          address, 
        });
      }
    };

    checkAuthenticationStatus();
  }, [isInitializing, isConnected, status, currentUser, address]); 

  const login = async (email: string) => {
    try {
      await authenticate({ type: "email", email });
    } catch (error) {
      console.error('Authentication failed', error);
    };
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};