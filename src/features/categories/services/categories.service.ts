import http from "@/config/axios";
import type {
  CreateCategorieRes,
  GetAllCategoriesRes,
  UpdateStateCategoryRes,
} from "../interfaces/categories.interface";
import type { CreateCategorieT } from "../schemas/categorie.schema";

export const categorieService = {
  getAllCategories: async (
    page: number = 1,
    limit: number = 5,
    search?: string,
  ) => {
    const { data } = await http.get<GetAllCategoriesRes>("/categories", {
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
    const { data } = await http.patch<UpdateStateCategoryRes>(
      `/categories/${values.categorieId}/status`,
      values.payload,
    );
    return data;
  },

  createCategorie: async (values: CreateCategorieT) => {
    const { data } = await http.post<CreateCategorieRes>("/categories", values);
    return data;
  },
};
