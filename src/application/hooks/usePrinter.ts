import { printerApi } from "@/infrastructure/api/printer.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  NetworkConfigCreate,
  SavedPrinterCreate,
  SavedPrinterUpdate,
} from "@/core/entities/printer.entity";
import { AxiosError } from "axios";
import { toast } from "sonner";

const KEYS = {
  networkConfig: ["network-config"],
  discover: ["discover"],
  printers: ["printers"],
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    // Handling detail as string or object
    const detail = error.response?.data?.detail;
    if (typeof detail === "string") return detail;
    if (detail && typeof detail === "object") return JSON.stringify(detail);
    return error.response?.data?.message || "Error desconocido";
  }
  return error instanceof Error ? error.message : "Error desconocido";
};

// ─── Network Config ───────────────────────────────────────────────────────────

export const useNetworkConfig = () =>
  useQuery({
    queryKey: KEYS.networkConfig,
    queryFn: printerApi.getNetworkConfig.bind(printerApi),
    retry: false, // no reintentar 404 — es estado esperado
  });

export const useSaveNetworkConfig = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: NetworkConfigCreate) =>
      printerApi.saveNetworkConfig(data),
    onMutate: () => {
      toast.loading("Guardando configuración...", { id: "save-network" });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.networkConfig });
      qc.invalidateQueries({ queryKey: KEYS.discover });
      toast.success("Configuración de red guardada", { id: "save-network" });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error("Error al guardar", { description: message, id: "save-network" });
    },
  });
};

// ─── Discover ─────────────────────────────────────────────────────────────────

export const useDiscover = () =>
  useQuery({
    queryKey: KEYS.discover,
    queryFn: printerApi.discover.bind(printerApi),
    enabled: false, // solo se ejecuta al llamar refetch() manualmente
    retry: false,
  });

// ─── Printers CRUD ────────────────────────────────────────────────────────────

export const usePrinters = () =>
  useQuery({
    queryKey: KEYS.printers,
    queryFn: printerApi.listPrinters.bind(printerApi),
  });

export const useCreatePrinter = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: SavedPrinterCreate) => printerApi.createPrinter(data),
    onMutate: () => {
      toast.loading("Registrando impresora...", { id: "create-printer" });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.printers });
      toast.success("Impresora registrada", { id: "create-printer" });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error("Error al registrar", { description: message, id: "create-printer" });
    },
  });
};

export const useUpdatePrinter = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      nombre,
      data,
    }: {
      nombre: string;
      data: SavedPrinterUpdate;
    }) => printerApi.updatePrinter(nombre, data),
    onMutate: () => {
      toast.loading("Actualizando impresora...", { id: "update-printer" });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.printers });
      toast.success("Impresora actualizada", { id: "update-printer" });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error("Error al actualizar", { description: message, id: "update-printer" });
    },
  });
};

export const useDeletePrinter = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (nombre: string) => printerApi.deletePrinter(nombre),
    onMutate: () => {
      toast.loading("Eliminando impresora...", { id: "delete-printer" });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.printers });
      toast.success("Impresora eliminada", { id: "delete-printer" });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error("Error al eliminar", { description: message, id: "delete-printer" });
    },
  });
};

export const useTestPrinter = () =>
  useMutation({
    mutationFn: (nombre: string) => printerApi.testPrinter(nombre),
    onMutate: () => {
      toast.loading("Enviando impresión de prueba...", { id: "test-printer" });
    },
    onSuccess: () => {
      toast.success("Impresión enviada correctamente", { id: "test-printer" });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error("Error al imprimir", { description: message, id: "test-printer" });
    },
  });
