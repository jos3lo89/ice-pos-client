import type {
  CreateModifierRes,
  CreateModifierT,
  CreateProductRes,
  CreateProductT,
  CreateVariantI,
  CreateVariantRes,
  GetAllProductsRes,
  UpdateStatusProductRes,
} from "../entities/product.entity";

export interface ProductRepository {
  getAllProducts(
    page: number,
    limit: number,
    search?: string,
    category?: string,
  ): Promise<GetAllProductsRes>;

  createProduct(product: CreateProductT): Promise<CreateProductRes>;

  updateStatus(dto: {
    productId: string;
    values: {
      is_available: boolean;
    };
  }): Promise<UpdateStatusProductRes>;

  createVariant(variant: CreateVariantI): Promise<CreateVariantRes>;

  createModifier(modifier: CreateModifierT): Promise<CreateModifierRes>;
}
