export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  pin: string;
  full_name: string;
  role: "admin";
  is_active: boolean;
  phone: string;
  created_at: string;
  updated_at: string;
}
