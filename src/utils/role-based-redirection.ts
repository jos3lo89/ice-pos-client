import type { UserRole } from "@/common/types/roles";

export const roleBasedRedirection = (role: UserRole) => {
  switch (role) {
    case "admin":
      return "/";
    case "bartender":
      return "/bar";
    case "cajero":
      return "/caja";
    case "cocinero":
      return "/cocina";
    case "mesero":
      return "/mesas";
    default:
      return "/login";
  }
};
