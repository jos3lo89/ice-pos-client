import http from "@/config/axios";
import type {
  CreateTableI,
  TableCreateRes,
  TablesListRes,
} from "@/core/entities/table.entity";
import type { TableRepository } from "@/core/repositories/table.repository";

class TableApi implements TableRepository {
  private readonly baseUrl = "/tables";

  async getTables(page: number, limit: number, search?: string) {
    const { data } = await http.get<TablesListRes>(this.baseUrl, {
      params: { page, limit, search },
    });
    return data;
  }

  async createTable(table: CreateTableI) {
    const { data } = await http.post<TableCreateRes>(this.baseUrl, table);
    return data;
  }
}

export const tableApi = new TableApi();
