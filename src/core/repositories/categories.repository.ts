import type {
  CategoryWithProductsRes,
  CreateCategorieRes,
  CreateCategorieT,
  GetAllCategoriesRes,
  ListCategoryCompleteRes,
  UpdateStateCategoryRes,
} from "../entities/categories.entity";

export interface CategoriesRepository {
  getAll(
    page: number,
    limit: number,
    search?: string,
  ): Promise<GetAllCategoriesRes>;
  changeState(values: {
    categorieId: string;
    payload: {
      is_active: boolean;
    };
  }): Promise<UpdateStateCategoryRes>;
  create(values: CreateCategorieT): Promise<CreateCategorieRes>;
  listAll(): Promise<ListCategoryCompleteRes[]>;
  getWithProducts(): Promise<CategoryWithProductsRes[]>;
}
