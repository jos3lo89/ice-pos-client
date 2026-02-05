import http from "@/config/axios";
import type {
  CreateUserRes,
  GetAllUsersRes,
  UserChangeStateReq,
  UserChangeStateRes,
} from "../interfaces/users.interface";
import type { CreateUserT } from "../schemas/user.schema";

export const usersService = {
  getAllUsers: async (page: number = 1, limit: number = 5, search?: string) => {
    const { data } = await http.get<GetAllUsersRes>("/users", {
      params: {
        page,
        limit,
        search,
      },
    });
    return {
      users: data.data,
      meta: data.meta,
    };
  },

  createUser: async (values: CreateUserT) => {
    const { data } = await http.post<CreateUserRes>("/users", values);
    return data;
  },

  changeUserState: async (values: {
    payload: UserChangeStateReq;
    userId: string;
  }) => {
    const { data } = await http.patch<UserChangeStateRes>(
      `/users/change-state/${values.userId}`,
      values.payload,
    );
    return data;
  },
};
