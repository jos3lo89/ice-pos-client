import http from "@/config/axios";
import type { EmployeRepository } from "@/core/repositories/employe.repository";
import type {
  ChangeUserStateReq,
  CreateUserRes,
  CreateUserT,
  GetAllUsersRes,
  GetProfileRes,
  UserChangeStateRes,
} from "@/core/entities/employe.entity";

class EmployeApi implements EmployeRepository {
  private readonly baseUrl = "/users";

  async getAllUsers(
    page: number,
    limit: number,
    search?: string,
  ): Promise<GetAllUsersRes> {
    const { data } = await http.get(this.baseUrl, {
      params: { page, limit, search },
    });
    return data;
  }

  async createUser(values: CreateUserT): Promise<CreateUserRes> {
    const { data } = await http.post(this.baseUrl, values);
    return data;
  }

  async changeUserState(
    values: ChangeUserStateReq,
  ): Promise<UserChangeStateRes> {
    const { data } = await http.patch(
      `${this.baseUrl}/change-state/${values.userId}`,
      values.payload,
    );
    return data;
  }

  async getProfile(): Promise<GetProfileRes> {
    const { data } = await http.get(`${this.baseUrl}/profile`);
    return data;
  }
}

export const employeApi = new EmployeApi();
