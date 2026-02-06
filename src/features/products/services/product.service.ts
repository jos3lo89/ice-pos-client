import http from "@/config/axios";
import type { GetAllProductsRes } from "../interfaces/product.interface";

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
};
