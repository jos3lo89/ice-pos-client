import http from "@/config/axios";
import type { ApiResponse } from "@/interfaces/api-response.interface";
import type {
  CreateUserResponse,
  UserChangeStateReq,
  UserChangeStateRes,
  UsersMetaPagination,
  UsersResponse,
} from "../interfaces/users.interface";
import type { CreateUserFormValues } from "../schemas/user.schema";

export const usersService = {
  getAllUsers: async (page: number = 1, limit: number = 5, search?: string) => {
    const { data } = await http.get<ApiResponse<UsersResponse[], UsersMetaPagination>>("/users", {
      params: {
        page,
        limit,
        search,
      },
    });
    return {
      data: data.data,
      meta: data.meta,
    };
  },

  createUser: async (values: CreateUserFormValues) => {
    const { data } = await http.post<ApiResponse<CreateUserResponse>>(
      "/users",
      values,
    );
    return data.data;
  },

  changeUserState: async (values: {
    payload: UserChangeStateReq;
    userId: string;
  }) => {
    const { data } = await http.patch<ApiResponse<UserChangeStateRes>>(
      `/users/change-state/${values.userId}`,
      values.payload,
    );
    return data.data;
  },
};
