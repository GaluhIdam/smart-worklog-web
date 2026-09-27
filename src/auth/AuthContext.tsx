import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import type { UserResponse } from "../data/response/User/UserResponse";
import { authService } from "../services/Auth.service";

interface AuthContextValue {
  user: UserResponse | null;
  loading: boolean;
  authenticated: boolean;
  login: (user: UserResponse) => void;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

let initializationRequest: Promise<UserResponse> | null = null;

async function fetchCurrentUser(): Promise<UserResponse> {
  if (!initializationRequest) {
    initializationRequest = authService
      .user()
      .then((response) => response.data)
      .catch((error) => {
        initializationRequest = null;
        throw error;
      });
  }
  return initializationRequest;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    }
  };

  const login = (user: UserResponse) => {
    setUser(user);
    initializationRequest = Promise.resolve(user);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      initializationRequest = null;
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        await refreshUser();
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authenticated: user !== null,
        login,
        refreshUser,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
