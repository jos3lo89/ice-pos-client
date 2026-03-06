import { useState } from "react";
import { useHistorialSesiones } from "@/application/hooks/useReports";
import { useCashierUsers } from "@/application/hooks/useEmploye";
import ErrorState from "@/presentation/components/ErrorState";
import LoadingState from "@/presentation/components/LoadingState";
import Pagination from "@/presentation/components/Pagination";
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
  History,
  User,
  CheckCircle2,
  XCircle,
  Users,
  Search,
  ShoppingCart,
  MoreVertical,
  Receipt,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import { formatPricePEN } from "@/utils/format-price";
import { Button } from "@/presentation/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/components/ui/dropdown-menu";

registerLocale("es", es);

const SessionsHistoryTable = () => {
  const today = new Date();
  const firstDayOfMonth = dayjs().startOf("month").toDate();

  // States for query
  const [startDate, setStartDate] = useState<Date | null>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | null>(today);
  const [cajeroId, setCajeroId] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const navigate = useNavigate();

  // Queries
  const { data: cashierUsers } = useCashierUsers();

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
      page,
      limit,
      cajero_id: cajeroId === "all" ? null : cajeroId,
    });

  const sesiones = data?.sesiones ?? [];
  const meta = data?.meta;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleCajeroChange = (value: string) => {
    setCajeroId(value);
    setPage(1); // Reset to first page when filter changes
  };

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
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Search/Filter Bar */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-4 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center gap-3 border-b border-white/5 pb-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <Search className="w-4 h-4 text-indigo-400" />
          </div>
          <h3 className="text-sm font-black text-white uppercase tracking-wider">
            Parámetros de Búsqueda
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
          {/* Fechas */}
          <div className="lg:col-span-5 space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold flex items-center gap-2">
              <CalendarIcon className="w-3.5 h-3.5 text-indigo-400" />
              Rango de Fechas
            </label>
            <div className="flex items-center gap-2 bg-slate-950/40 p-1.5 rounded-xl border border-white/5 transition-all focus-within:border-indigo-500/30">
              <div className="relative flex-1">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => {
                    setStartDate(date);
                    setPage(1);
                  }}
                  selectsStart
                  startDate={startDate ?? undefined}
                  endDate={endDate ?? undefined}
                  maxDate={today}
                  locale="es"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Inicio"
                  portalId="root"
                  popperClassName="z-[9999]"
                  popperPlacement="bottom-start"
                  className="w-full bg-transparent border-none px-3 py-1.5 text-xs text-slate-200 focus:outline-none cursor-pointer scheme-dark"
                />
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="relative flex-1">
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => {
                    setEndDate(date);
                    setPage(1);
                  }}
                  selectsEnd
                  startDate={startDate ?? undefined}
                  endDate={endDate ?? undefined}
                  minDate={startDate ?? undefined}
                  maxDate={today}
                  locale="es"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Fin"
                  portalId="root"
                  popperClassName="z-[9999]"
                  popperPlacement="bottom-start"
                  className="w-full bg-transparent border-none px-3 py-1.5 text-xs text-slate-200 focus:outline-none cursor-pointer scheme-dark"
                />
              </div>
            </div>
          </div>

          {/* Cajero */}
          <div className="lg:col-span-4 space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              Filtrar por Cajero
            </label>
            <Select value={cajeroId} onValueChange={handleCajeroChange}>
              <SelectTrigger className="w-full bg-slate-950/60 border-white/10 rounded-xl h-11 text-xs text-slate-200 focus:ring-indigo-500/50">
                <div className="flex items-center gap-2">
                  <SelectValue placeholder="Todos los cajeros" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-slate-200">
                <SelectItem
                  value="all"
                  className="text-xs hover:bg-white/5 transition-colors"
                >
                  Todos los cajeros
                </SelectItem>
                {cashierUsers?.map((user) => (
                  <SelectItem
                    key={user.id}
                    value={user.id}
                    className="text-xs hover:bg-white/5 transition-colors"
                  >
                    {user.nombre_completo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Estado/Info */}
          <div className="lg:col-span-3 flex items-center justify-end gap-3 pb-1">
            {isFetching && (
              <div className="flex items-center gap-2 bg-indigo-500/10 px-3 py-2 rounded-xl border border-indigo-500/20">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[9px] font-black text-indigo-400 uppercase">
                  Sincronizando...
                </span>
              </div>
            )}
            <div className="bg-cyan-500/10 px-3 py-2 rounded-xl border border-cyan-500/20">
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-tighter">
                Total: {data?.total_sesiones}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden rounded-2xl shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 via-cyan-500 to-indigo-500 opacity-30" />
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
                    Estado Final
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
                          <span className="text-sm font-black text-white group-hover:text-indigo-200 transition-colors">
                            {sesion.cajero_nombre}
                          </span>
                          {/* <span className="text-[10px] font-bold text-slate-500 uppercase">
                            @{sesion.cajero_usuario}
                          </span> */}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full border border-emerald-500/50 bg-emerald-500/20" />
                          <span className="text-[10px] font-bold text-slate-300">
                            {dayjs(sesion.fecha_apertura).format(
                              "DD MMM, HH:mm",
                            )}
                          </span>
                        </div>
                        {sesion.fecha_cierre ? (
                          <div className="flex items-center gap-2 text-slate-500">
                            <div className="w-2 h-2 rounded-full border border-rose-500/50 bg-rose-500/20" />
                            <span className="text-[10px] font-bold">
                              {dayjs(sesion.fecha_cierre).format(
                                "DD MMM, HH:mm",
                              )}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 ml-0.5">
                            <div className="w-1 h-3 bg-indigo-500 animate-pulse rounded-full" />
                            <span className="text-[9px] font-black text-indigo-400 uppercase italic tracking-tighter">
                              En Curso
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-[13px] font-black text-emerald-400">
                          {formatPricePEN(sesion.total_ventas)}
                        </span>
                        <div className="flex items-center gap-1 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                          <ShoppingCart className="w-3 h-3 text-slate-500" />
                          <span className="text-[9px] font-black text-slate-400 uppercase">
                            {sesion.total_ordenes} Órdenes
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      {sesion.estado === "cerrada" ||
                      sesion.estado === "CERRADA" ? (
                        <div className="flex flex-col items-end">
                          <span className="text-[13px] font-black text-white">
                            {formatPricePEN(sesion.saldo_real || 0)}
                          </span>
                          <div
                            className={cn(
                              "text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase mt-1 border",
                              (sesion.diferencia || 0) >= 0
                                ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                                : "bg-rose-500/5 border-rose-500/20 text-rose-400",
                            )}
                          >
                            Diff: {(sesion.diferencia || 0) > 0 ? "+" : ""}
                            {formatPricePEN(sesion.diferencia || 0)}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                          <span className="text-[10px] text-slate-500 italic font-bold">
                            Sin cierre
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex justify-center">
                        {sesion.esta_cuadrada === true ? (
                          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-xl shadow-lg shadow-emerald-900/10">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tight">
                              Cuadrada
                            </span>
                          </div>
                        ) : sesion.esta_cuadrada === false ? (
                          <div className="flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-xl shadow-lg shadow-rose-900/10">
                            <XCircle className="w-3.5 h-3.5 text-rose-500" />
                            <span className="text-[9px] font-black text-rose-500 uppercase tracking-tight">
                              Descuadre
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 bg-slate-800/50 border border-white/5 px-2.5 py-1 rounded-xl opacity-60">
                            <History className="w-3.5 h-3.5 text-slate-500" />
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-tight">
                              Abierta
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 rounded-lg transition-all focus-visible:ring-cyan-500 shadow-sm"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="end"
                          className="bg-[#1e293b] border-slate-700 text-slate-200 w-64 shadow-2xl p-1.5 rounded-xl border backdrop-blur-md"
                        >
                          <DropdownMenuLabel className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] px-3 py-2">
                            Acciones de Sesión
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-slate-700/50 mx-1" />

                          <DropdownMenuItem
                            onClick={() =>
                              navigate(
                                `/reportes/historial-sesiones/${sesion.id}/pagos`,
                              )
                            }
                            className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-cyan-500/10 hover:text-cyan-400 focus:bg-cyan-500/10 focus:text-cyan-400 gap-3 transition-colors text-sm font-semibold"
                          >
                            <Receipt className="w-4 h-4" />
                            <span>Ver historial de pagos</span>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() =>
                              navigate(
                                `/reportes/historial-sesiones/${sesion.id}/ordenes`,
                              )
                            }
                            className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-blue-500/10 hover:text-blue-400 focus:bg-blue-500/10 focus:text-blue-400 gap-3 transition-colors text-sm font-semibold"
                          >
                            <History className="w-4 h-4" />
                            <span>Historial de órdenes</span>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() =>
                              navigate(
                                `/reportes/historial-sesiones/${sesion.id}/reporte`,
                              )
                            }
                            className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-yellow-500/10 hover:text-yellow-400 focus:bg-yellow-500/10 focus:text-yellow-400 gap-3 transition-colors text-sm font-semibold"
                          >
                            <FileText className="w-4 h-4" />
                            <span>Reporte de la sesión</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {sesiones.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center gap-4 py-10 opacity-40">
                        <div className="p-6 bg-slate-800/50 rounded-full border border-white/5">
                          <History className="w-16 h-16 text-slate-600" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-base font-black text-slate-400 uppercase tracking-widest leading-none">
                            No se encontraron resultados
                          </p>
                          <p className="text-xs font-bold text-slate-600 italic">
                            Intenta ajustar los filtros de fecha o cajero
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        {/* Pagination Section */}
        {meta && meta.lastPage > 1 && (
          <div className="p-6 border-t border-white/5 bg-slate-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Mostrando página{" "}
              <span className="text-white font-black">{meta.page}</span> de{" "}
              <span className="text-white font-black">{meta.lastPage}</span>
            </p>
            <Pagination
              currentPage={meta.page}
              totalPages={meta.lastPage}
              onPageChange={handlePageChange}
              hasNext={meta.hasNext}
              hasPrev={meta.hasPrev}
            />
          </div>
        )}
      </Card>

      <style>{`
        .react-datepicker {
          background-color: #0f172a !important;
          border-color: rgba(255,255,255,0.1) !important;
          color: #e2e8f0 !important;
          font-family: inherit !important;
          border-radius: 1rem !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
        }
        .react-datepicker__header {
          background-color: #1e293b !important;
          border-bottom-color: rgba(255,255,255,0.05) !important;
          border-top-left-radius: 1rem !important;
          border-top-right-radius: 1rem !important;
          padding-top: 15px !important;
        }
        .react-datepicker__current-month, 
        .react-datepicker__day-name, 
        .react-datepicker-time__header {
          color: #94a3b8 !important;
          font-weight: 900 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.1em !important;
          font-size: 0.7rem !important;
        }
        .react-datepicker__day {
          color: #e2e8f0 !important;
          border-radius: 0.5rem !important;
          transition: all 0.2s !important;
        }
        .react-datepicker__day:hover {
          background-color: rgba(99, 102, 241, 0.2) !important;
          color: #818cf8 !important;
        }
        .react-datepicker__day--selected, 
        .react-datepicker__day--in-range {
          background-color: #6366f1 !important;
          color: white !important;
          font-weight: 800 !important;
        }
        .react-datepicker__day--keyboard-selected {
          background-color: rgba(99, 102, 241, 0.5) !important;
        }
        .react-datepicker__day--disabled {
          color: #334155 !important;
        }
        .react-datepicker__navigation--next { border-left-color: #94a3b8 !important; }
        .react-datepicker__navigation--previous { border-right-color: #94a3b8 !important; }
      `}</style>
    </div>
  );
};

export default SessionsHistoryTable;
