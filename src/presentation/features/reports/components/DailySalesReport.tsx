import { useState } from "react";
import { useVentasPorDia } from "@/application/hooks/useReports";
import LoadingState from "@/presentation/components/LoadingState";
import ErrorState from "@/presentation/components/ErrorState";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import {
  Calendar as CalendarIcon,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Wallet,
  CreditCard,
  Banknote,
  Phone,
  LayoutDashboard,
  Box,
  ArrowRight,
  PlusCircle,
  MinusCircle,
  ReceiptText,
} from "lucide-react";
import { formatPricePEN } from "@/utils/format-price";
import { cn } from "@/lib/utils";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import dayjs from "dayjs";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

const DailySalesReport = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  const fechaString = selectedDate
    ? dayjs(selectedDate).format("YYYY-MM-DD")
    : dayjs(today).format("YYYY-MM-DD");

  const { data, isLoading, isError, refetch, isFetching } = useVentasPorDia({
    fecha: fechaString,
  });

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoadingState message="Generando reporte diario..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-96 flex items-center justify-center">
        <ErrorState
          title="Error en reporte diario"
          message="No se pudo obtener la información de ventas para la fecha seleccionada."
          onRetry={refetch}
        />
      </div>
    );
  }

  const {
    resumen,
    comparativa_ayer,
    ventas_por_metodo,
    ventas_por_tipo_orden,
    movimientos_manuales,
  } = data!;

  const isPositive = comparativa_ayer.variacion_porcentaje >= 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Date Selector Header */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-4 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <LayoutDashboard className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Ventas por Día
            </h2>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">
              Resumen operativo detallado
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 z-10 pointer-events-none" />
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              maxDate={today}
              locale="es"
              dateFormat="dd 'de' MMMM, yyyy"
              portalId="root"
              popperClassName="z-[9999]"
              popperPlacement="bottom-end"
              className="w-[240px] bg-slate-950/60 border border-white/10 rounded-xl px-10 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all cursor-pointer shadow-inner"
            />
          </div>
          {isFetching && (
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse ml-2" />
          )}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/30" />
          <CardContent className="p-6">
            <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">
              Ingresos Totales
            </p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black text-white">
                {formatPricePEN(resumen.total_ventas)}
              </h3>
              <div
                className={cn(
                  "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg",
                  isPositive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-rose-500/10 text-rose-400",
                )}
              >
                {isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {Math.abs(comparativa_ayer.variacion_porcentaje)}%
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              vs. ayer: {formatPricePEN(comparativa_ayer.total_ventas_ayer)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/30" />
          <CardContent className="p-6">
            <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">
              Órdenes Totales
            </p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black text-white">
                {resumen.total_ordenes}
              </h3>
              <ShoppingCart className="w-5 h-5 text-blue-400 opacity-30" />
            </div>
            <div className="flex gap-2 mt-2">
              <span className="text-[8px] font-bold text-emerald-400 uppercase">
                {resumen.ordenes_completadas} OK
              </span>
              <span className="text-[8px] font-bold text-slate-500 uppercase">
                /
              </span>
              <span className="text-[8px] font-bold text-rose-400 uppercase">
                {resumen.ordenes_canceladas} CANCEL
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-500/30" />
          <CardContent className="p-6">
            <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">
              Ticket Promedio
            </p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black text-white">
                {formatPricePEN(resumen.ticket_promedio)}
              </h3>
              <ReceiptText className="w-5 h-5 text-amber-400 opacity-30" />
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              Promedio por cliente hoy
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-purple-500/30" />
          <CardContent className="p-6">
            <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">
              Balance Manual
            </p>
            <h3 className="text-2xl font-black text-white">
              {formatPricePEN(
                movimientos_manuales.ingresos -
                  movimientos_manuales.egresos -
                  movimientos_manuales.gastos,
              )}
            </h3>
            <div className="flex gap-2 mt-2">
              <span className="text-[8px] font-bold text-emerald-400 uppercase">
                +{formatPricePEN(movimientos_manuales.ingresos)}
              </span>
              <span className="text-[8px] font-bold text-rose-400 uppercase">
                -
                {formatPricePEN(
                  movimientos_manuales.egresos + movimientos_manuales.gastos,
                )}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Payment Method */}
        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden rounded-2xl">
          <CardHeader className="border-b border-white/5 bg-white/2 p-5">
            <CardTitle className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-tighter">
              <Wallet className="w-4 h-4 text-cyan-400" />
              Ingresos por Método de Pago
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <PaymentMethodRow
              icon={<Banknote className="w-4 h-4 text-emerald-400" />}
              label="Efectivo"
              value={ventas_por_metodo.efectivo}
              color="emerald"
              total={resumen.total_ventas}
            />
            <PaymentMethodRow
              icon={<Phone className="w-4 h-4 text-purple-400" />}
              label="Yape"
              value={ventas_por_metodo.yape}
              color="purple"
              total={resumen.total_ventas}
            />
            <PaymentMethodRow
              icon={<Phone className="w-4 h-4 text-cyan-400" />}
              label="Plin"
              value={ventas_por_metodo.plin}
              color="cyan"
              total={resumen.total_ventas}
            />
            <PaymentMethodRow
              icon={<CreditCard className="w-4 h-4 text-blue-400" />}
              label="Tarjeta"
              value={ventas_por_metodo.tarjeta}
              color="blue"
              total={resumen.total_ventas}
            />
          </CardContent>
        </Card>

        {/* Sales by Order Type */}
        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden rounded-2xl">
          <CardHeader className="border-b border-white/5 bg-white/2 p-5">
            <CardTitle className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-tighter">
              <Box className="w-4 h-4 text-amber-400" />
              Ingresos por Tipo de Orden
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {ventas_por_tipo_orden.map((item, idx) => (
              <div key={idx} className="group cursor-default">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center border border-white/5 group-hover:border-amber-500/30 transition-colors">
                      <span className="text-[10px] font-black text-slate-400 group-hover:text-amber-400 transition-colors uppercase">
                        {item.tipo.substring(0, 3)}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors capitalize">
                      {item.tipo}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-white">
                      {formatPricePEN(item.total)}
                    </p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">
                      {item.cantidad} órdenes
                    </p>
                  </div>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500/50 rounded-full transition-all duration-1000 group-hover:bg-amber-400/70"
                    style={{
                      width: `${(item.total / resumen.total_ventas) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
            {ventas_por_tipo_orden.length === 0 && (
              <div className="h-40 flex items-center justify-center text-slate-500 italic text-sm">
                No hay datos para esta fecha
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Manual Movements section */}
      <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden rounded-2xl">
        <CardHeader className="border-b border-white/5 bg-white/2 p-5">
          <CardTitle className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-tighter">
            <ArrowRight className="w-4 h-4 text-emerald-400" />
            Movimientos Manuales de Caja
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ManualMovementItem
              icon={<PlusCircle className="w-5 h-5 text-emerald-400" />}
              label="Entradas Propias"
              value={movimientos_manuales.ingresos}
              description="Ingresos extraordinarios a caja"
            />
            <ManualMovementItem
              icon={<MinusCircle className="w-5 h-5 text-rose-400" />}
              label="Salidas / Gastos"
              value={movimientos_manuales.egresos}
              description="Retiros de efectivo de caja"
            />
            <ManualMovementItem
              icon={<MinusCircle className="w-5 h-5 text-amber-400" />}
              label="Compras / Insumos"
              value={movimientos_manuales.gastos}
              description="Pagos directos a proveedores"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const PaymentMethodRow = ({
  icon,
  label,
  value,
  color,
  total,
}: {
  icon: any;
  label: string;
  value: number;
  color: string;
  total: number;
}) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <div className="group cursor-default">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center border transition-colors",
              `bg-${color}-500/10 border-${color}-500/20 group-hover:bg-${color}-500/20`,
            )}
          >
            {icon}
          </div>
          <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
            {label}
          </span>
        </div>
        <div className="text-right">
          <p className="text-sm font-black text-white">
            {formatPricePEN(value)}
          </p>
          <p
            className={cn(
              "text-[10px] font-black uppercase tracking-widest",
              `text-${color}-500`,
            )}
          >
            {percentage.toFixed(1)}%
          </p>
        </div>
      </div>
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000",
            `bg-${color}-500/40 group-hover:bg-${color}-500/60`,
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const ManualMovementItem = ({
  icon,
  label,
  value,
  description,
}: {
  icon: any;
  label: string;
  value: number;
  description: string;
}) => (
  <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5 hover:border-white/10 transition-all flex items-start gap-4 group">
    <div className="mt-1 transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-bold text-white mb-0.5">{label}</h4>
      <p className="text-[10px] text-slate-500 mb-2 font-medium leading-relaxed">
        {description}
      </p>
      <p className="text-lg font-black text-slate-200">
        {formatPricePEN(value)}
      </p>
    </div>
  </div>
);

export default DailySalesReport;
