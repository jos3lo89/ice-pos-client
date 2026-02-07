import type { UserRole } from "@/common/types/roles";
import { Banknote, ChefHat, Coffee, Shield, Utensils } from "lucide-react";

export const getRoleIcon = (role: UserRole) => {
  switch (role) {
    case "admin":
      return <Shield className="w-4 h-4 text-purple-400" />;
    case "cajero":
      return <Banknote className="w-4 h-4 text-green-400" />;
    case "cocinero":
      return <ChefHat className="w-4 h-4 text-orange-400" />;
    case "bartender":
      return <Coffee className="w-4 h-4 text-blue-400" />;
    default:
      return <Utensils className="w-4 h-4 text-cyan-400" />;
  }
};
