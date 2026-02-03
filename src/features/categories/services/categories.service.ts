import http from "@/config/axios";
import type { ApiResponse } from "@/interfaces/api-response.interface";
import type {
  CreateCategorieRes,
  GetAllCategoriesMeta,
  GetAllCategoriesRes,
  UpdateStateCategorieRes,
} from "../interfaces/categories.interface";
import type { CreateCategorieT } from "../schemas/categorie.schema";

export const categorieService = {
  getAllCategories: async (
    page: number = 1,
    limit: number = 5,
    search?: string,
  ) => {
    const { data } = await http.get<
      ApiResponse<GetAllCategoriesRes[], GetAllCategoriesMeta>
    >("/categories", {
      params: {
        page,
        limit,
        search,
      },
    });
    return {
      categories: data.data,
      meta: data.meta,
    };
  },

  changeCategorieState: async (values: {
    categorieId: string;
    payload: {
      is_active: boolean;
    };
  }) => {
    const { data } = await http.patch<ApiResponse<UpdateStateCategorieRes>>(
      `/categories/${values.categorieId}/status`,
      values.payload,
    );
    return data.data;
  },

  createCategorie: async (values: CreateCategorieT) => {
    const { data } = await http.post<ApiResponse<CreateCategorieRes>>(
      "/categories",
      values,
    );
    return data.data;
  },
};
