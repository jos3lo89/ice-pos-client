import type { PropsWithChildren } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { Navigate } from "react-router-dom";
import { roleBasedRedirection } from "@/utils/role-based-redirection";

const GuestGuard = ({ children }: PropsWithChildren) => {
  const { user, isAuthenticated } = useAuthStore();

  if (isAuthenticated && user) {
    const redirectPath = roleBasedRedirection(user.role);
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
export default GuestGuard;
