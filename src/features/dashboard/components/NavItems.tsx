import type { Role } from "@/common/types/roles";
import {
  ChefHat,
  ClipboardList,
  LayoutDashboard,
  ShoppingCart,
  Tags,
  UserRoundCogIcon,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  to: string;
  icon: LucideIcon;
  label: string;
  exact?: boolean;
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
        to: "/usuarios",
        icon: UserRoundCogIcon,
        label: "Usuarios",
      },
      {
        to: "/categorias",
        icon: Tags,
        label: "Categorías",
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
        to: "/dashboard/pos",
        icon: ShoppingCart,
        label: "POS",
      },
      {
        to: "/dashboard/kitchen",
        icon: ChefHat,
        label: "Kitchen",
      },
      {
        to: "/dashboard/orders",
        icon: ClipboardList,
        label: "Orders",
      },
      {
        to: "/dashboard/tables",
        icon: UtensilsCrossed,
        label: "Tables",
      },
    ],
  },
];
