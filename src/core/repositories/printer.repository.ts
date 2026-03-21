import type {
  DiscoverResponse,
  NetworkConfig,
  NetworkConfigCreate,
  SavedPrinter,
  SavedPrinterCreate,
  SavedPrinterUpdate,
  TestResult,
} from "../entities/printer.entity";

export interface PrinterRepository {
  // Network config
  getNetworkConfig(): Promise<NetworkConfig>;
  saveNetworkConfig(data: NetworkConfigCreate): Promise<NetworkConfig>;
  deleteNetworkConfig(): Promise<void>;

  // Discover
  discover(): Promise<DiscoverResponse>;

  // Printers CRUD
  listPrinters(): Promise<SavedPrinter[]>;
  createPrinter(data: SavedPrinterCreate): Promise<SavedPrinter>;
  updatePrinter(
    nombre: string,
    data: SavedPrinterUpdate,
  ): Promise<SavedPrinter>;
  deletePrinter(nombre: string): Promise<void>;

  // Test
  testPrinter(nombre: string): Promise<TestResult>;
}
