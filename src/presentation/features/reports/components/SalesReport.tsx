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
  Download,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { formatPricePEN } from "@/utils/format-price";
import { cn } from "@/lib/utils";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import dayjs from "dayjs";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import DailySalesPdf from "../pdf/SalesPdf";
import { Button } from "@/presentation/components/ui/button";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

// const SalesReport = () => {
//   return (
//     <div>SalesReport</div>
//   )
// }
// export default SalesReport

const SalesReport = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState<Date | null>(today);
  const [endDate, setEndDate] = useState<Date | null>(today);

  const fechaInicioStr = startDate
    ? dayjs(startDate).format("YYYY-MM-DD")
    : dayjs(today).format("YYYY-MM-DD");
  const fechaFinStr = endDate
    ? dayjs(endDate).format("YYYY-MM-DD")
    : dayjs(today).format("YYYY-MM-DD");

  const { data, isLoading, isError, refetch, isFetching } = useVentasPorDia({
    fecha_inicio: fechaInicioStr,
    fecha_fin: fechaFinStr,
  });

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoadingState message="Generando reporte operativo..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-96 flex items-center justify-center">
        <ErrorState
          title="Error en reporte operativo"
          message="No se pudo obtener la información de ventas para el rango seleccionado."
          onRetry={refetch}
        />
      </div>
    );
  }

  const {
    resumen,
    ventas_por_metodo,
    ventas_por_tipo_orden,
    movimientos_manuales,
  } = data!;

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleOpenInNewTab = async () => {
    if (!data) return;
    const blob = await pdf(<DailySalesPdf data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    URL.revokeObjectURL(url);
  };

  const pdfFileName = `reporte-operativo-${fechaInicioStr}-a-${fechaFinStr}.pdf`;

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Date Selector Header */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-4 rounded-2xl shadow-xl flex flex-col xl:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <LayoutDashboard className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Reporte Operativo
            </h2>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest leading-none">
              Resumen de Ventas y Caja
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 flex-1 justify-end w-full">
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-slate-950/40 p-1.5 rounded-2xl border border-white/5 w-full md:w-auto">
            <div className="relative w-full sm:w-[190px]">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-400 z-10 pointer-events-none" />
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                maxDate={today}
                locale="es"
                dateFormat="dd/MM/yyyy"
                placeholderText="Inicio"
                portalId="root"
                popperClassName="z-[9999]"
                popperPlacement="bottom-start"
                className="w-full bg-transparent border-none px-9 py-2 text-xs text-slate-200 focus:outline-none cursor-pointer scheme-dark"
              />
            </div>
            <div className="h-px w-4 bg-slate-800 hidden sm:block" />
            <div className="relative w-full sm:w-[190px]">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cyan-400 z-10 pointer-events-none" />
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                // minDate={startDate}
                maxDate={today}
                locale="es"
                dateFormat="dd/MM/yyyy"
                placeholderText="Fin"
                portalId="root"
                popperClassName="z-[9999]"
                popperPlacement="bottom-start"
                className="w-full bg-transparent border-none px-9 py-2 text-xs text-slate-200 focus:outline-none cursor-pointer scheme-dark"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isFetching && (
              <Loader2 className="w-4 h-4 text-indigo-500 animate-spin mr-2" />
            )}
            {data && (
              <div className="flex items-center gap-2">
                <PDFDownloadLink
                  document={<DailySalesPdf data={data} />}
                  fileName={pdfFileName}
                >
                  {({ loading: pdfLoading }) => (
                    <Button
                      disabled={pdfLoading}
                      size="sm"
                      className="h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-95 gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {pdfLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                      <span className="hidden sm:inline text-xs uppercase tracking-tighter">
                        PDF
                      </span>
                    </Button>
                  )}
                </PDFDownloadLink>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleOpenInNewTab}
                  className="h-10 px-3 rounded-xl border-white/10 bg-white/5 text-slate-300 font-bold hover:bg-white/10 hover:text-white transition-all active:scale-95 gap-2"
                  title="Ver PDF"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/30" />
          <CardContent className="p-6">
            <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">
              Ingresos por Ventas
            </p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black text-white">
                {formatPricePEN(resumen.total_ventas)}
              </h3>
              {/* <div className="bg-emerald-500/10 text-emerald-400 flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg">
                <TrendingUp className="w-3 h-3" />
                Ventas OK
              </div> */}
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              Total recaudado de órdenes cerradas
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/30" />
          <CardContent className="p-6">
            <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">
              Registro de Órdenes
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
              <span className="text-[8px] font-bold text-amber-400 uppercase">
                {resumen.ordenes_pendientes} PEND
              </span>
              <span className="text-[8px] font-bold text-slate-500 uppercase">
                /
              </span>
              <span className="text-[8px] font-bold text-rose-400 uppercase">
                {resumen.ordenes_canceladas} CANC
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/30" />
          <CardContent className="p-6">
            <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">
              Balance en Caja
            </p>
            <h3 className="text-2xl font-black text-white">
              {formatPricePEN(
                resumen.total_ventas +
                  movimientos_manuales.ingresos -
                  movimientos_manuales.egresos -
                  movimientos_manuales.gastos,
              )}
            </h3>
            <p className="text-[10px] text-slate-500 mt-2">
              Efectivo + Digital + Movimientos
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

export default SalesReport;
