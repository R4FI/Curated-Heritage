import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authStorage } from "@/lib/secureStorage";
import { authService } from "@/services/authService";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from storage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = authStorage.getUser();
        const isAuth = authStorage.isAuthenticated();

        if (isAuth && storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });

    // Store tokens and user with AES encryption
    authStorage.setTokens(
      response.data.accessToken,
      response.data.refreshToken,
    );
    authStorage.setUser(response.data.user);

    setUser(response.data.user);
  };

  const logout = async () => {
    await authService.logout();
    authStorage.clearTokens();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      const userData = response.data;
      authStorage.setUser(userData);
      setUser(userData);
    } catch (error) {
      console.error("Error refreshing user:", error);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
