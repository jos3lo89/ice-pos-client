import http from "@/config/axios";
import type { IClientRes } from "../interfaces/client.interface";

class ClientService {
  private readonly baseUrl = "clients";

  async getClientById() {
    const { data } = await http.get<IClientRes>(`${this.baseUrl}/default`);
    return data;
  }
}

export const clientService = new ClientService();
