import type {
  DiscoverResponse,
  NetworkConfig,
  NetworkConfigCreate,
  SavedPrinter,
  SavedPrinterCreate,
  SavedPrinterUpdate,
  TestResult,
} from "@/core/entities/printer.entity";
import type { PrinterRepository } from "@/core/repositories/printer.repository";
import { printerBaseUrl } from "@/config/printer-service";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw { status: res.status, detail: err.detail ?? err };
  }
  return res.json();
}

class PrinterApi implements PrinterRepository {
  async getNetworkConfig(): Promise<NetworkConfig> {
    const res = await fetch(`${printerBaseUrl}/network-config`);
    return handleResponse<NetworkConfig>(res);
  }

  async saveNetworkConfig(data: NetworkConfigCreate): Promise<NetworkConfig> {
    const res = await fetch(`${printerBaseUrl}/network-config`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<NetworkConfig>(res);
  }

  async deleteNetworkConfig(): Promise<void> {
    const res = await fetch(`${printerBaseUrl}/network-config`, {
      method: "DELETE",
    });
    return handleResponse<void>(res);
  }

  async discover(): Promise<DiscoverResponse> {
    const res = await fetch(`${printerBaseUrl}/discover`);
    return handleResponse<DiscoverResponse>(res);
  }

  async listPrinters(): Promise<SavedPrinter[]> {
    const res = await fetch(`${printerBaseUrl}/printers`);
    return handleResponse<SavedPrinter[]>(res);
  }

  async createPrinter(data: SavedPrinterCreate): Promise<SavedPrinter> {
    const res = await fetch(`${printerBaseUrl}/printers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<SavedPrinter>(res);
  }

  async updatePrinter(
    nombre: string,
    data: SavedPrinterUpdate,
  ): Promise<SavedPrinter> {
    const res = await fetch(`${printerBaseUrl}/printers/${nombre}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<SavedPrinter>(res);
  }

  async deletePrinter(nombre: string): Promise<void> {
    const res = await fetch(`${printerBaseUrl}/printers/${nombre}`, {
      method: "DELETE",
    });
    return handleResponse<void>(res);
  }

  async testPrinter(nombre: string): Promise<TestResult> {
    const res = await fetch(`${printerBaseUrl}/printers/${nombre}/test`, {
      method: "POST",
    });
    return handleResponse<TestResult>(res);
  }
}

export const printerApi = new PrinterApi();
