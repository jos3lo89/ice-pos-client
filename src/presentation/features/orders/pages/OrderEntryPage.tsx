import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { Badge } from "@/presentation/components/ui/badge";

import LoadingState from "@/presentation/components/LoadingState";
import ErrorState from "@/presentation/components/ErrorState";
import CategoryWithProducts from "../components/CategoryWithProducts";
import { useParams } from "react-router-dom";
import CartProductsSheet from "../components/CartProductsSheet";
import ConfirmDialog from "@/presentation/components/ConfirmDialog";
import OrderComplete from "../components/OrderComplete";
import {
  useDeleteOrder,
  useGetCurrentOrderById,
} from "@/application/hooks/useOrder";
import OrderCanceled from "../components/OrderCanceled";
import CancelOrderDialog from "../components/CancelOrderDialog";

const OrderEntryPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isCancelOrderDialogOpen, setIsCancelOrderDialogOpen] = useState(false);

  const currentOrder = useGetCurrentOrderById(orderId!);
  const deleteOrder = useDeleteOrder();
  // const cancelOrder = useCancelOrder();

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

  if (currentOrderData.estado === "completado") {
    return <OrderComplete currentOrderData={currentOrderData} />;
  }

  if (currentOrderData.estado === "cancelado") {
    return <OrderCanceled />;
  }

  const handleDeleteOrder = () => {
    deleteOrder.mutate(currentOrderData.id, {
      onSuccess: () => {
        navigate("/mesas");
      },
    });
  };

  // TODO: Agregar un dialog para pedir la razón de la cancelación
  // const handleCancelOrder = () => {
  //   cancelOrder.mutate(
  //     {
  //       orderId: currentOrderData.id,
  //       reason: "", // TODO: Agregar la razón de la cancelación
  //     },
  //     {
  //       onSuccess: () => {
  //         navigate("/mesas");
  //       },
  //     },
  //   );
  // };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
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
              {`Mesa ${currentOrderData.mesa_actual?.numero_mesa ?? "---"}`}
            </h2>
            <p className="text-[10px] text-cyan-500 uppercase tracking-widest font-black">
              {currentOrderData.mesa_actual?.pisos?.nombre ?? "Local"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {currentOrderData.estado === "pendiente" && (
            <ConfirmDialog
              onConfirm={handleDeleteOrder}
              title="Eliminar orden"
              description="¿Estas seguro de eliminar la orden?"
            >
              <Button
                variant="outline"
                size="icon"
                className="relative bg-red-500/10 border-red-500/20 hover:bg-red-500 hover:border-red-500 text-red-400 hover:text-white rounded-2xl gap-2 h-11 px-4 transition-all duration-300 shadow-lg shadow-red-500/5 group"
                disabled={deleteOrder.isPending}
              >
                <Trash2 className="w-5 h-5 transition-transform group-hover:scale-110" />
              </Button>
            </ConfirmDialog>
          )}

          <Button
            variant="outline"
            className="relative bg-cyan-500/10 border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/50 text-white rounded-2xl gap-3 h-11 px-5 transition-all duration-300 shadow-lg shadow-cyan-500/5 group group"
            onClick={() => setIsCartOpen(true)}
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <Badge className="absolute -top-3 -right-3 min-w-[20px] h-5 flex items-center justify-center p-1 bg-cyan-500 border-2 border-slate-900 rounded-full text-[9px] font-black shadow-lg shadow-cyan-500/20">
                {currentOrderData._count.items_orden}
              </Badge>
            </div>
            <div className="w-px h-4 bg-slate-700 mx-1" />
            <span className="font-black text-sm tracking-tight text-cyan-50">
              S/ {currentOrderData.total}
            </span>
          </Button>
        </div>
      </header>

      <CategoryWithProducts />

      <CartProductsSheet
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        items={currentOrderData.items_orden}
        total={currentOrderData.total}
      />

      {isCancelOrderDialogOpen && (
        <CancelOrderDialog
          isOpen={isCancelOrderDialogOpen}
          onClose={() => setIsCancelOrderDialogOpen(false)}
          orderId={orderId!}
          // onSuccess={() => navigate("/mesas")}
        />
      )}
    </div>
  );
};

export default OrderEntryPage;
