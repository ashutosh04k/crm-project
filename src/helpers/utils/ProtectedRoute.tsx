import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// @ts-expect-error
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isloading } = useSelector((state: any) => state.auth);
  const location = useLocation();
  if (isloading) {
    return (
      <div className="loading-spinner">
        {/* You can replace this with a custom spinner component */}
        <p>Loading...</p>
      </div>
    );
  }

  if (location.pathname === "/") {
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/auth/login" />;
  }

  return isAuthenticated ? children : <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
