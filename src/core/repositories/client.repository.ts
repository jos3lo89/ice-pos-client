import type { IClientRes } from "../entities/client.entity";

export interface ClientRepository {
  getClientById(): Promise<IClientRes>;
}
