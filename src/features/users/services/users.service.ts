import http from "@/config/axios";
import type {
  ChangeUserStateReq,
  CreateUserRes,
  GetAllUsersRes,
  UserChangeStateRes,
} from "../interfaces/users.interface";
import type { CreateUserT } from "../schemas/user.schema";

class UsersService {
  private readonly baseUrl = "/users";

  async getAllUsers(page: number, limit: number, search?: string) {
    const { data } = await http.get<GetAllUsersRes>(this.baseUrl, {
      params: { page, limit, search },
    });
    return {
      users: data.data,
      meta: data.meta,
    };
  }

  async createUser(values: CreateUserT) {
    const { data } = await http.post<CreateUserRes>(this.baseUrl, values);
    return data;
  }

  async changeUserState(values: ChangeUserStateReq) {
    const { data } = await http.patch<UserChangeStateRes>(
      `${this.baseUrl}/change-state/${values.userId}`,
      values.payload,
    );
    return data;
  }
}

export const usersService = new UsersService();
