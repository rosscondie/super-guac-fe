import { useContext, type ReactNode } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from './AuthContext';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
