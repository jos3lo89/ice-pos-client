import http from "@/config/axios";
import type {
  CategoryWithProductsRes,
  CreateCategorieRes,
  GetAllCategoriesRes,
  ListCategoryCompleteRes,
  UpdateStateCategoryRes,
} from "../interfaces/categories.interface";
import type { CreateCategorieT } from "../schemas/categorie.schema";

class CategorieService {
  private readonly baseUrl = "/categories";

  async getAll(page: number, limit: number, search?: string) {
    const { data } = await http.get<GetAllCategoriesRes>(this.baseUrl, {
      params: { page, limit, search },
    });
    return {
      categories: data.data,
      meta: data.meta,
    };
  }

  async changeState(values: {
    categorieId: string;
    payload: {
      is_active: boolean;
    };
  }) {
    const { data } = await http.patch<UpdateStateCategoryRes>(
      `${this.baseUrl}/${values.categorieId}/status`,
      values.payload,
    );
    return data;
  }

  async create(values: CreateCategorieT) {
    const { data } = await http.post<CreateCategorieRes>(this.baseUrl, values);
    return data;
  }

  async listAll() {
    const { data } =
      await http.get<ListCategoryCompleteRes[]>("/categories/all");
    return data;
  }

  // categorias con sus productos y variantes
  async getWithProducts() {
    const { data } = await http.get<CategoryWithProductsRes[]>(
      "/categories/products",
    );
    return data;
  }
}

export const categorieService = new CategorieService();
