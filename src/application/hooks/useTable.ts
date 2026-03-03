import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { tableApi } from "@/infrastructure/api/table.api";
import type { CreateTableI } from "@/core/entities/table.entity";

export const useTableList = (page: number, limit: number, search?: string) => {
  return useQuery({
    queryKey: ["tables", "list", { page, limit, search }],
    queryFn: () => tableApi.getTables(page, limit, search),
  });
};

export const useCreateTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["tables", "create"],
    mutationFn: (table: CreateTableI) => tableApi.createTable(table),
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
