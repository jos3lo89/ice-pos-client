import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tableService } from "../services/table.service";
import type { CreateTableT } from "../schemas/table.schema";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useTableList = (page: number, limit: number, search?: string) => {
  return useQuery({
    queryKey: ["tables", "list", { page, limit, search }],
    queryFn: () => tableService.getTables(page, limit, search),
  });
};

export const useCreateTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["tables", "create"],
    mutationFn: (table: CreateTableT) => tableService.createTable(table),
    onMutate: () => {
      toast.loading("Creando mesa...", {
        id: "create-table",
      });
    },
    onSuccess: () => {
      toast.success("Mesa creada exitosamente", {
        id: "create-table",
      });
      queryClient.invalidateQueries({ queryKey: ["tables", "list"] });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message
          : "Error al crear mesa";
      toast.error(errorMessage, {
        id: "create-table",
      });
    },
  });
};
