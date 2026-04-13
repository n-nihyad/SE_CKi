import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const homeByRole: Record<string, string> = {
  requestor: "/medicine",
  manager: "/dashboard",
  storekeeper: "/dashboard",
};

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const home = homeByRole[user.role] || "/login";
    return <Navigate to={home} replace />;
  }

  return <Outlet />;
}
