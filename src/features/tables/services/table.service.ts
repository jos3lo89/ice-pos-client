import http from "@/config/axios";
import type { CreateTableT } from "../schemas/table.schema";
import type {
  TableCreateRes,
  TablesListRes,
} from "../interfaces/table.interface";

class TableService {
  private readonly baseUrl = "/tables";

  async getTables(page: number, limit: number, search?: string) {
    const { data } = await http.get<TablesListRes>(this.baseUrl, {
      params: { page, limit, search },
    });
    return data;
  }

  async createTable(table: CreateTableT) {
    const { data } = await http.post<TableCreateRes>(this.baseUrl, table);
    return data;
  }
}

export const tableService = new TableService();
