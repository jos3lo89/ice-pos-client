import { Button } from "@/presentation/components/ui/button";
import { ScrollArea } from "@/presentation/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/presentation/components/ui/sheet";
import { Badge } from "@/presentation/components/ui/badge";
import {
  ShoppingCart,
  Trash2,
  UtensilsCrossed,
  Clock,
  ChefHat,
  CheckCircle2,
  Ban,
} from "lucide-react";

import { formatPricePEN } from "@/utils/format-price";

import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import type {
  ItemsOrden,
  OrderItemStatus,
} from "@/core/entities/current-order.entity";
import {
  useDeleteOrderItem,
  useSendComand,
  useCancelOrderItem,
} from "@/application/hooks/useOrder";
import { useAuthStore } from "@/application/stores/auth.store";

type Props = {
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  items: ItemsOrden[];
  total: string;
};

const statusConfig: Record<
  OrderItemStatus,
  { label: string; color: string; bg: string; border: string; icon: any }
> = {
  pendiente: {
    label: "Pendiente",
    color: "text-slate-400",
    bg: "bg-slate-500/10",
    border: "border-slate-500/20",
    icon: Clock,
  },
  preparando: {
    label: "En Cocina",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: ChefHat,
  },
  listo: {
    label: "Listo",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: CheckCircle2,
  },
  cancelado: {
    label: "Cancelado",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    icon: Ban,
  },
};

