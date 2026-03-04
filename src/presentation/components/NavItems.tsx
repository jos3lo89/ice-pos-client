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
  ArrowRightLeft,
  Trophy,
  CalendarDays,
  CalendarRange,
  CalendarCheck,
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

      {
        label: "Reportes",
        icon: ArrowRightLeft,
        children: [
          {
            to: "/reportes/ranking-productos",
            icon: Trophy,
            label: "Ranking de productos",
          },
          {
            to: "/reportes/ventas-dia",
            icon: CalendarDays,
            label: "Ventas por día",
          },
          {
            to: "/reportes/ventas-semana",
            icon: CalendarRange,
            label: "Ventas por semana",
          },
          {
            to: "/reportes/ventas-mes",
            icon: CalendarCheck,
            label: "Ventas por mes",
          },
          {
            to: "/reportes/historial-sesiones",
            icon: History,
            label: "Historial de sesiones",
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
        label: "Cobrar",
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
      // {
      //   label: "Reportes",
      //   icon: ArrowRightLeft,
      //   children: [
      //     {
      //       to: "#",
      //       icon: Database,
      //       label: "Reportes",
      //     },
      //   ],
      // },
    ],
  },
];
