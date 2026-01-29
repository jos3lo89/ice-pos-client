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
    roles: ["admin", "manager"],
    exact: true,
  },
  {
    to: "/dashboard/pos",
    icon: ShoppingCart,
    label: "POS",
    roles: ["admin", "manager", "server", "counter"],
  },
  {
    to: "/dashboard/kitchen",
    icon: ChefHat,
    label: "Kitchen",
    roles: ["admin", "manager", "kitchen"],
  },
  {
    to: "/dashboard/orders",
    icon: ClipboardList,
    label: "Orders",
    roles: ["admin", "manager", "server", "counter"],
  },
  {
    to: "/dashboard/tables",
    icon: UtensilsCrossed,
    label: "Tables",
    roles: ["admin", "manager", "server"],
  },
];
