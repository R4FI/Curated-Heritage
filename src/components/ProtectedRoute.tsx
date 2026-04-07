import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authStorage } from "@/lib/secureStorage";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authStorage.isAuthenticated();
      setIsAuthenticated(authenticated);
    };
    checkAuth();
  }, []);

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-on-surface-variant">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated, render children
  return <>{children}</>;
};

export default ProtectedRoute;
