import type { UserRole } from "@/core/entities/employe.entity";
import {
  LayoutDashboard,
  ShoppingCart,
  Tags,
  UserRoundCogIcon,
  type LucideIcon,
  Plus,
  List,
  Package,
  Layers,
  LayoutGrid,
  Wallet,
  History,
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
  role: UserRole;
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
        label: "Empleados",
        icon: UserRoundCogIcon,
        children: [
          {
            to: "/lista-empleados",
            icon: List,
            label: "Lista de Empleados",
          },
          {
            to: "/crear-empleado",
            icon: Plus,
            label: "Crear Empleado",
          },
        ],
      },
      {
        label: "Categorías",
        icon: Tags,
        children: [
          {
            to: "/lista-categorias",
            icon: List,
            label: "Lista de Categorías",
          },
          {
            to: "/crear-categoria",
            icon: Plus,
            label: "Crear Categoría",
          },
        ],
      },
      {
        label: "Productos",
        icon: Package,
        children: [
          {
            to: "/lista-productos",
            icon: List,
            label: "Lista de Productos",
          },
          {
            to: "/crear-producto",
            icon: Plus,
            label: "Crear Producto",
          },
        ],
      },
      {
        label: "Pisos",
        icon: Layers,
        children: [
          {
            to: "/lista-pisos",
            icon: List,
            label: "Lista de Pisos",
          },
          {
            to: "/crear-piso",
            icon: Plus,
            label: "Crear Piso",
          },
        ],
      },
      {
        label: "Mesas",
        icon: LayoutGrid,
        children: [
          {
            to: "/lista-mesas",
            icon: List,
            label: "Lista de Mesas",
          },
          {
            to: "/crear-mesa",
            icon: Plus,
            label: "Crear Mesa",
          },
        ],
      },
    ],
  },
  {
    role: "cajero",
    children: [
      {
        to: "/caja",
        icon: Wallet,
        label: "Caja",
        exact: true,
      },
      {
        to: "/punto-venta",
        icon: ShoppingCart,
        label: "Punto de Venta",
      },
      {
        label: "Historial",
        icon: History,
        children: [
          {
            to: "/historial-caja",
            icon: Wallet,
            label: "Sesiones de caja",
          },
        ],
      },
    ],
  },
];
