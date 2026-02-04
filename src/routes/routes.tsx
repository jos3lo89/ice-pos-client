import { createBrowserRouter } from "react-router-dom";
import {
  CategoriesPage,
  DashboardHome,
  LoginPage,
  UsersPage,
  CreateCategoryPage,
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
      {
        path: "/crear-categoria",
        element: <CreateCategoryPage />,
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
