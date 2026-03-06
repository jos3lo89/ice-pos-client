import { useState } from "react";
import { useVentasPorMes } from "@/application/hooks/useReports";
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
  ChevronRight,
  BarChart3,
  CalendarDays,
} from "lucide-react";
import { formatPricePEN } from "@/utils/format-price";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

const MonthlySalesReport = () => {
  const today = new Date();
  const currentMonth = dayjs(today).format("YYYY-MM");
  const [mesSeleccionado, setMesSeleccionado] = useState<string>(currentMonth);

  const { data, isLoading, isError, refetch, isFetching } = useVentasPorMes({
    mes: mesSeleccionado,
  });

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoadingState message="Generando reporte mensual..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-96 flex items-center justify-center">
        <ErrorState
          title="Error en reporte mensual"
          message="No se pudo obtener la información de ventas para el mes seleccionado."
          onRetry={refetch}
        />
      </div>
    );
  }

  const {
    resumen,
    comparativa_mes_anterior,
    ventas_por_metodo,
    mejor_dia,
    desglose_por_semana,
    desglose_por_dia,
    fecha_inicio,
    fecha_fin,
  } = data!;

  const isPositive = (comparativa_mes_anterior.variacion_porcentaje ?? 0) >= 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Month Selector Header */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-4 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
            <CalendarDays className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Ventas por Mes
            </h2>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest leading-none">
              {dayjs(fecha_inicio).format("DD MMM")} —{" "}
              {dayjs(fecha_fin).format("DD MMM, YYYY")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400 z-10 pointer-events-none" />
            <input
              type="month"
              value={mesSeleccionado}
              max={currentMonth}
              onChange={(e) => setMesSeleccionado(e.target.value)}
              className="w-[260px] bg-slate-950/60 border border-white/10 rounded-xl px-10 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all cursor-pointer shadow-inner font-bold appearance-none scheme-dark"
            />
          </div>
          {isFetching && (
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse ml-2" />
          )}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/30" />
          <CardContent className="p-6">
            <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">
              Ventas Mensuales
            </p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black text-white">
                {formatPricePEN(resumen.total_ventas)}
              </h3>
              {comparativa_mes_anterior.variacion_porcentaje !== null && (
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
                  {Math.abs(comparativa_mes_anterior.variacion_porcentaje)}%
                </div>
              )}
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              Mes anterior:{" "}
              {formatPricePEN(comparativa_mes_anterior.total_ventas_anterior)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/30" />
          <CardContent className="p-6">
            <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">
              Total Órdenes
            </p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black text-white">
                {resumen.total_ordenes}
              </h3>
              <ShoppingCart className="w-5 h-5 text-blue-400 opacity-30" />
            </div>
            <div className="flex gap-2 mt-2">
              <span className="text-[8px] font-bold text-emerald-400 uppercase">
                {resumen.ordenes_completadas} COMPLETAS
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
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-500/30" />
          <CardContent className="p-6">
            <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">
              Mejor Día
            </p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black text-white">
                Día {mejor_dia.dia}
              </h3>
              <Star className="w-5 h-5 text-amber-400 opacity-30 fill-amber-400/20" />
            </div>
            <p className="text-[10px] font-bold text-amber-400 mt-2">
              {formatPricePEN(mejor_dia.total)} —{" "}
              {dayjs(mejor_dia.fecha).format("DD MMM")}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/30" />
          <CardContent className="p-6">
            <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">
              Ticket Promedio
            </p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black text-white">
                {formatPricePEN(resumen.ticket_promedio)}
              </h3>
              <ReceiptText className="w-5 h-5 text-indigo-400 opacity-30" />
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              Promedio mensual por orden
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Payments and Weeks */}
        <div className="lg:col-span-1 space-y-6">
          {/* Payment Methods */}
          <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden rounded-2xl">
            <CardHeader className="border-b border-white/5 bg-white/2 p-4">
              <CardTitle className="text-xs font-black text-white flex items-center gap-2 uppercase tracking-tight">
                <Wallet className="w-4 h-4 text-orange-400" />
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

          {/* Breakdown by Weeks */}
          <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden rounded-2xl">
            <CardHeader className="border-b border-white/5 bg-white/2 p-4">
              <CardTitle className="text-xs font-black text-white flex items-center gap-2 uppercase tracking-tight">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                Desglose por Semana
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {desglose_por_semana.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/2 hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-white">
                      Semana {item.semana}
                    </span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase">
                      {item.total_ordenes} órdenes
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-cyan-400">
                      {formatPricePEN(item.total_ventas)}
                    </p>
                    <p className="text-[8px] font-bold text-emerald-500">
                      {item.ordenes_completadas} OK
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Daily Breakdown */}
        <div className="lg:col-span-3">
          <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden rounded-2xl h-full">
            <CardHeader className="border-b border-white/5 bg-white/2 p-4">
              <CardTitle className="text-xs font-black text-white flex items-center gap-2 uppercase tracking-tight">
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                Desglose Diario del Mes
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
                        Completas
                      </th>
                      <th className="px-6 py-4 text-right pr-10" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {desglose_por_dia.map((item, idx) => (
                      <tr
                        key={idx}
                        className="group hover:bg-white/2 transition-colors duration-300"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-orange-500/30 transition-all">
                              <span className="text-xs font-black text-slate-300 group-hover:text-orange-400">
                                {item.dia}
                              </span>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">
                              {dayjs(item.fecha).format("DD MMM")}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-black text-emerald-400 group-hover:text-emerald-300 transition-colors">
                            {formatPricePEN(item.total_ventas)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-xs font-black text-slate-400">
                            {item.total_ordenes}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center">
                            <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400">
                              {item.ordenes_completadas} OK
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right pr-10">
                          <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-orange-400 transition-all group-hover:translate-x-1" />
                        </td>
                      </tr>
                    ))}
                    {desglose_por_dia.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-20 text-center text-slate-500 font-bold italic"
                        >
                          No hay registros para este mes
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

export default MonthlySalesReport;
