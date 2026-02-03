import { createBrowserRouter } from "react-router-dom";
import {
  CategoriesPage,
  DashboardHome,
  LoginPage,
  UsersPage,
} from "./lazyImports";
import DashboardLayout from "@/layouts/DashboardLayout";
import AuthLayout from "@/layouts/AuthLayout";
import AuthGuard from "@/guards/AuthGuard";
import NotFound from "@/components/common/NotFound";

export const routes = createBrowserRouter([
  {
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        element: <DashboardHome />,
      },
      {
        path: "/usuarios",
        element: <UsersPage />,
      },
      {
        path: "/lista-categorias",
        element: <CategoriesPage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
