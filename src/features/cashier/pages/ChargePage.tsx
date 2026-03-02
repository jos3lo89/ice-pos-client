import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetOrderDetails } from "@/features/orders/hooks/useOrder";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Receipt,
  User,
  Utensils,
  History,
  CreditCard,
  Wallet,
  Smartphone,
  ShieldCheck,
  Check,
  MoreVertical,
  XCircle,
  Timer,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { statusConfig } from "@/features/orders/utils/status-config";
import { formatPricePEN } from "@/helpers/format-price";
import { PaymentDialog } from "@/features/payments/components/PaymentDialog";
import { formatDateTime } from "@/utils/format-date-time";
import { TicketVentaDialog } from "../components/TicketVentaDialog";
import { Printer } from "lucide-react";

const ChargePage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const {
    data: orderData,
    isLoading,
    isError,
    refetch,
  } = useGetOrderDetails(orderId!);

  const [selectedItems, setSelectedItems] = useState<Record<string, number>>(
    {},
  );
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const [paymentId, setPaymentId] = useState<string>("");

  const toggleItemSelection = (itemId: string, maxQty: number) => {
    setSelectedItems((prev) => {
      if (prev[itemId]) {
        const newSelection = { ...prev };
        delete newSelection[itemId];
        return newSelection;
      }
      return { ...prev, [itemId]: maxQty };
    });
  };

  const handlePaySelected = () => {
    setIsPaymentDialogOpen(true);
  };

  const selectedTotal = useMemo(() => {
    if (!orderData) return 0;
    return Object.entries(selectedItems).reduce((acc, [id, qty]) => {
      const item = orderData.items.find((i) => i.id === id);
      if (!item) return acc;
      return (
        acc +
        item.precio_unitario * qty +
        item.total_modificadores * (qty / item.cantidad)
      );
    }, 0);
  }, [selectedItems, orderData]);

  if (isLoading)
    return <LoadingState message="Cargando detalles de la orden..." />;
  if (isError || !orderData)
    return (
      <ErrorState message="No se pudo cargar la orden" onRetry={refetch} />
    );

  const { orden, items, resumen, historial_pagos } = orderData;
  const orderStatus =
    statusConfig[orden.estado as keyof typeof statusConfig] ||
    statusConfig.disponible;

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-slate-700/30">
        <div className="flex items-center gap-5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-white tracking-tight">
                Orden {orden.numero_order}
              </h1>
              <Badge
                className={cn(
                  "px-3 py-1 font-bold rounded-lg uppercase text-[10px]",
                  orderStatus.color,
                )}
              >
                {orden.estado}
              </Badge>
            </div>
            <p className="text-slate-400 font-medium flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-emerald-500" /> Mesa{" "}
                {orden.mesa}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-700" />
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-emerald-500" /> {orden.mesero}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-900/50 rounded-2xl border border-slate-800/50 flex flex-col items-end">
            <span className="text-sm font-bold text-white capitalize">
              {orden.tipo_order.replace("_", " ")}
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-3">
          <Card className="bg-[#1e293b]/50 border-slate-700/50 backdrop-blur-sm rounded-[2rem] overflow-hidden shadow-2xl">
            <CardHeader className="px-4 border-b border-slate-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-white">
                    Detalle de Consumo
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Selecciona los productos para procesar el pago
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 rounded-xl border-slate-700 text-slate-400 hover:text-white"
                    onClick={() => {
                      const all: Record<string, number> = {};
                      items.forEach((i) => {
                        if (
                          i.cantidad_pendiente > 0 &&
                          i.estado !== "cancelado"
                        )
                          all[i.id] = i.cantidad_pendiente;
                      });
                      setSelectedItems(all);
                    }}
                  >
                    Seleccionar Todo
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-700/30">
                {items.map((item) => {
                  const isSelected = !!selectedItems[item.id];
                  const isCancelled = item.estado === "cancelado";
                  const canBePaid = item.cantidad_pendiente > 0 && !isCancelled;
                  const isFullyPaid = item.esta_pagado;

                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all",
                        isSelected
                          ? "bg-emerald-500/5"
                          : "hover:bg-slate-800/20",
                        !canBePaid && "opacity-50 grayscale",
                        isCancelled &&
                          "border-l-4 border-l-red-500 shadow-inner",
                      )}
                      onClick={() =>
                        canBePaid &&
                        toggleItemSelection(item.id, item.cantidad_pendiente)
                      }
                    >
                      <div className="flex items-center gap-5 flex-1 cursor-pointer">
                        <div
                          className={cn(
                            "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                            isSelected
                              ? "bg-emerald-500 border-emerald-500 shadow-md shadow-emerald-500/20"
                              : "border-slate-600 bg-slate-800",
                            !canBePaid &&
                              "opacity-20 bg-slate-900 border-slate-800 cursor-not-allowed",
                            isCancelled && "border-red-500/30",
                          )}
                        >
                          {isSelected && (
                            <Check className="w-4 h-4 text-white stroke-[3px]" />
                          )}
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-bold text-white tracking-tight">
                              {item.nombre_producto}
                            </h4>
                            {item.nombre_variante && (
                              <Badge
                                variant="outline"
                                className="text-[10px] bg-slate-800 border-slate-700 font-medium"
                              >
                                {item.nombre_variante}
                              </Badge>
                            )}
                          </div>

                          {item.modificadores.length > 0 && (
                            <p className="text-xs text-slate-500">
                              +{" "}
                              {item.modificadores
                                .map((m) => m.nombre)
                                .join(", ")}
                            </p>
                          )}

                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-900/50 px-2 py-0.5 rounded-md border border-slate-800">
                              Cant: {item.cantidad}
                            </span>
                            {item.cantidad_pagada > 0 && (
                              <Badge
                                variant="secondary"
                                className="bg-emerald-500/10 text-emerald-400 text-[9px] border-emerald-500/20"
                              >
                                {item.cantidad_pagada} pagados
                              </Badge>
                            )}
                            {item.cantidad_pendiente > 0 &&
                              !isFullyPaid &&
                              !isCancelled && (
                                <Badge
                                  variant="secondary"
                                  className="bg-orange-500/10 text-orange-400 text-[9px] border-orange-500/20"
                                >
                                  {item.cantidad_pendiente} pendientes
                                </Badge>
                              )}

                            {/* Item State Badges */}
                            {item.estado === "pendiente" && (
                              <Badge className="bg-slate-700/50 text-slate-400 text-[9px] border-slate-600/30 gap-1 px-1.5 h-4">
                                <Timer className="w-2.5 h-2.5" /> Pendiente
                              </Badge>
                            )}
                            {item.estado === "preparando" && (
                              <Badge className="bg-orange-500/10 text-orange-400 text-[9px] border-orange-500/20 gap-1 px-1.5 h-4">
                                <Timer className="w-2.5 h-2.5 animate-spin-slow" />{" "}
                                Preparando
                              </Badge>
                            )}
                            {item.estado === "listo" && (
                              <Badge className="bg-emerald-500/10 text-emerald-400 text-[9px] border-emerald-500/20 gap-1 px-1.5 h-4">
                                <CheckCircle2 className="w-2.5 h-2.5" /> Listo
                              </Badge>
                            )}
                            {isCancelled && (
                              <Badge className="bg-red-500/10 text-red-400 text-[9px] border-red-500/20 gap-1 px-1.5 h-4">
                                <XCircle className="w-2.5 h-2.5" /> Cancelado
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-10 md:min-w-[180px]">
                        <div className="text-right">
                          <p className="text-xs text-slate-500 font-medium">
                            {formatPricePEN(item.precio_unitario)} c/u
                          </p>
                          <p className="text-xl font-black text-emerald-400 tracking-tight">
                            {formatPricePEN(item.total_linea)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-600 hover:text-white"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {historial_pagos.length > 0 && (
            <Card className="bg-[#1e293b]/50 border-slate-700/50 rounded-3xl overflow-hidden shadow-xl">
              <CardHeader className="border-b border-white/5 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <History className="w-5 h-5 text-blue-400" />
                  </div>
                  <CardTitle className="text-lg font-bold text-white">
                    Historial de Pagos
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-700/30">
                  {historial_pagos.map((pago) => (
                    <div
                      key={pago.id}
                      className="p-5 flex items-center justify-between hover:bg-slate-800/10 transition-all"
                    >
                      <div className="flex gap-4">
                        <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center h-fit">
                          {pago.metodo === "efectivo" && (
                            <Wallet className="w-5 h-5 text-emerald-400" />
                          )}
                          {pago.metodo === "tarjeta" && (
                            <CreditCard className="w-5 h-5 text-orange-400" />
                          )}
                          {(pago.metodo === "plin" ||
                            pago.metodo === "yape") && (
                            <Smartphone className="w-5 h-5 text-blue-400" />
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-sm font-bold text-white tracking-tight">
                            Pago {pago.numero_pago}
                          </p>
                          <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium">
                            <span className="capitalize">{pago.metodo}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-700" />
                            <span className="uppercase">
                              {pago.tipo_documento}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-700" />
                            <span>{formatDateTime(pago.fecha_creacion)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-white">
                          {formatPricePEN(pago.monto)}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 rounded-lg border-slate-700/50 text-slate-400 hover:text-white hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all font-bold text-[10px] gap-2"
                          onClick={() => {
                            setIsTicketDialogOpen(true);
                            setPaymentId(pago.id);
                          }}
                        >
                          <Printer className="w-3.5 h-3.5" />
                          Ticket
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-8 space-y-6">
            <Card className="bg-linear-to-br from-slate-800 to-slate-900 border-slate-700/50 rounded-[2.5rem] overflow-hidden shadow-2xl border-t border-t-white/5">
              <CardHeader className="p-2 border-b border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                    <Receipt className="w-6 h-6 text-emerald-400" />
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "px-4 py-1.5 font-black uppercase text-[10px] tracking-widest",
                      resumen.esta_pagado_completo
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-orange-500/10 text-orange-400 border-orange-500/20",
                    )}
                  >
                    {resumen.esta_pagado_completo
                      ? "Pagado Completo"
                      : "Pago Parcial"}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-black text-white">
                  Resumen de Cuenta
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 space-y-8">
                <div className="space-y-4">
                  <SummaryRow
                    label="Total de la Orden"
                    amount={resumen.total_orden}
                  />
                  <SummaryRow
                    label="Total ya Pagado"
                    amount={resumen.total_pagado}
                    colorClass="text-emerald-400"
                  />
                  <div className="pt-4 mt-6 border-t border-white/5 flex justify-between items-end">
                    <span className="text-slate-400 font-bold">Por Pagar</span>
                    <span className="text-2xl font-black text-white tracking-tighter">
                      {formatPricePEN(resumen.total_pendiente)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      Progreso de Pago
                    </span>
                    <span className="text-xs font-bold text-white">
                      {Math.round(
                        (resumen.total_pagado / resumen.total_orden) * 100,
                      )}
                      %
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5 p-[2px]">
                    <div
                      className="h-full bg-linear-to-r from-emerald-600 to-teal-400 rounded-full transition-all duration-1000 shadow-lg shadow-emerald-500/20"
                      style={{
                        width: `${(resumen.total_pagado / resumen.total_orden) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div
              className={cn(
                "p-8 rounded-[2.5rem] bg-slate-800/80 border transition-all duration-500 animate-in zoom-in-95",
                selectedTotal > 0
                  ? "border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-100"
                  : "border-slate-700/50",
              )}
            >
              <div className="flex flex-col gap-6 text-center">
                <div className="space-y-2">
                  <p className="text-xs text-slate-500 font-black uppercase tracking-widest">
                    Monto Seleccionado
                  </p>
                  <h3
                    className={cn(
                      "text-3xl font-black tracking-tighter transition-all",
                      selectedTotal > 0 ? "text-white" : "text-slate-600",
                    )}
                  >
                    S/ {selectedTotal.toFixed(2)}
                  </h3>
                  {selectedTotal > 0 && (
                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest animate-pulse">
                      {Object.keys(selectedItems).length} items seleccionados
                    </p>
                  )}
                </div>

                <Button
                  disabled={selectedTotal === 0}
                  onClick={handlePaySelected}
                  className={cn(
                    "h-16 rounded-2xl font-black text-lg transition-all gap-2 shadow-xl",
                    selectedTotal > 0
                      ? "bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/20 hover:scale-[1.02] active:scale-95"
                      : "bg-slate-700/50 text-slate-500 cursor-not-allowed",
                  )}
                >
                  <ShieldCheck className="w-6 h-6" />
                  {selectedTotal === resumen.total_pendiente
                    ? "Pagar Total"
                    : "Completar Pago"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        orderId={orderId!}
        totalAmount={selectedTotal}
        itemIds={Object.keys(selectedItems)}
        onSuccess={() => {
          setSelectedItems({});
          refetch();
        }}
      />

      {isTicketDialogOpen && (
        <TicketVentaDialog
          isTicketDialogOpen={isTicketDialogOpen}
          setIsTicketDialogOpen={setIsTicketDialogOpen}
          paymentId={paymentId}
        />
      )}
    </div>
  );
};

// --- Helper Components ---

const SummaryRow = ({ label, amount, colorClass = "text-white" }: any) => (
  <div className="flex justify-between items-center">
    <span className="text-sm font-bold text-slate-500">{label}</span>
    <span className={cn("text-lg font-black tracking-tight", colorClass)}>
      S/ {amount.toFixed(2)}
    </span>
  </div>
);

export default ChargePage;
