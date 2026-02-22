import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCurrentOrderById } from "@/features/orders/hooks/useOrder";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import CategoryWithProducts from "../components/CategoryWithProducts";
import { useParams } from "react-router-dom";
import CartProductsSheet from "../components/CartProductsSheet";

const OrderEntryPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

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

      <CartProductsSheet
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        items={currentOrderData.order_items}
        total={currentOrderData.total}
      />
    </div>
  );
};

export default OrderEntryPage;
