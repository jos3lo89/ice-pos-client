import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/product.service";

export const useProduct = () => {
  const getAllProducts = (
    page: number = 1,
    limit: number = 10,
    search?: string,
    category?: string,
  ) => {
    return useQuery({
      queryKey: ["list", "products", page, limit, search, category],
      queryFn: () =>
        productService.getAllProducts(page, limit, search, category),
    });
  };

  return {
    getAllProducts,
  };
};
