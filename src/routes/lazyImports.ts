import { lazy } from "react";

export const LoginPage = lazy(
  () => import("@/presentation/features/auth/page/LoginPage"),
);
export const DashboardHome = lazy(
  () => import("@/presentation/features/admin-dashboard/pages/DashboardHome"),
);

export const UsersPage = lazy(
  () => import("@/presentation/features/employes/page/UsersPage"),
);
export const CreateUserPage = lazy(
  () => import("@/presentation/features/employes/page/CreateUserPage"),
);
export const CategoriesPage = lazy(
  () => import("@/presentation/features/categories/pages/CategoriesPage"),
);
export const CreateCategoryPage = lazy(
  () => import("@/presentation/features/categories/pages/CreateCategoryPage"),
);

export const ProductsPage = lazy(
  () => import("@/features/products/pages/ProductsPage"),
);

export const CreateProductPage = lazy(
  () => import("@/features/products/pages/CreateProductPage"),
);

export const FloorsPage = lazy(
  () => import("@/features/floors/pages/FloorsPage"),
);

export const CreateFloorPage = lazy(
  () => import("@/features/floors/pages/CreateFloorPage"),
);

export const TablesPage = lazy(
  () => import("@/features/tables/pages/TablesPage"),
);

export const CreateTablePage = lazy(
  () => import("@/features/tables/pages/CreateTablePage"),
);

export const ProfilePage = lazy(
  () => import("@/presentation/features/employes/page/ProfilePage"),
);

export const OrderEntryPage = lazy(
  () => import("@/features/orders/pages/OrderEntryPage"),
);

export const FloorWithTablesPage = lazy(
  () => import("@/features/orders/pages/FloorWithTablesPage"),
);

export const CashierPage = lazy(
  () => import("@/features/cashier/pages/CashierPage"),
);

export const PointOfSalePage = lazy(
  () => import("@/features/cashier/pages/PointOfSalePage"),
);

export const ChargePage = lazy(
  () => import("@/features/cashier/pages/ChargePage"),
);

export const SessionPaymentsPage = lazy(
  () => import("@/features/cashier/pages/SessionPaymentsPage"),
);

export const MovementsHistoryPage = lazy(
  () =>
    import("@/presentation/features/cash-movement/pages/MovementsHistoryPage"),
);