const CartProductsSheet = ({
  isCartOpen,
  setIsCartOpen,
  items,
  total,
}: Props) => {
  const { orderId } = useParams();
  const deleteOrderItem = useDeleteOrderItem();
  const sendComand = useSendComand();
  const cancelOrderItem = useCancelOrderItem();
  const { user } = useAuthStore();

  const isSendable = items.some((item) => item.estado === "pendiente");

  const handleDeleteOrderItem = (itemId: string) => {
    deleteOrderItem.mutate(itemId);
  };

  const handleSendComand = () => {
    if (!orderId || !isSendable) return;
    const itemsId = items
      .filter((item) => item.estado === "pendiente")
      .map((item) => item.id);

    sendComand.mutate({ orderId, itemsId });
  };

  const handleCancelOrderItem = (itemId: string) => {
    if (!orderId) return;
    cancelOrderItem.mutate({ orderId, itemId });
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-[#0f172a] border-slate-800 p-0 overflow-hidden flex flex-col outline-none"
      >
        <SheetHeader className="px-6 py-4 bg-slate-900/50 border-b border-slate-800 shrink-0">
          <SheetTitle className="text-2xl font-black text-white flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-xl">
              <ShoppingCart className="text-cyan-400 w-6 h-6" />
            </div>
            <span>Carrito de Pedido</span>
          </SheetTitle>
          <SheetDescription className="text-slate-500">
            Revisa los productos antes de enviar a cocina.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 min-h-0 relative bg-[#0f172a]/20">
          <div className="absolute inset-0">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center">
                <div className="w-24 h-24 rounded-full bg-slate-800/30 flex items-center justify-center mb-6 animate-pulse">
                  <UtensilsCrossed className="w-12 h-12 text-slate-700" />
                </div>
                <h3 className="text-xl font-black text-slate-300">
                  ¡El carrito está vacío!
                </h3>
                <p className="text-slate-500 mt-2 max-w-[240px] leading-relaxed">
                  Agregue deliciosos productos de nuestra carta para comenzar.
                </p>
              </div>
            ) : (
              <ScrollArea className="h-full w-full">
                <div className="p-6 space-y-6">
                  {items.map((item) => {
                    const selectedVariant = item.nombre_variante
                      ? {
                          variant_name: item.nombre_variante,
                          variant_price: item.precio_variante,
                        }
                      : null;

                    const StatusIcon = statusConfig[item.estado].icon;

                    return (
                      <div
                        key={item.id}
                        className={cn(
                          "group relative animate-in slide-in-from-right-4 duration-300 p-4 rounded-2xl border transition-all",
                          item.estado === "cancelado" &&
                            "opacity-50 grayscale border-red-900/30 bg-red-950/20",
                          item.estado === "preparando" &&
                            "border-amber-500/30 bg-amber-500/5",
                          item.estado === "listo" &&
                            "border-emerald-500/30 bg-emerald-500/5",
                          item.estado === "pendiente" &&
                            "border-slate-800/50 bg-slate-900/40 hover:border-slate-700/80",
                        )}
                      >
                        {/* Status Badge */}
                        <div className="absolute -top-2.5 right-4 z-10">
                          <Badge
                            className={cn(
                              "font-black text-[9px] uppercase tracking-wider border px-2 py-0.5 flex items-center gap-1.5 shadow-lg",
                              statusConfig[item.estado].bg,
                              statusConfig[item.estado].color,
                              statusConfig[item.estado].border,
                            )}
                          >
                            {StatusIcon && (
                              <StatusIcon
                                className={cn(
                                  "w-3 h-3",
                                  item.estado === "preparando" &&
                                    "animate-pulse",
                                )}
                              />
                            )}
                            <span>{statusConfig[item.estado].label}</span>
                          </Badge>
                        </div>

                        <div className="flex justify-between items-start mb-4">
                          <div className="space-y-2 pr-4">
                            <h4
                              className={cn(
                                "font-black group-hover:text-cyan-400 transition-colors uppercase tracking-tight text-lg leading-tight",
                                item.estado === "cancelado"
                                  ? "text-slate-500 line-through"
                                  : "text-white",
                              )}
                            >
                              {item.nombre_producto}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedVariant && (
                                <Badge
                                  className={cn(
                                    "border text-[10px] uppercase font-black px-2.5 py-0.5 flex items-center gap-2 transition-colors",
                                    item.estado === "cancelado"
                                      ? "bg-slate-800/30 text-slate-600 border-slate-800"
                                      : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 group-hover:bg-cyan-500/20",
                                  )}
                                >
                                  <span>{selectedVariant.variant_name}</span>
                                  <div
                                    className={cn(
                                      "w-1 h-1 rounded-full",
                                      item.estado === "cancelado"
                                        ? "bg-slate-700"
                                        : "bg-cyan-400/30",
                                    )}
                                  />
                                  <span
                                    className={
                                      item.estado === "cancelado"
                                        ? "text-slate-600"
                                        : "text-cyan-300/80"
                                    }
                                  >
                                    {(Number(selectedVariant.variant_price) > 0
                                      ? "+ "
                                      : "") +
                                      formatPricePEN(
                                        selectedVariant.variant_price,
                                      )}
                                  </span>
                                </Badge>
                              )}

                              {item.modificadores_item_orden?.map((mod) => (
                                <Badge
                                  key={mod.modificador_id}
                                  className={cn(
                                    "border text-[10px] uppercase font-black px-2.5 py-0.5 flex items-center gap-2 transition-colors",
                                    item.estado === "cancelado"
                                      ? "bg-slate-800/30 text-slate-600 border-slate-800"
                                      : "bg-slate-800/50 text-slate-400 border-slate-700/50 group-hover:border-slate-600",
                                  )}
                                >
                                  <span>{mod.nombre_modificador}</span>
                                  <div
                                    className={cn(
                                      "w-1 h-1 rounded-full",
                                      item.estado === "cancelado"
                                        ? "bg-slate-700"
                                        : "bg-slate-600/30",
                                    )}
                                  />
                                  <span
                                    className={
                                      item.estado === "cancelado"
                                        ? "text-slate-600"
                                        : "text-slate-500 font-bold"
                                    }
                                  >
                                    {(Number(mod.precio_adicional) > 0
                                      ? "+ "
                                      : "") +
                                      formatPricePEN(mod.precio_adicional)}
                                  </span>
                                </Badge>
                              ))}
                            </div>
                            {item.notas && (
                              <div
                                className={cn(
                                  "flex items-center gap-2 mt-2 p-2 rounded-lg border",
                                  item.estado === "cancelado"
                                    ? "bg-slate-800/20 border-slate-800/50"
                                    : "bg-orange-500/5 border-orange-500/10",
                                )}
                              >
                                <p
                                  className={cn(
                                    "text-[11px] font-bold italic line-clamp-2",
                                    item.estado === "cancelado"
                                      ? "text-slate-600"
                                      : "text-orange-400",
                                  )}
                                >
                                  "{item.notas}"
                                </p>
                              </div>
                            )}
                          </div>

                          {item.estado === "pendiente" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className={cn(
                                "h-10 w-10 rounded-xl shrink-0 transition-all duration-300",
                                "text-slate-500 hover:text-red-400 hover:bg-red-400/10",
                              )}
                              disabled={deleteOrderItem.isPending}
                              onClick={() => {
                                handleDeleteOrderItem(item.id);
                              }}
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          )}

                          {item.estado !== "pendiente" && item.estado !== "cancelado" && user?.rol === "cajero" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className={cn(
                                "h-10 w-10 rounded-xl shrink-0 transition-all duration-300",
                                "text-slate-500 hover:text-red-400 hover:bg-red-400/10",
                              )}
                              disabled={cancelOrderItem.isPending}
                              onClick={() => {
                                handleCancelOrderItem(item.id);
                              }}
                              title="Cancelar Producto"
                            >
                              <Ban className="w-5 h-5" />
                            </Button>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div
                            className={cn(
                              "flex items-center gap-3 pl-3 pr-4 py-1.5 rounded-xl border transition-colors",
                              item.estado === "cancelado"
                                ? "bg-slate-800/30 border-slate-800/50"
                                : "bg-slate-800/60 border-slate-700/50",
                            )}
                          >
                            <span
                              className={cn(
                                "text-sm font-black",
                                item.estado === "cancelado"
                                  ? "text-slate-600"
                                  : "text-cyan-400",
                              )}
                            >
                              {item.cantidad}x
                            </span>
                            <div
                              className={cn(
                                "w-px h-3",
                                item.estado === "cancelado"
                                  ? "bg-slate-800"
                                  : "bg-slate-700",
                              )}
                            />
                            <span
                              className={cn(
                                "text-[11px] font-bold",
                                item.estado === "cancelado"
                                  ? "text-slate-700"
                                  : "text-slate-400",
                              )}
                            >
                              {formatPricePEN(item.precio_unitario)}
                            </span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span
                              className={cn(
                                "text-[10px] font-bold uppercase tracking-widest mb-0.5",
                                item.estado === "cancelado"
                                  ? "text-slate-700"
                                  : "text-slate-500",
                              )}
                            >
                              Subtotal
                            </span>
                            <span
                              className={cn(
                                "font-black text-lg",
                                item.estado === "cancelado"
                                  ? "text-slate-600"
                                  : "text-white",
                              )}
                            >
                              {formatPricePEN(item.total_linea)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>

        <SheetFooter className="p-6 bg-[#0f172a] border-t border-slate-800 flex-col gap-4 sm:flex-col shrink-0">
          <div className="space-y-4 w-full">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
                  Monto Total
                </span>
                <span className="text-xl font-black text-white">
                  Total a Pagar
                </span>
              </div>
              <span className="text-4xl font-black text-cyan-500 tabular-nums tracking-tighter">
                {formatPricePEN(total)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full pt-2">
              <Button
                variant="outline"
                className="h-14 rounded-2xl border-slate-700 bg-slate-800/50 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 font-bold text-slate-400 transition-all duration-300"
                onClick={() => {
                  setIsCartOpen(false);
                }}
              >
                Cerrar
              </Button>
              <Button
                className="h-14 rounded-2xl bg-cyan-500 hover:bg-cyan-600 font-black text-white shadow-xl shadow-cyan-500/20 disabled:opacity-50 transition-all duration-300 active:scale-95"
                onClick={handleSendComand}
                disabled={sendComand.isPending || !isSendable}
              >
                Enviar Orden
              </Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartProductsSheet;
