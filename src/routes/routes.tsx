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
  OrderEntryPage,
  FloorWithTablesPage,
  CashierPage,
  PointOfSalePage,
  ChargePage,
  SessionPaymentsPage,
  MovementsHistoryPage,
} from "./lazyImports";
import AuthLayout from "@/layouts/AuthLayout";
import AuthGuard from "@/guards/AuthGuard";
import AdminLayout from "@/layouts/AdminLayout";
import ServerLayout from "@/layouts/ServerLayout";
import RoleGuard from "@/guards/RoleGuard";
import GuestGuard from "@/guards/GuestGuard";
import CashierLayout from "@/layouts/CashierLayout";
import NotFound from "@/presentation/components/NotFound";

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
      <AuthGuard>
        <RoleGuard allowedRoles={["cajero"]}>
          <CashierLayout />
        </RoleGuard>
      </AuthGuard>
    ),
    children: [
      {
        path: "/caja",
        element: <CashierPage />,
      },
      {
        path: "/punto-venta",
        element: <PointOfSalePage />,
      },
      {
        path: "/punto-venta/cobrar/:orderId",
        element: <ChargePage />,
      },
      {
        path: "/pagos/:sessionId",
        element: <SessionPaymentsPage />,
      },
      {
        path: "/historial-movimientos/:sessionId",
        element: <MovementsHistoryPage />,
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
