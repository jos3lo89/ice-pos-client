import { useQuery } from "@tanstack/react-query";
import { clientService } from "../services/client.service";

const ONE_HOUR = 1000 * 60 * 60;

export const useGetDefaultClient = () => {
  return useQuery({
    queryKey: ["default-client"],
    queryFn: () => clientService.getClientById(),
    staleTime: ONE_HOUR * 8,
    gcTime: ONE_HOUR * 9,
  });
};
