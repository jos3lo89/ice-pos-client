import type {
  ChangeUserStateReq,
  CreateUserRes,
  CreateUserT,
  GetAllUsersRes,
  GetProfileRes,
  UserChangeStateRes,
} from "../entities/employe.entity";

export interface EmployeRepository {
  getAllUsers(
    page: number,
    limit: number,
    search?: string,
  ): Promise<GetAllUsersRes>;
  createUser(values: CreateUserT): Promise<CreateUserRes>;
  changeUserState(values: ChangeUserStateReq): Promise<UserChangeStateRes>;
  getProfile(): Promise<GetProfileRes>;
}
