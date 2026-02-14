import type { UserRole } from "@/common/types/roles";
import { useAuthStore } from "@/stores/auth.store";
import { roleBasedRedirection } from "@/utils/role-based-redirection";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
type props = PropsWithChildren<{ allowedRoles: UserRole[] }>;

const RoleGuard = ({ allowedRoles, children }: props) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    const redirectPath = roleBasedRedirection(user.role);
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
export default RoleGuard;
