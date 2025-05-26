import { Navigate, Outlet } from "react-router-dom";

export function RotaPrivada() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth/signIn" replace />;
  }

  return <Outlet />;
}
