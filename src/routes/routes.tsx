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
  FloorsPage,
  CreateFloorPage,
  TablesPage,
  CreateTablePage,
  ProfilePage,
  OrderEntryPage,
  FloorWithTablesPage,
} from "./lazyImports";
import AuthLayout from "@/layouts/AuthLayout";
import AuthGuard from "@/guards/AuthGuard";
import NotFound from "@/components/common/NotFound";
import AdminLayout from "@/layouts/AdminLayout";
import ServerLayout from "@/layouts/ServerLayout";
import RoleGuard from "@/guards/RoleGuard";
import GuestGuard from "@/guards/GuestGuard";

export const routes = createBrowserRouter([
  {
    element: (
      <AuthGuard>
        <RoleGuard allowedRoles={["admin"]}>
          <AdminLayout />
        </RoleGuard>
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
      {
        path: "/lista-pisos",
        element: <FloorsPage />,
      },
      {
        path: "/crear-piso",
        element: <CreateFloorPage />,
      },
      {
        path: "/lista-mesas",
        element: <TablesPage />,
      },
      {
        path: "/crear-mesa",
        element: <CreateTablePage />,
      },
      {
        path: "/perfil",
        element: <ProfilePage />,
      },
    ],
  },
  {
    element: (
      <AuthGuard>
        <RoleGuard allowedRoles={["mesero"]}>
          <ServerLayout />
        </RoleGuard>
      </AuthGuard>
    ),
    children: [
      {
        path: "/mesas",
        element: <FloorWithTablesPage />,
      },
      {
        path: "/agregar-item/:orderId",
        element: <OrderEntryPage />,
      },
    ],
  },
  {
    element: (
      <GuestGuard>
        <AuthLayout />
      </GuestGuard>
    ),
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
