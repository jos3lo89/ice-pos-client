import { useState } from "react";
import { useVentasPorSemana } from "@/application/hooks/useReports";
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
  ReceiptText,
  Star,
  BarChart3,
} from "lucide-react";
import { formatPricePEN } from "@/utils/format-price";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

// Helper to get current ISO week in YYYY-Www format
const getCurrentISOWeek = (): string => {
  const date = new Date();
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );

  const year = d.getUTCFullYear();
  const week = weekNo.toString().padStart(2, "0");

  return `${year}-W${week}`;
};

const WeeklySalesReport = () => {
  const [semanaSeleccionada, setSemanaSeleccionada] =
    useState<string>(getCurrentISOWeek());

  const { data, isLoading, isError, refetch, isFetching } = useVentasPorSemana({
    semana: semanaSeleccionada,
  });

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoadingState message="Generando reporte semanal..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-96 flex items-center justify-center">
        <ErrorState
          title="Error en reporte semanal"
          message="No se pudo obtener la información de ventas para la semana seleccionada."
          onRetry={refetch}
        />
      </div>
    );
  }

  const {
    resumen,
    comparativa_semana_anterior,
    ventas_por_metodo,
    mejor_dia,
    desglose_por_dia,
    fecha_inicio,
    fecha_fin,
  } = data!;

  const isPositive =
    (comparativa_semana_anterior.variacion_porcentaje ?? 0) >= 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Week Selector Header */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-4 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
            <BarChart3 className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Ventas por Semana
            </h2>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest leading-none">
              {dayjs(fecha_inicio).format("DD MMM")} —{" "}
              {dayjs(fecha_fin).format("DD MMM, YYYY")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 z-10 pointer-events-none" />
            <input
              type="week"
              value={semanaSeleccionada}
              max={getCurrentISOWeek()}
              onChange={(e) => setSemanaSeleccionada(e.target.value)}
              className="w-[260px] bg-slate-950/60 border border-white/10 rounded-xl px-10 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all cursor-pointer shadow-inner font-bold appearance-none [color-scheme:dark]"
            />
          </div>
          {isFetching && (
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse ml-2" />
          )}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/30" />
          <CardContent className="p-6">
            <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">
              Ventas Semanales
            </p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black text-white">
                {formatPricePEN(resumen.total_ventas)}
              </h3>
              {comparativa_semana_anterior.variacion_porcentaje !== null && (
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
                  {Math.abs(comparativa_semana_anterior.variacion_porcentaje)}%
                </div>
              )}
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              Semana anterior:{" "}
              {formatPricePEN(
                comparativa_semana_anterior.total_ventas_anterior,
              )}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/30" />
          <CardContent className="p-6">
            <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">
              Total Órdenes
            </p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black text-white">
                {resumen.total_ordenes}
              </h3>
              <ShoppingCart className="w-5 h-5 text-indigo-400 opacity-30" />
            </div>
            <div className="flex gap-2 mt-2">
              <span className="text-[8px] font-bold text-emerald-400 uppercase">
                {resumen.ordenes_completadas} OK
              </span>
              <span className="text-[8px] font-bold text-slate-500 uppercase">
                /
              </span>
              <span className="text-[8px] font-bold text-rose-400 uppercase">
                {resumen.ordenes_canceladas} CANC.
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/30" />
          <CardContent className="p-6">
            <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">
              Día Más Fuerte
            </p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black text-white truncate max-w-[120px] capitalize">
                {mejor_dia.nombre}
              </h3>
              <Star className="w-5 h-5 text-cyan-400 opacity-30 fill-cyan-400/20" />
            </div>
            <p className="text-[10px] font-bold text-cyan-400 mt-2">
              {formatPricePEN(mejor_dia.total)} recaudados
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-500/30" />
          <CardContent className="p-6">
            <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">
              Promedio de Ticket
            </p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black text-white">
                {formatPricePEN(resumen.ticket_promedio)}
              </h3>
              <ReceiptText className="w-5 h-5 text-amber-400 opacity-30" />
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              Gasto medio por orden
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Payment Methods */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden rounded-2xl h-full">
            <CardHeader className="border-b border-white/5 bg-white/2 p-4">
              <CardTitle className="text-xs font-black text-white flex items-center gap-2 uppercase tracking-tight">
                <Wallet className="w-4 h-4 text-purple-400" />
                Ventas por Método
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <PaymentMethodItem
                label="Efectivo"
                value={ventas_por_metodo.efectivo}
                total={resumen.total_ventas}
                icon={<Banknote className="w-3.5 h-3.5 text-emerald-400" />}
                color="emerald"
              />
              <PaymentMethodItem
                label="Yape"
                value={ventas_por_metodo.yape}
                total={resumen.total_ventas}
                icon={<Phone className="w-3.5 h-3.5 text-purple-400" />}
                color="purple"
              />
              <PaymentMethodItem
                label="Plin"
                value={ventas_por_metodo.plin}
                total={resumen.total_ventas}
                icon={<Phone className="w-3.5 h-3.5 text-cyan-400" />}
                color="cyan"
              />
              <PaymentMethodItem
                label="Tarjeta"
                value={ventas_por_metodo.tarjeta}
                total={resumen.total_ventas}
                icon={<CreditCard className="w-3.5 h-3.5 text-blue-400" />}
                color="blue"
              />
            </CardContent>
          </Card>
        </div>

        {/* Daily Breakdown */}
        <div className="lg:col-span-3">
          <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden rounded-2xl h-full">
            <CardHeader className="border-b border-white/5 bg-white/2 p-4">
              <CardTitle className="text-xs font-black text-white flex items-center gap-2 uppercase tracking-tight">
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                Desglose por Día de la Semana
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-950/40 border-b border-white/5">
                    <tr>
                      <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-500 tracking-widest">
                        Día
                      </th>
                      <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-500 tracking-widest text-right">
                        Recaudado
                      </th>
                      <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-500 tracking-widest text-center">
                        Órdenes
                      </th>
                      <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-500 tracking-widest text-center">
                        Estado
                      </th>
                      <th className="px-6 py-4 text-right pr-8" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {desglose_por_dia.map((item, idx) => (
                      <tr
                        key={idx}
                        className="group hover:bg-white/2 transition-colors duration-300"
                      >
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-white capitalize">
                              {item.dia}
                            </span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">
                              {dayjs(item.fecha).format("DD MMM")}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <span className="text-sm font-black text-emerald-400">
                            {formatPricePEN(item.total_ventas)}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <div className="inline-flex items-center gap-1.5 bg-slate-800/50 px-2 py-1 rounded-lg border border-white/5">
                            <ShoppingCart className="w-3 h-3 text-slate-500" />
                            <span className="text-xs font-black text-slate-300">
                              {item.total_ordenes}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center gap-3">
                            <div className="flex flex-col items-center">
                              <span className="text-[8px] font-black text-emerald-500/70 mr-1 uppercase">
                                OK
                              </span>
                              <span className="text-[10px] font-black text-white">
                                {item.ordenes_completadas}
                              </span>
                            </div>
                            <div className="w-px h-6 bg-white/5" />
                            <div className="flex flex-col items-center">
                              <span className="text-[8px] font-black text-rose-500/70 mr-1 uppercase">
                                CAN
                              </span>
                              <span className="text-[10px] font-black text-white">
                                {item.ordenes_canceladas}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right pr-8">
                          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20">
                            <span className="text-[9px] font-black text-amber-500 uppercase">
                              Avg Ticket
                            </span>
                            <span className="text-[10px] font-black text-amber-400">
                              {formatPricePEN(item.ticket_promedio)}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {desglose_por_dia.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-20 text-center text-slate-500 font-bold italic"
                        >
                          No hay registros esta semana
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const PaymentMethodItem = ({
  label,
  value,
  total,
  icon,
  color,
}: {
  label: string;
  value: number;
  total: number;
  icon: any;
  color: string;
}) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <div className="space-y-2 group cursor-default">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "p-1.5 rounded-lg border transition-all duration-300",
              `bg-${color}-500/10 border-${color}-500/10 group-hover:bg-${color}-500/20 group-hover:border-${color}-500/30`,
            )}
          >
            {icon}
          </div>
          <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
            {label}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-black text-white block leading-none">
            {formatPricePEN(value)}
          </span>
          <span
            className={cn(
              "text-[9px] font-black uppercase tracking-tighter",
              `text-${color}-500`,
            )}
          >
            {percentage.toFixed(1)}%
          </span>
        </div>
      </div>
      <div className="h-1 w-full bg-slate-950 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000",
            `bg-${color}-500/50 group-hover:bg-${color}-500/80`,
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default WeeklySalesReport;
