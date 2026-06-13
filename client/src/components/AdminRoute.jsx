import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const AdminRoute = ({ children }) => {
  const { user } = useSelector(
    (state) => state.auth
  );

  if (
    !user ||
    user?.user?.role !== "admin"
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};