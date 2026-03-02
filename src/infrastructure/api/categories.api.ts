import http from "@/config/axios";
import type {
  CategoryWithProductsRes,
  CreateCategorieRes,
  CreateCategorieT,
  GetAllCategoriesRes,
  ListCategoryCompleteRes,
  UpdateStateCategoryRes,
} from "@/core/entities/categories.entity";

import type { CategoriesRepository } from "@/core/repositories/categories.repository";

class CategorieService implements CategoriesRepository {
  private readonly baseUrl = "/categories";

  async getAll(
    page: number,
    limit: number,
    search?: string,
  ): Promise<GetAllCategoriesRes> {
    const { data } = await http.get(this.baseUrl, {
      params: { page, limit, search },
    });
    return data;
  }

  async changeState(values: {
    categorieId: string;
    payload: {
      is_active: boolean;
    };
  }): Promise<UpdateStateCategoryRes> {
    const { data } = await http.patch(
      `${this.baseUrl}/${values.categorieId}/status`,
      values.payload,
    );
    return data;
  }

  async create(values: CreateCategorieT): Promise<CreateCategorieRes> {
    const { data } = await http.post(this.baseUrl, values);
    return data;
  }

  async listAll(): Promise<ListCategoryCompleteRes[]> {
    const { data } = await http.get("/categories/all");
    return data;
  }

  // categorias con sus productos y variantes
  async getWithProducts(): Promise<CategoryWithProductsRes[]> {
    const { data } = await http.get("/categories/products");
    return data;
  }
}

export const categorieService = new CategorieService();
