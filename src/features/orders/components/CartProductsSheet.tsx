import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2, UtensilsCrossed, X } from "lucide-react";
import type { ItemsOrden } from "../interfaces/current-order.interface";
import { formatPricePEN } from "@/helpers/format-price";
import { useDeleteOrderItem, useSendComand } from "../hooks/useOrder";
import { useParams } from "react-router-dom";

type Props = {
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  items: ItemsOrden[];
  total: string;
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

  const handleDeleteOrderItem = (itemId: string) => {
    deleteOrderItem.mutate(itemId);
  };

  const handleSendComand = () => {
    if (!orderId) return;
    const itemsId = items
      .filter((item) => item.estado === "pendiente")
      .map((item) => item.id);

    if (itemsId.length === 0) return;
    sendComand.mutate({ orderId, itemsId });
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
                    return (
                      <div
                        key={item.id}
                        className="group animate-in slide-in-from-right-4 duration-300"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="space-y-1.5 pr-4">
                            <h4 className="font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight text-lg">
                              {item.nombre_producto}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedVariant && (
                                <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] uppercase font-black px-2.5 py-0.5 flex items-center gap-2 group-hover:bg-cyan-500/20 transition-colors">
                                  <span>{selectedVariant.variant_name}</span>
                                  <div className="w-1 h-1 rounded-full bg-cyan-400/30" />
                                  <span className="text-cyan-300/80 font-bold">
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
                                  className="bg-slate-800/50 text-slate-400 border border-slate-700/50 text-[10px] uppercase font-black px-2.5 py-0.5 flex items-center gap-2 group-hover:border-slate-600 transition-colors"
                                >
                                  <span>{mod.nombre_modificador}</span>
                                  <div className="w-1 h-1 rounded-full bg-slate-600/30" />
                                  <span className="text-slate-500 font-bold">
                                    {(Number(mod.precio_adicional) > 0
                                      ? "+ "
                                      : "") +
                                      formatPricePEN(mod.precio_adicional)}
                                  </span>
                                </Badge>
                              ))}
                            </div>
                            {item.notas && (
                              <div className="flex items-center gap-2 mt-2 bg-orange-500/5 p-2 rounded-lg border border-orange-500/10">
                                <p className="text-[11px] text-orange-400 font-bold italic line-clamp-2">
                                  "{item.notas}"
                                </p>
                              </div>
                            )}
                          </div>
                          {item.estado === "pendiente" ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-xl shrink-0 transition-all duration-300"
                              disabled={deleteOrderItem.isPending}
                              onClick={() => handleDeleteOrderItem(item.id)}
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-xl shrink-0 transition-all duration-300"
                              onClick={() => {
                                console.log(item.id);
                              }}
                              disabled={
                                deleteOrderItem.isPending ||
                                item.estado === "cancelado"
                              }
                            >
                              <X className="w-5 h-5" />
                            </Button>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-slate-800/60 pl-3 pr-4 py-1.5 rounded-xl border border-slate-700/50">
                            <span className="text-sm font-black text-cyan-400">
                              {item.cantidad}x
                            </span>
                            <div className="w-px h-3 bg-slate-700" />
                            <span className="text-[11px] text-slate-400 font-bold">
                              {formatPricePEN(item.precio_unitario)}
                            </span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">
                              Subtotal
                            </span>
                            <span className="font-black text-lg text-white">
                              {formatPricePEN(item.total_linea)}
                            </span>
                          </div>
                        </div>

                        <div className="h-px bg-linear-to-r from-slate-800/0 via-slate-800 to-slate-800/0 mt-8" />
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
                onClick={() => handleSendComand()}
                disabled={sendComand.isPending}
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
