import http from "@/config/axios";
import type {
  CreateProductRes,
  GetAllProductsRes,
} from "../interfaces/product.interface";
import type { CreateProductT } from "../schemas/product.schema";

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
};
