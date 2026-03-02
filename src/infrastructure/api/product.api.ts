import http from "@/config/axios";
import type {
  CreateModifierRes,
  CreateModifierT,
  CreateProductRes,
  CreateProductT,
  CreateVariantI,
  CreateVariantRes,
  GetAllProductsRes,
  UpdateStatusProductRes,
} from "@/core/entities/product.entity";
import type { ProductRepository } from "@/core/repositories/product.repository";

class ProductApi implements ProductRepository {
  async getAllProducts(
    page: number,
    limit: number,
    search?: string,
    category?: string,
  ): Promise<GetAllProductsRes> {
    const { data } = await http.get("/products", {
      params: {
        page,
        limit,
        search,
        category,
      },
    });
    return data;
  }

  async createProduct(product: CreateProductT): Promise<CreateProductRes> {
    const { data } = await http.post("/products", product);
    return data;
  }

  async updateStatus(dto: {
    productId: string;
    values: {
      is_available: boolean;
    };
  }): Promise<UpdateStatusProductRes> {
    const { data } = await http.patch(
      `/products/${dto.productId}/status`,
      dto.values,
    );
    return data;
  }

  async createVariant(variant: CreateVariantI): Promise<CreateVariantRes> {
    const { data } = await http.post("/products/variants", variant);
    return data;
  }

  async createModifier(modifier: CreateModifierT): Promise<CreateModifierRes> {
    const { data } = await http.post("/products/modifier", modifier);
    return data;
  }
}

export const productApi = new ProductApi();
