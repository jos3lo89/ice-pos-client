import http from "@/config/axios";
import type {
  CreateFloorRes,
  GetAllFloorsRes,
  GetFloorsRes,
} from "../interfaces/floors.interface";
import type { CreateFloorT } from "../schemas/floor.schema";

export const floorService = {
  // crear piso
  createFloor: async (dto: CreateFloorT) => {
    const { data } = await http.post<CreateFloorRes>("/floors", dto);
    return data;
  },

  // obtener pisos
  getFloors: async (page: number, limit: number, search?: string) => {
    const { data } = await http.get<GetFloorsRes>("/floors", {
      params: {
        page,
        limit,
        search,
      },
    });
    return data;
  },

  // obtener todos los pisos
  getAllFloors: async () => {
    const { data } = await http.get<GetAllFloorsRes>("/floors/all");
    return data;
  },
};
