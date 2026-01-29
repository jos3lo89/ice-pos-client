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
  roles: Role[];
  exact?: boolean;
}

export const allNavItems: NavItem[] = [
  {
    to: "/",
    icon: LayoutDashboard,
    label: "Dashboard",
    roles: ["admin", "cajero"],
    exact: true,
  },
  {
    to: "/dashboard/pos",
    icon: ShoppingCart,
    label: "POS",
    roles: ["cajero"],
  },
  {
    to: "/dashboard/kitchen",
    icon: ChefHat,
    label: "Kitchen",
    roles: ["cocinero", "bartender"],
  },
  {
    to: "/dashboard/orders",
    icon: ClipboardList,
    label: "Orders",
    roles: ["cajero"],
  },
  {
    to: "/dashboard/tables",
    icon: UtensilsCrossed,
    label: "Tables",
    roles: ["cajero"],
  },
];
