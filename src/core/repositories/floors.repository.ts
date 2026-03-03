import type {
  CreateFloorI,
  CreateFloorRes,
  GetAllFloorsRes,
  GetAllFloorsWithTablesRes,
  GetFloorsRes,
} from "../entities/floors.entity";

export interface FloorRepository {
  create(dto: CreateFloorI): Promise<CreateFloorRes>;
  getAllPaginated(
    page: number,
    limit: number,
    search?: string,
  ): Promise<GetFloorsRes>;
  getAll(): Promise<GetAllFloorsRes[]>;
  getAllWithTables(): Promise<GetAllFloorsWithTablesRes[]>;
}
