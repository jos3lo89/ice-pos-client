import http from "@/config/axios";
import type {
  CreateFloorRes,
  GetAllFloorsRes,
  GetAllFloorsWithTablesRes,
  GetFloorsRes,
} from "../interfaces/floors.interface";
import type { CreateFloorT } from "../schemas/floor.schema";

class FloorService {
  private readonly baseUrl = "/floors";

  async create(dto: CreateFloorT) {
    const { data } = await http.post<CreateFloorRes>(this.baseUrl, dto);
    return data;
  }

  async getAllPaginated(page: number, limit: number, search?: string) {
    const { data } = await http.get<GetFloorsRes>(this.baseUrl, {
      params: { page, limit, search },
    });
    return data;
  }

  async getAll() {
    const { data } = await http.get<GetAllFloorsRes[]>(`${this.baseUrl}/all`);
    return data;
  }

  // pisos con sus mesas
  async getAllWithTables() {
    const { data } = await http.get<GetAllFloorsWithTablesRes[]>(
      `${this.baseUrl}/tables`,
    );
    return data;
  }
}

export const floorService = new FloorService();
