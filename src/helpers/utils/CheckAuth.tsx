import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: React.ReactNode;
}) => {
  const location = useLocation();

  if (location.pathname === "/") {
    return isAuthenticated ? (
      <Navigate to="/dashboard" replace />
    ) : (
      <Navigate to="/auth/login" replace />
    );
  }

  if (!isAuthenticated && location.pathname !== "/auth/login") {
    return <Navigate to="/auth/login" replace />;
  }

  if (isAuthenticated && location.pathname === "/auth/login") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default CheckAuth;
