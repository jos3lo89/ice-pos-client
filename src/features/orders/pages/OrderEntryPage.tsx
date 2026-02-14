import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useAddProductToOrder,
  useGetCurrentOrderById,
} from "@/features/orders/hooks/useOrder";
import { ArrowLeft, ShoppingCart, Trash2, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";

import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import CategoryWithProducts from "../components/CategoryWithProducts";
import { useParams } from "react-router-dom";

const OrderEntryPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const addProductMutation = useAddProductToOrder();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const currentOrder = useGetCurrentOrderById(orderId!);

  if (currentOrder.isLoading) {
    return <LoadingState message="Cargando orden" />;
  }

  if (currentOrder.isError) {
    return (
      <ErrorState
        message="Error al cargar la orden"
        onRetry={() => currentOrder.refetch()}
      />
    );
  }

  const currentOrderData = currentOrder.data;

  if (!currentOrderData) {
    return (
      <ErrorState
        message="Orden no encontrada"
        onRetry={() => currentOrder.refetch()}
      />
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 p-4 shrink-0 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/mesas")}
            className="rounded-full hover:bg-slate-800 text-slate-400"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">
              Mesa{" "}
              {currentOrderData.tables_orders_table_idTotables.table_number}
            </h2>
            <p className="text-[10px] text-cyan-500 uppercase tracking-widest font-black">
              {currentOrderData.tables_orders_table_idTotables.floors.name}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          className="relative bg-slate-800 border-slate-700 hover:bg-slate-700 rounded-2xl gap-2 h-11 px-4"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart className="w-5 h-5 text-cyan-400" />
          <Badge className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center p-0 bg-red-500 border-2 border-slate-900 rounded-full text-[10px] font-bold">
            {currentOrderData._count.order_items}
          </Badge>
          <span className="font-bold text-sm">S/ {currentOrderData.total}</span>
        </Button>
      </header>

      <CategoryWithProducts />

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md bg-[#0f172a] border-slate-800 p-0 overflow-hidden flex flex-col outline-none"
        >
          <SheetHeader className="px-6 bg-slate-900/50 border-b border-slate-800">
            <SheetTitle className="text-2xl font-black text-white flex items-center gap-3">
              <ShoppingCart className="text-cyan-400" />
            </SheetTitle>
            <SheetDescription />
          </SheetHeader>

          <div className="flex-1 overflow-hidden flex flex-col">
            {currentOrderData.order_items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                  <UtensilsCrossed className="w-10 h-10 text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-300">
                  Carrito vacío
                </h3>
                <p className="text-slate-500 mt-2">
                  Agregue deliciosos productos de nuestra carta para comenzar.
                </p>
              </div>
            ) : (
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {currentOrderData.order_items.map((item) => (
                    <div
                      key={item.id}
                      className="group animate-in slide-in-from-right-4 duration-300"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="space-y-1 pr-4">
                          <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {item.products.name}
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {/* {item.variant_name && (
                              <Badge className="bg-cyan-500/10 text-cyan-400 border-0 text-[9px] uppercase font-black">
                                {item.variant_name}
                              </Badge>
                            )} */}
                            {item.products.product_modifiers.map((name) => (
                              <Badge
                                key={name}
                                className="bg-slate-800 text-slate-400 border-0 text-[9px] uppercase font-black"
                              >
                                {name}
                              </Badge>
                            ))}
                          </div>
                          {item.notes && (
                            <p className="text-[10px] text-orange-400 font-bold italic">
                              "{item.notes}"
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg shrink-0"
                          onClick={() => {
                            console.log("borrando omg");
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700/50">
                          <span className="text-xs font-black text-cyan-400">
                            {item.quantity}x
                          </span>
                          <span className="text-[10px] text-slate-400">
                            S/ {item.products.price} c/u
                          </span>
                        </div>
                        <span className="font-bold text-sm text-white">
                          S/ {item.line_total}
                        </span>
                      </div>

                      <div className="h-px bg-slate-800 mt-6" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          <SheetFooter className="p-6 bg-slate-900 border-t border-slate-800 flex-col gap-4 sm:flex-col">
            <div className="space-y-3 w-full">
              {/* <div className="flex justify-between items-center text-slate-400 text-sm">
                <span>Subtotal</span>
                <span>S/ {(cartTotal / 1.18).toFixed(2)}</span>
              </div> */}
              {/* <div className="flex justify-between items-center text-slate-400 text-sm">
                <span>IGV (18%)</span>
                <span>S/ {(cartTotal - cartTotal / 1.18).toFixed(2)}</span>
              </div> */}
              <div className="flex justify-between items-center">
                <span className="text-xl font-black text-white">Total</span>
                <span className="text-2xl font-black text-cyan-500 leading-none">
                  S/ {currentOrderData.total}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full mt-4">
              <Button
                variant="outline"
                className="h-14 rounded-2xl border-slate-700 bg-slate-800 hover:bg-slate-700 font-bold text-red-400"
                onClick={() => {
                  console.log("Cancel Order (Simulated ID):");
                }}
              >
                Cancelar
              </Button>
              <Button
                className="h-14 rounded-2xl bg-cyan-500 hover:bg-cyan-600 font-black text-white shadow-xl shadow-cyan-500/20 disabled:opacity-50"
                disabled={
                  currentOrderData.order_items.length === 0 ||
                  addProductMutation.isPending
                }
                onClick={() => {
                  console.log("Enviar Orden");
                }}
              >
                {addProductMutation.isPending
                  ? "Procesando..."
                  : "Enviar Orden"}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default OrderEntryPage;
