import http from "@/config/axios";
import type {
  CreateProductRes,
  CreateVariantRes,
  GetAllProductsRes,
  UpdateStatusProductRes,
} from "../interfaces/product.interface";
import type { CreateProductT, CreateVariantT } from "../schemas/product.schema";

export const productService = {
  getAllProducts: async (
    page: number,
    limit: number,
    search?: string,
    category?: string,
  ) => {
    const { data } = await http.get<GetAllProductsRes>("/products", {
      params: {
        page,
        limit,
        search,
        category,
      },
    });
    return {
      products: data.data,
      meta: data.meta,
    };
  },

  createProduct: async (product: CreateProductT) => {
    const { data } = await http.post<CreateProductRes>("/products", {
      ...product,
      description: product.description || null,
    });
    return data;
  },

  updateStatus: async (dto: {
    productId: string;
    values: {
      is_available: boolean;
    };
  }) => {
    const { data } = await http.patch<UpdateStatusProductRes>(
      `/products/${dto.productId}/status`,
      dto.values,
    );
    return data;
  },

  createVariant: async (variant: CreateVariantT) => {
    const { data } = await http.post<CreateVariantRes>(
      "/products/variants",
      variant,
    );
    return data;
  },
};
