import { createBrowserRouter } from "react-router-dom";
import {
  CategoriesPage,
  DashboardHome,
  LoginPage,
  UsersPage,
  CreateUserPage,
  CreateCategoryPage,
  ProductsPage,
  CreateProductPage,
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
        path: "/lista-empleados",
        element: <UsersPage />,
      },
      {
        path: "/crear-empleado",
        element: <CreateUserPage />,
      },
      {
        path: "/lista-categorias",
        element: <CategoriesPage />,
      },
      {
        path: "/crear-categoria",
        element: <CreateCategoryPage />,
      },
      {
        path: "/lista-productos",
        element: <ProductsPage />,
      },
      {
        path: "/crear-producto",
        element: <CreateProductPage />,
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
