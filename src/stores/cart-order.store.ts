import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CreateOrderData {
  tableId: string;
  currentOrderId: string;
  mesa: string;
  piso: number;
  mesero: string;
  numeroOrden: string;
  total: string;
}

interface CartOrderStoreActions {
  orderData: CreateOrderData | null;
  deleteOrderData: () => void;
  getOrderData: () => CreateOrderData;
  setOrderData: (orderData: CreateOrderData) => void;
}

const STORAGE_NAME = "cart-order";

export const useOrderStore = create<CartOrderStoreActions>()(
  persist(
    (set, get) => ({
      orderData: null,
      setOrderData: (orderData: CreateOrderData) => set({ orderData }),
      deleteOrderData: () => {
        set({ orderData: null });
        localStorage.removeItem(STORAGE_NAME);
      },
      getOrderData: () => {
        const orderData = get().orderData;
        if (!orderData) throw new Error("Datos de la orden no encontrados");
        return orderData;
      },
    }),
    {
      name: STORAGE_NAME,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
