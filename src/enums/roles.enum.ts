export const Role = {
  ADMIN: "admin",
  CAJERO: "cajero",
  MESERO: "mesero",
  COCINERO: "cocinero",
  BARTENDER: "bartender",
} as const;

export type RoleType = (typeof Role)[keyof typeof Role];
