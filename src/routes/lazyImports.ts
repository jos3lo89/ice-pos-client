import { lazy } from "react";

export const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
export const DashboardHome = lazy(
  () => import("@/features/dashboard/pages/DashboardHome"),
);

export const UsersPage = lazy(() => import("@/features/users/pages/UsersPage"));
