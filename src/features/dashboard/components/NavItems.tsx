import type { UserRole } from "@/common/types/roles";
import {
  ChefHat,
  ClipboardList,
  LayoutDashboard,
  ShoppingCart,
  Tags,
  UserRoundCogIcon,
  UtensilsCrossed,
  History,
  type LucideIcon,
  Plus,
  List,
  Package,
  Layers,
  LayoutGrid,
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
      // {
      //   label: "Gestión",
      //   icon: Package,
      //   children: [
      //     {
      //       to: "/productos",
      //       icon: Package,
      //       label: "Productos",
      //     },
      //     {
      //       to: "/categorias",
      //       icon: Tags,
      //       label: "Categorías",
      //     },
      //   ],
      // },
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
      // {
      //   to: "/reportes",
      //   icon: ClipboardList,
      //   label: "Reportes",
      // },
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
