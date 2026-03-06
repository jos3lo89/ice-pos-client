import { useState } from "react";
import { useHistorialSesiones } from "@/application/hooks/useReports";
import ErrorState from "@/presentation/components/ErrorState";
import LoadingState from "@/presentation/components/LoadingState";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import {
  Calendar as CalendarIcon,
  Filter,
  History,
  User,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import { formatPricePEN } from "@/utils/format-price";
import { Button } from "@/presentation/components/ui/button";
import { useNavigate } from "react-router-dom";

registerLocale("es", es);

const SessionsHistoryTable = () => {
  const today = new Date();
  const firstDayOfMonth = dayjs().startOf("month").toDate();
  const [startDate, setStartDate] = useState<Date | null>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | null>(today);
  const navigate = useNavigate();

  const fechaInicio = startDate
    ? dayjs(startDate).format("YYYY-MM-DD")
    : dayjs(today).format("YYYY-MM-DD");
  const fechaFin = endDate
    ? dayjs(endDate).format("YYYY-MM-DD")
    : dayjs(today).format("YYYY-MM-DD");

  const { data, isLoading, isError, refetch, isFetching } =
    useHistorialSesiones({
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
    });

  const sesiones = data?.sesiones ?? [];

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoadingState message="Cargando historial de sesiones..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-96 flex items-center justify-center">
        <ErrorState
          title="Error al cargar sesiones"
          message="No se pudo obtener el historial de sesiones."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-700">
      {/* Search/Filter Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end bg-slate-900/40 backdrop-blur-md border border-white/5 p-4 rounded-2xl shadow-xl">
        <div className="lg:col-span-2 space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-indigo-500 font-black flex items-center gap-2">
            <Filter className="w-3 h-3" />
            Filtro de Fechas
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 z-10 pointer-events-none" />
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                selectsStart
                startDate={startDate ?? undefined}
                endDate={endDate ?? undefined}
                maxDate={today}
                locale="es"
                dateFormat="dd 'de' MMMM, yyyy"
                placeholderText="Fecha inicio"
                portalId="root"
                popperClassName="z-[9999]"
                popperPlacement="bottom-start"
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-10 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600 cursor-pointer scheme-dark"
              />
            </div>
            <div className="h-px w-4 bg-slate-700 sm:block hidden" />
            <div className="relative w-full">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400 z-10 pointer-events-none" />
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                selectsEnd
                startDate={startDate ?? undefined}
                endDate={endDate ?? undefined}
                minDate={startDate ?? undefined}
                maxDate={today}
                locale="es"
                dateFormat="dd 'de' MMMM, yyyy"
                placeholderText="Fecha fin"
                portalId="root"
                popperClassName="z-[9999]"
                popperPlacement="bottom-start"
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-10 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-slate-600 cursor-pointer scheme-dark"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex items-center justify-end gap-3 pb-0.5">
          {isFetching && (
            <div className="text-xs text-indigo-400 font-bold animate-pulse">
              Actualizando datos...
            </div>
          )}
          <div className="px-4 py-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">
              Total Sesiones: {data?.total_sesiones}
            </span>
          </div>
        </div>
      </div>

      <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden rounded-2xl shadow-2xl">
        <CardHeader className="border-b border-white/5 bg-white/2 p-5 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-tighter">
            <History className="w-5 h-5 text-indigo-400" />
            Historial de Sesiones de Caja
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-950/40 border-b border-white/5">
                <TableRow className="hover:bg-transparent border-white/5">
                  <TableHead className="text-[10px] uppercase font-black text-slate-500 tracking-widest px-6 h-12">
                    Cajero
                  </TableHead>
                  <TableHead className="text-[10px] uppercase font-black text-slate-500 tracking-widest px-6 h-12">
                    Apertura / Cierre
                  </TableHead>
                  <TableHead className="text-[10px] uppercase font-black text-slate-500 tracking-widest px-6 h-12 text-right">
                    Ventas
                  </TableHead>
                  <TableHead className="text-[10px] uppercase font-black text-slate-500 tracking-widest px-6 h-12 text-right">
                    Saldo Real
                  </TableHead>
                  <TableHead className="text-[10px] uppercase font-black text-slate-500 tracking-widest px-6 h-12 text-center">
                    Estado
                  </TableHead>
                  <TableHead className="text-[10px] uppercase font-black text-slate-500 tracking-widest px-6 h-12 text-right">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sesiones.map((sesion) => (
                  <TableRow
                    key={sesion.id}
                    className="border-white/5 hover:bg-white/2 transition-colors duration-300 group"
                  >
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center border border-white/5 group-hover:border-indigo-500/30 transition-colors">
                          <User className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-white">
                            {sesion.cajero_nombre}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase">
                            @{sesion.cajero_usuario}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[10px] font-bold text-slate-300">
                            {dayjs(sesion.fecha_apertura).format(
                              "DD MMM, HH:mm",
                            )}
                          </span>
                        </div>
                        {sesion.fecha_cierre ? (
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            <span className="text-[10px] font-bold text-slate-500">
                              {dayjs(sesion.fecha_cierre).format(
                                "DD MMM, HH:mm",
                              )}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[9px] font-black text-indigo-400 uppercase animate-pulse ml-3.5 italic">
                            Abierta
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-black text-emerald-400">
                          {formatPricePEN(sesion.total_ventas)}
                        </span>
                        <span className="text-[9px] font-black text-slate-500 uppercase">
                          {sesion.total_ordenes} Órdenes
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      {sesion.estado === "cerrada" ? (
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-black text-white">
                            {formatPricePEN(sesion.saldo_real || 0)}
                          </span>
                          <div
                            className={cn(
                              "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase mt-1",
                              (sesion.diferencia || 0) >= 0
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-rose-500/10 text-rose-400",
                            )}
                          >
                            Diff: {formatPricePEN(sesion.diferencia || 0)}
                          </div>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-500 italic">
                          En curso...
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        {sesion.esta_cuadrada === true ? (
                          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-lg">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">
                              Cuadrada
                            </span>
                          </div>
                        ) : sesion.esta_cuadrada === false ? (
                          <div className="flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded-lg">
                            <XCircle className="w-3 h-3 text-rose-500" />
                            <span className="text-[9px] font-black text-rose-500 uppercase tracking-tighter">
                              Descuadre
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-tighter">
                              Pendiente
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          navigate(`/reportes/sesion/${sesion.id}`)
                        }
                        className="h-8 w-8 p-0 hover:bg-indigo-500/20 hover:text-indigo-400 text-slate-500 border border-transparent hover:border-indigo-500/30 rounded-lg transition-all"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {sesiones.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-40 text-center">
                      <div className="flex flex-col items-center justify-center gap-2 opacity-30">
                        <History className="w-10 h-10 text-slate-500" />
                        <p className="text-sm font-black text-slate-500 uppercase tracking-widest italic">
                          No se encontraron sesiones en este rango
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionsHistoryTable;
