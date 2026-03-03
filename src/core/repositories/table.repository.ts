import type {
  CreateTableI,
  TableCreateRes,
  TablesListRes,
} from "../entities/table.entity";

export interface TableRepository {
  getTables(
    page: number,
    limit: number,
    search?: string,
  ): Promise<TablesListRes>;
  createTable(table: CreateTableI): Promise<TableCreateRes>;
}
