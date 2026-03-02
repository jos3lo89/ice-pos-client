import http from "@/config/axios";
import type { IClientRes } from "@/core/entities/client.entity";
import type { ClientRepository } from "@/core/repositories/client.repository";

class ClientApi implements ClientRepository {
  private readonly baseUrl = "clients";

  async getClientById() {
    const { data } = await http.get<IClientRes>(`${this.baseUrl}/default`);
    return data;
  }
}

export const clientApi = new ClientApi();
