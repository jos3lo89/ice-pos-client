import { clientApi } from "@/infrastructure/api/client.api";
import { useQuery } from "@tanstack/react-query";

const ONE_HOUR = 1000 * 60 * 60;

export const useGetDefaultClient = () => {
  return useQuery({
    queryKey: ["default-client"],
    queryFn: () => clientApi.getClientById(),
    staleTime: ONE_HOUR * 8,
    gcTime: ONE_HOUR * 9,
  });
};
