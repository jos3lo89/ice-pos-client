import type { UserRole } from "@/common/types/roles";

export interface LoginRes {
  id: string;
  username: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  phone: string;
  created_at: string;
  updated_at: string;
}
