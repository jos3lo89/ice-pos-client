import { lazy } from "react";

export const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
export const DashboardHome = lazy(
  () => import("@/features/dashboard/pages/DashboardHome"),
);

export const UsersPage = lazy(() => import("@/features/users/pages/UsersPage"));
export const CreateUserPage = lazy(
  () => import("@/features/users/pages/CreateUserPage"),
);
export const CategoriesPage = lazy(
  () => import("@/features/categories/pages/CategoriesPage"),
);
export const CreateCategoryPage = lazy(
  () => import("@/features/categories/pages/CreateCategoryPage"),
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
  () => import("@/features/users/pages/ProfilePage"),
);

export const OrderEntryPage = lazy(
  () => import("@/features/orders/pages/OrderEntryPage"),
);

export const FloorWithTablesPage = lazy(
  () => import("@/features/orders/pages/FloorWithTablesPage"),
);
