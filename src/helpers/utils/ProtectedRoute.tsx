import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// @ts-expect-error
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isloading } = useSelector((state: any) => state.auth);
  const location = useLocation();
console.log(isAuthenticated,"protected auh")
  // Show loading spinner or loading text if authentication is still being checked
  if (isloading) {
    return (
      <div className="loading-spinner">
        {/* You can replace this with a custom spinner component */}
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect from root path if user is not authenticated
  if (location.pathname === "/") {
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/auth/login" />;
  }

  // For all protected routes, check if user is authenticated
  return isAuthenticated ? children : <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
