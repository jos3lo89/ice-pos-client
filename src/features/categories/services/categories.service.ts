import http from "@/config/axios";
import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { GetAllCategoriesRes } from "../interfaces/categories.interface";
import type { CreateCategorieT } from "../schemas/categorie.schema";

export const categorieService = {
  getAllCategories: async () => {
    const { data } =
      await http.get<ApiResponse<GetAllCategoriesRes[]>>("/categories");
    return data.data;
  },

  changeCategorieState: async (categorieId: string) => {
    console.log(categorieId);

    const { data } = await http.patch("");
    return data;
  },

  createCategorie: async (values: CreateCategorieT) => {
    const { data } = await http.post("/categories", values);
    return data.data;
  },
};
