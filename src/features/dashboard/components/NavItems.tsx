import type { Role } from "@/common/types/roles";
import {
  ChefHat,
  ClipboardList,
  LayoutDashboard,
  ShoppingCart,
  Tags,
  UserRoundCogIcon,
  UtensilsCrossed,
  Users2,
  Package,
  History,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  to?: string;
  icon: LucideIcon;
  label: string;
  exact?: boolean;
  children?: {
    to: string;
    icon: LucideIcon;
    label: string;
    exact?: boolean;
  }[];
}

interface NavGroup {
  role: Role;
  children: NavItem[];
}

export const allNavItems: NavGroup[] = [
  {
    role: "admin",
    children: [
      {
        to: "/",
        icon: LayoutDashboard,
        label: "Dashboard",
        exact: true,
      },
      {
        label: "Gestión",
        icon: Package,
        children: [
          {
            to: "/productos",
            icon: Package,
            label: "Productos",
          },
          {
            to: "/categorias",
            icon: Tags,
            label: "Categorías",
          },
        ],
      },
      {
        label: "Administración",
        icon: UserRoundCogIcon,
        children: [
          {
            to: "/usuarios",
            icon: Users2,
            label: "Usuarios",
          },
          {
            to: "/roles",
            icon: Settings,
            label: "Roles y Permisos",
          },
        ],
      },
      {
        to: "/reportes",
        icon: ClipboardList,
        label: "Reportes",
      },
    ],
  },
  {
    role: "cajero",
    children: [
      {
        to: "/",
        icon: LayoutDashboard,
        label: "Dashboard",
        exact: true,
      },
      {
        label: "Operaciones",
        icon: ShoppingCart,
        children: [
          {
            to: "/dashboard/pos",
            icon: ShoppingCart,
            label: "Punto de Venta",
          },
          {
            to: "/dashboard/kitchen",
            icon: ChefHat,
            label: "Cocina",
          },
        ],
      },
      {
        label: "Atención",
        icon: UtensilsCrossed,
        children: [
          {
            to: "/dashboard/tables",
            icon: UtensilsCrossed,
            label: "Mesas",
          },
          {
            to: "/dashboard/orders",
            icon: ClipboardList,
            label: "Pedidos",
          },
        ],
      },
      {
        to: "/history",
        icon: History,
        label: "Historial",
      },
    ],
  },
];
