import type { Role } from "@/types/roles";
import {
  ChefHat,
  ClipboardList,
  LayoutDashboard,
  ShoppingCart,
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
        to: "/dashboard/pos",
        icon: ShoppingCart,
        label: "POS",
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
