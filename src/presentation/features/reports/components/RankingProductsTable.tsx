import { useState } from "react";
import { useRankingProducts } from "@/application/hooks/useReports";
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
  Trophy,
  Calendar as CalendarIcon,
  Filter,
  TrendingUp,
  Package,
  Tag,
  Loader2,
  Download,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import RankingProductsPdf from "../pdf/RankingProductsPdf";
import { Button } from "@/presentation/components/ui/button";
import { formatPricePEN } from "@/utils/format-price";

registerLocale("es", es);

const RankingProductsTable = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState<Date | null>(today);
  const [endDate, setEndDate] = useState<Date | null>(today);

  const fechaInicio = startDate
    ? dayjs(startDate).format("YYYY-MM-DD")
    : dayjs(today).format("YYYY-MM-DD");
  const fechaFin = endDate
    ? dayjs(endDate).format("YYYY-MM-DD")
    : dayjs(today).format("YYYY-MM-DD");

  const {
    data: rankingData,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useRankingProducts({
    fecha_inicio: fechaInicio,
    fecha_fin: fechaFin,
  });

  const ranking = rankingData?.ranking ?? [];

  const handleOpenInNewTab = async () => {
    if (!rankingData) return;
    const blob = await pdf(RankingProductsPdf({ data: rankingData })).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    URL.revokeObjectURL(url);
  };

  const pdfFileName = `ranking-productos-${fechaInicio}-${fechaFin}.pdf`;

  return (
    <div className="space-y-3 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 items-end bg-slate-900/40 backdrop-blur-md border border-white/5 p-3 rounded-xl shadow-xl">
        <div className="lg:col-span-2 space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-emerald-500 font-black flex items-center gap-2">
            <Filter className="w-3 h-3" />
            Rango de Fechas
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400 z-10 pointer-events-none" />
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
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-10 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all placeholder:text-slate-600 cursor-pointer"
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
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-10 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-slate-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-1" />

        <div className="lg:col-span-1">
          {isFetching && !isLoading && (
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold animate-pulse justify-end">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              Actualizando datos...
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <LoadingState message="Analizando ranking de ventas..." />
        </div>
      ) : isError ? (
        <div className="h-96 flex items-center justify-center">
          <ErrorState
            title="Error en reportes"
            message="No se pudo procesar la información del ranking en el rango seleccionado."
            onRetry={refetch}
          />
        </div>
      ) : (
        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 shadow-2xl overflow-hidden rounded-xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-500/50 via-cyan-500/50 to-emerald-500/50" />

          <CardHeader className="px-4 border-b border-white/5 bg-slate-900/20">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-inner">
                  <Trophy className="w-6 h-6 text-emerald-400 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-xl font-black text-white tracking-tight">
                    Ranking de Productos
                  </CardTitle>
                  <p className="text-slate-400 text-xs uppercase tracking-widest font-bold font-mono">
                    {ranking.length} productos analizados
                  </p>
                </div>
              </div>
              <div>
                {rankingData && ranking.length > 0 && (
                  <div className="flex items-center gap-2">
                    <PDFDownloadLink
                      document={<RankingProductsPdf data={rankingData} />}
                      fileName={pdfFileName}
                    >
                      {({ loading: pdfLoading }) => (
                        <Button
                          disabled={pdfLoading}
                          size="sm"
                          className="h-9 px-4 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-95 gap-2 cursor-pointer disabled:opacity-60"
                        >
                          {pdfLoading ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              Generando...
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" />
                              Descargar PDF
                            </>
                          )}
                        </Button>
                      )}
                    </PDFDownloadLink>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleOpenInNewTab}
                      className="h-9 px-3 rounded-xl border-slate-700 bg-slate-800/50 text-slate-300 font-bold hover:bg-slate-700 hover:text-white transition-all active:scale-95 gap-2"
                      title="Abrir en nueva pestaña"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-xs">Ver PDF</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-900/50">
                  <TableRow className="border-white/5 hover:bg-transparent tracking-widest uppercase">
                    <TableHead className="text-[10px] font-black text-slate-500 py-6 pl-8 w-[80px]">
                      #
                    </TableHead>
                    <TableHead className="text-[10px] font-black text-slate-500 py-6">
                      Producto
                    </TableHead>
                    <TableHead className="text-[10px] font-black text-slate-500 py-6">
                      Categoría
                    </TableHead>
                    <TableHead className="text-[10px] font-black text-slate-500 py-6 text-center">
                      Cantidad
                    </TableHead>
                    <TableHead className="text-[10px] font-black text-slate-500 py-6 text-right">
                      Recaudado
                    </TableHead>
                    {/* <TableHead className="text-[10px] font-black text-slate-500 py-6 text-right pr-8">
                      Órdenes
                    </TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ranking.length > 0 ? (
                    ranking.map((item, index) => (
                      <TableRow
                        key={item.producto_id}
                        className="border-white/5 hover:bg-white/5 transition-colors duration-300 group cursor-default"
                      >
                        <TableCell className="py-6 pl-8">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs transition-all duration-500",
                              index === 0 &&
                                "bg-yellow-500/20 text-yellow-400 scale-110 shadow-[0_0_15px_rgba(234,179,8,0.2)]",
                              index === 1 && "bg-slate-400/20 text-slate-300",
                              index === 2 && "bg-orange-600/20 text-orange-400",
                              index > 2 &&
                                "bg-slate-800 text-slate-500 group-hover:bg-emerald-500/10 group-hover:text-emerald-400",
                            )}
                          >
                            {index + 1}
                          </div>
                        </TableCell>
                        <TableCell className="py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-white/5 group-hover:border-emerald-500/30 transition-colors">
                              <Package className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                            </div>
                            <span className="font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                              {item.nombre}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-6">
                          <div className="flex items-center gap-2">
                            <Tag className="w-3.5 h-3.5 text-cyan-500 group-hover:text-cyan-400" />
                            <span className="text-slate-400 font-medium group-hover:text-slate-300 transition-colors">
                              {item.categoria}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-6 text-center">
                          <div className="inline-flex items-center gap-2 bg-slate-950/40 px-3 py-1.5 rounded-lg border border-white/5 group-hover:border-emerald-500/20 transition-all">
                            <TrendingUp className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-400 font-black font-mono">
                              {item.cantidad_vendida}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-6 text-right">
                          <div className="flex flex-col items-end">
                            <span className="text-white font-black font-mono">
                              {formatPricePEN(item.total_recaudado)}
                            </span>
                            <div className="h-0.5 w-8 bg-emerald-500/20 rounded-full mt-1 group-hover:w-full transition-all duration-700" />
                          </div>
                        </TableCell>
                        {/* <TableCell className="py-6 text-right pr-8">
                          <div className="flex items-center justify-end gap-2 text-slate-500 group-hover:text-slate-300">
                            <span className="text-xs font-bold">
                              {item.numero_ordenes}
                            </span>
                            <ShoppingCart className="w-3.5 h-3.5" />
                          </div>
                        </TableCell> */}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center gap-4 text-slate-500">
                          <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-white/5">
                            <TrendingUp className="w-8 h-8 opacity-20" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-bold text-slate-400">
                              Sin registros disponibles
                            </p>
                            <p className="text-xs max-w-xs mx-auto">
                              No se encontraron productos vendidos dentro del
                              rango de fechas seleccionado.
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
        </Card>
      )}

      {/* Style overrides for react-datepicker to match theme */}
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
          background-color: rgba(16, 185, 129, 0.2) !important;
          color: #34d399 !important;
        }
        .react-datepicker__day--selected, 
        .react-datepicker__day--in-range {
          background-color: #10b981 !important;
          color: white !important;
          font-weight: 800 !important;
        }
        .react-datepicker__day--keyboard-selected {
          background-color: rgba(16, 185, 129, 0.5) !important;
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

export default RankingProductsTable;
