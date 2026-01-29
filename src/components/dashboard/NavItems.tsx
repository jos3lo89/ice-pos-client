import { Role } from "@/enums/roles.enum";
import {
  ChefHat,
  ClipboardList,
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed,
} from "lucide-react";

export const allNavItems = [
  {
    to: "/",
    icon: LayoutDashboard,
    label: "Dashboard",
    roles: [Role.ADMIN, Role.CAJERO],
    exact: true,
  },
  {
    to: "/dashboard/pos",
    icon: ShoppingCart,
    label: "POS",
    roles: [Role.ADMIN, Role.CAJERO],
  },
  {
    to: "/dashboard/kitchen",
    icon: ChefHat,
    label: "Kitchen",
    roles: [Role.ADMIN, Role.CAJERO],
  },
  {
    to: "/dashboard/orders",
    icon: ClipboardList,
    label: "Orders",
    roles: [Role.ADMIN, Role.CAJERO],
  },
  {
    to: "/dashboard/tables",
    icon: UtensilsCrossed,
    label: "Tables",
    roles: [Role.ADMIN, Role.CAJERO],
  },
];
