import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import LazyLoadingPage from "@/presentation/components/LazyLoadingPage";
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
  CashSessionHistoryPage,
  CashSessionOrdersPage,
  CashSessionReportPage,
  TakeawayOrdersPage,
  RankingProductosPage,
  HistorialSesionesPage,
  ReportSalesPage,
  PrinterPage,
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
          <Suspense fallback={<LazyLoadingPage />}>
            <AdminLayout />
          </Suspense>
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
        path: "/reportes/ranking-productos",
        element: <RankingProductosPage />,
      },
      {
        path: "/reportes/ventas",
        element: <ReportSalesPage />,
      },

      {
        path: "/reportes/historial-sesiones",
        element: <HistorialSesionesPage />,
      },
      {
        path: "/reportes/historial-sesiones/:sessionId/ordenes",
        element: <CashSessionOrdersPage />,
      },
      {
        path: "/reportes/historial-sesiones/:sessionId/reporte",
        element: <CashSessionReportPage />,
      },
      {
        path: "/reportes/historial-sesiones/:sessionId/pagos",
        element: <SessionPaymentsPage />,
      },
      {
        path: "/orden/detalles/:orderId",
        element: <ChargePage />,
      },
      {
        path: "/configuraciones/impresora",
        element: <PrinterPage />,
      },
    ],
  },
  {
    element: (
      <AuthGuard>
        <RoleGuard allowedRoles={["mesero"]}>
          <Suspense fallback={<LazyLoadingPage />}>
            <ServerLayout />
          </Suspense>
        </RoleGuard>
      </AuthGuard>
    ),
    children: [
      {
        path: "/mesas",
        element: <FloorWithTablesPage />,
      },
      {
        path: "/mesas/ordenes-para-llevar",
        element: <TakeawayOrdersPage />,
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
          <Suspense fallback={<LazyLoadingPage />}>
            <CashierLayout />
          </Suspense>
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
        path: "/punto-venta/ordenes-para-llevar",
        element: <TakeawayOrdersPage />,
      },
      {
        path: "/punto-venta/cobrar/:orderId",
        element: <ChargePage />,
      },
      {
        path: "/punto-venta/agregar/:orderId",
        element: <OrderEntryPage />,
      },
      {
        path: "/pagos/:sessionId",
        element: <SessionPaymentsPage />,
      },
      {
        path: "/historial-movimientos/:sessionId",
        element: <MovementsHistoryPage />,
      },
      {
        path: "/historial-caja",
        element: <CashSessionHistoryPage />,
      },
      {
        path: "/historial-caja/:sessionId/ordenes",
        element: <CashSessionOrdersPage />,
      },
      {
        path: "/historial-caja/:sessionId/reporte",
        element: <CashSessionReportPage />,
      },
    ],
  },
  {
    element: (
      <GuestGuard>
        <Suspense fallback={<LazyLoadingPage />}>
          <AuthLayout />
        </Suspense>
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
    element: (
      <Suspense fallback={<LazyLoadingPage />}>
        <NotFound />
      </Suspense>
    ),
  },
]);
