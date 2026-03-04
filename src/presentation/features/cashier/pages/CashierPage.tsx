import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/presentation/components/ui/card";
import {
  Wallet,
  TrendingUp,
  Smartphone,
  CreditCard,
  Calendar,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Ban,
  Receipt,
  PiggyBank,
  Plus,
  ArrowUp,
  ArrowDown,
  Activity,
  ChevronDown,
  History,
  LogOut,
  Database,
  ArrowRightLeft,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/components/ui/dropdown-menu";
import { Badge } from "@/presentation/components/ui/badge";
import { Button } from "@/presentation/components/ui/button";
import { Skeleton } from "@/presentation/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { OpenSessionDialog } from "../components/OpenSessionDialog";
import { CloseSessionDialog } from "../components/CloseSessionDialog";
import { formatDateTime } from "@/utils/format-date-time";
import { formatPricePEN } from "@/utils/format-price";
import { useNavigate } from "react-router-dom";
import { useCurrentSession } from "@/application/hooks/useCashier";
import CreateCashMovement from "../../cash-movement/components/CreateCashMovement";

const CashierPage = () => {
  const { data: sessionData, isLoading, isError } = useCurrentSession();
  const [isOpenDialogOpen, setIsOpenDialogOpen] = useState(false);
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);
  const [isMovementDialogOpen, setIsMovementDialogOpen] = useState(false);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <header className="flex justify-between items-end">
          <div className="space-y-2">
            <Skeleton className="h-10 w-48 bg-slate-800" />
            <Skeleton className="h-4 w-64 bg-slate-800" />
          </div>
          <Skeleton className="h-11 w-36 bg-slate-800" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className="h-32 w-full bg-slate-800 rounded-2xl"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-[400px] lg:col-span-2 bg-slate-800 rounded-3xl" />
          <Skeleton className="h-[400px] bg-slate-800 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (isError || !sessionData) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
          <Ban className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">
          Error al cargar la sesión
        </h2>
        <p className="text-gray-400 max-w-md">
          No se pudo obtener la información de la caja actual. Por favor,
          intenta de nuevo o contacta al administrador.
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Reintentar
        </Button>
      </div>
    );
  }

  const { hasActiveSession, session } = sessionData;

  if (!hasActiveSession) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 animate-pulse" />
          <div className="relative w-32 h-32 rounded-3xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Wallet className="w-16 h-16 text-emerald-500" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-4xl font-black text-white tracking-tight">
            Caja Cerrada
          </h2>
          <p className="text-gray-400 max-w-md text-lg">
            No tienes una sesión de caja abierta en este momento. Abre una nueva
            caja para empezar a registrar ventas.
          </p>
        </div>

        <Button
          onClick={() => setIsOpenDialogOpen(true)}
          className="h-14 px-10 rounded-2xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-lg shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 gap-3 cursor-pointer"
        >
          <Plus className="w-6 h-6" />
          Aperturar Caja
        </Button>

        <OpenSessionDialog
          isOpen={isOpenDialogOpen}
          onOpenChange={setIsOpenDialogOpen}
        />
      </div>
    );
  }

  const handleNavigateToSessionPayments = () => {
    navigate(`/pagos/${session.id}`);
  };

  const handleNavigateToMovementsHistory = () => {
    navigate(`/historial-movimientos/${session.id}`);
  };

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/20 px-3 py-1 font-bold tracking-wide uppercase text-[10px]">
              Sesión Activa
            </Badge>
            <div className="flex items-center text-gray-500 text-xs gap-2 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {formatDateTime(session.fecha_apertura, "date")}
            </div>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-10 px-4 rounded-xl border-slate-700/50 bg-slate-800/40 text-slate-300 font-bold hover:bg-slate-700/60 hover:text-white transition-all shadow-lg active:scale-95 gap-2 backdrop-blur-sm"
              >
                <History className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Historiales</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 bg-[#1e293b] border-slate-700 text-slate-200 p-1.5 rounded-2xl shadow-2xl backdrop-blur-md"
            >
              <DropdownMenuLabel className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] px-3 py-2">
                Consultas y Registros
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-700/50" />

              <DropdownMenuItem
                onClick={handleNavigateToSessionPayments}
                className="cursor-pointer rounded-xl px-3 py-2.5 hover:bg-cyan-500/10 hover:text-cyan-400 focus:bg-cyan-500/10 focus:text-cyan-400 gap-3 transition-colors text-sm font-semibold"
              >
                <Receipt className="w-4 h-4" />
                <span>Pagos de esta Sesión</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleNavigateToMovementsHistory}
                className="cursor-pointer rounded-xl px-3 py-2.5 hover:bg-amber-500/10 hover:text-amber-400 focus:bg-amber-500/10 focus:text-amber-400 gap-3 transition-colors text-sm font-semibold"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>Movimientos de la Sesión</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-slate-700/50" />

              <DropdownMenuItem
                onClick={() => navigate("/historial-caja")}
                className="cursor-pointer rounded-xl px-3 py-2.5 hover:bg-blue-500/10 hover:text-blue-400 focus:bg-blue-500/10 focus:text-blue-400 gap-3 transition-colors text-sm font-semibold"
              >
                <Database className="w-4 h-4" />
                <span>Historial General de Sesiones</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            className="h-10 px-4 rounded-xl border-cyan-500/20 bg-cyan-500/5 text-cyan-400 font-bold hover:bg-cyan-500/10 hover:text-cyan-300 transition-all shadow-lg active:scale-95 gap-2"
            onClick={() => setIsMovementDialogOpen(true)}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Crear Movimiento</span>
          </Button>

          <Button
            onClick={() => setIsCloseDialogOpen(true)}
            className="h-10 px-4 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 font-black hover:bg-rose-500 hover:text-white transition-all shadow-lg shadow-rose-900/10 cursor-pointer gap-2 active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Caja</span>
          </Button>
        </div>

        <CreateCashMovement
          isOpen={isMovementDialogOpen}
          onOpenChange={setIsMovementDialogOpen}
        />

        <CloseSessionDialog
          isOpen={isCloseDialogOpen}
          onOpenChange={setIsCloseDialogOpen}
          sessionId={session.id}
          expectedBalance={session.caja_fisica.saldo_esperado}
        />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ventas Totales"
          value={formatPricePEN(session.resumen.total_ventas)}
          icon={TrendingUp}
          description="Ventas brutas hoy"
          variant="primary"
        />
        <StatCard
          title="En Efectivo"
          value={formatPricePEN(session.resumen.total_efectivo)}
          icon={Wallet}
          description="Dinero en caja física"
          variant="emerald"
        />
        <StatCard
          title="Pagos Digitales"
          value={formatPricePEN(session.resumen.total_digital)}
          icon={Smartphone}
          description="Apps y Transferencias"
          variant="blue"
        />
        <StatCard
          title="Saldo Esperado"
          value={formatPricePEN(session.caja_fisica.saldo_esperado)}
          icon={ShieldCheck}
          description="Incluye saldo apertura"
          variant="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <Card className="bg-[#1e293b]/50 border-slate-700/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl">
            <CardHeader className="border-b border-slate-700/30 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-white">
                    Desglose de Ventas
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Distribución por métodos de pago
                  </CardDescription>
                </div>
                <Receipt className="w-6 h-6 text-slate-500" />
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PaymentDetail
                  label="Efectivo"
                  amount={session.caja_fisica.ventas_efectivo}
                  icon={Wallet}
                  colorClass="text-emerald-400"
                  percentage={
                    (session.caja_fisica.ventas_efectivo /
                      (session.resumen.total_ventas || 1)) *
                    100
                  }
                />
                {/* Digital Payments */}
                <PaymentDetail
                  label="Yape"
                  amount={session.ventas_digitales.yape}
                  icon={Smartphone}
                  colorClass="text-purple-400"
                  percentage={
                    (session.ventas_digitales.yape /
                      (session.resumen.total_ventas || 1)) *
                    100
                  }
                />
                <PaymentDetail
                  label="Plin"
                  amount={session.ventas_digitales.plin}
                  icon={Smartphone}
                  colorClass="text-cyan-400"
                  percentage={
                    (session.ventas_digitales.plin /
                      (session.resumen.total_ventas || 1)) *
                    100
                  }
                />
                <PaymentDetail
                  label="Tarjeta"
                  amount={session.ventas_digitales.tarjeta}
                  icon={CreditCard}
                  colorClass="text-cyan-400"
                  percentage={
                    (session.ventas_digitales.tarjeta /
                      (session.resumen.total_ventas || 1)) *
                    100
                  }
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#1e293b]/50 border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-slate-600 shadow-inner">
                  <span className="text-xl font-bold text-white">
                    {session.cajero.nombre.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] text-cyan-500 font-black uppercase tracking-widest">
                    Cajero Responsable
                  </p>
                  <h3 className="text-lg font-bold text-white">
                    {session.cajero.nombre}
                  </h3>
                </div>
              </div>
            </Card>

            <Card className="bg-[#1e293b]/50 border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Clock className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">
                    Apertura
                  </p>
                  <h3 className="text-lg font-bold text-white">
                    {formatDateTime(session.fecha_apertura, "time")}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Hace {getTimeDifference(session.fecha_apertura)}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-linear-to-br from-slate-800 to-slate-900 border-slate-700/50 rounded-xl overflow-hidden shadow-2xl border-t border-t-white/5">
            <CardHeader className="border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <PiggyBank className="w-6 h-6 text-emerald-400" />
                </div>
                <CardTitle className="text-xl font-black text-white tracking-tight">
                  Caja Física
                </CardTitle>
                <CardDescription className="text-slate-400" />
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-6">
                <PhysicsRow
                  label="Saldo Inicial"
                  value={session.caja_fisica.saldo_apertura}
                  sub="Monto al abrir caja"
                />
                <PhysicsRow
                  label="Ventas Efectivo"
                  value={session.caja_fisica.ventas_efectivo}
                  sub="Ingresos en billetes/monedas"
                />
                <div className="pt-6 mt-6 border-t border-slate-700/50">
                  <div className="flex justify-between flex-col gap-2 items-end">
                    <span className="text-xl font-bold text-white">
                      Total Esperado
                    </span>
                    <span className="text-3xl font-black text-emerald-400">
                      {formatPricePEN(session.caja_fisica.saldo_esperado)}
                    </span>
                  </div>
                </div>
              </div>

              {session.notas && (
                <div className="mt-10 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">
                    Notas de Apertura
                  </p>
                  <p className="text-sm text-slate-300 italic">
                    "{session.notas}"
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#1e293b]/50 border-slate-700/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl">
            <CardHeader className="border-b border-slate-700/30 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-white">
                      Movimientos Manuales
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Entradas y salidas manuales
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-900/30 rounded-2xl border border-slate-800/50 group hover:border-emerald-500/30 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowUp className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Ingresos
                      </p>
                      <h4 className="text-lg font-black text-white">
                        {formatPricePEN(
                          session.movimientos_manuales.total_ingresos,
                        )}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-900/30 rounded-2xl border border-slate-800/50 group hover:border-red-500/30 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowDown className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Egresos
                      </p>
                      <h4 className="text-lg font-black text-white">
                        {formatPricePEN(
                          session.movimientos_manuales.total_egresos,
                        )}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, description, variant }: any) => {
  const themes: any = {
    primary: "bg-linear-to-br from-cyan-600 to-blue-600 shadow-cyan-900/20",
    emerald: "bg-[#1e293b]/50 border-emerald-500/20 shadow-emerald-950/20",
    blue: "bg-[#1e293b]/50 border-blue-500/20 shadow-blue-950/20",
    purple: "bg-[#1e293b]/50 border-purple-500/20 shadow-purple-950/20",
  };

  return (
    <Card
      className={cn(
        "rounded-xl border transition-all hover:scale-[1.02] duration-300 group overflow-hidden",
        themes[variant] || themes.primary,
        variant !== "primary" ? "border-slate-700/50" : "border-none",
      )}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p
              className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                variant === "primary" ? "text-white/60" : "text-slate-500",
              )}
            >
              {title}
            </p>
            <h3
              className={cn(
                "text-2xl font-black tracking-tight",
                variant === "primary" ? "text-white" : "text-white",
              )}
            >
              {value}
            </h3>
          </div>
          <div
            className={cn(
              "p-3 rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-6",
              variant === "primary"
                ? "bg-white/10 text-white"
                : "bg-slate-800 text-slate-300 border border-slate-700",
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <ArrowUpRight
            className={cn(
              "w-3.5 h-3.5",
              variant === "primary" ? "text-white/70" : "text-emerald-500",
            )}
          />
          <p
            className={cn(
              "text-[10px] font-medium",
              variant === "primary" ? "text-white/60" : "text-slate-500",
            )}
          >
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const PaymentDetail = ({
  label,
  amount,
  icon: Icon,
  colorClass,
  percentage,
}: any) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "p-2 rounded-lg bg-slate-800/80 border border-slate-700",
          colorClass,
        )}
      >
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-sm font-bold text-slate-300">{label}</span>
    </div>
    <div className="space-y-1.5">
      <div className="flex justify-between items-end">
        <span className="text-lg font-black text-white">
          {formatPricePEN(amount)}
        </span>
        <span className="text-[10px] font-bold text-slate-500">
          {percentage.toFixed(0)}%
        </span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000",
            colorClass.replace("text-", "bg-"),
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  </div>
);

const PhysicsRow = ({ label, value, sub }: any) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-bold text-slate-300">{label}</p>
      <p className="text-[10px] text-slate-500 uppercase tracking-tighter">
        {sub}
      </p>
    </div>
    <div className="text-lg font-bold text-white">{formatPricePEN(value)}</div>
  </div>
);

// Helper for time
const getTimeDifference = (startTime: string) => {
  const now = new Date();
  const start = new Date(startTime);
  const diffInMinutes = Math.floor(
    (now.getTime() - start.getTime()) / (1000 * 60),
  );

  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  const hours = Math.floor(diffInMinutes / 60);
  const mins = diffInMinutes % 60;
  return `${hours}h ${mins}m`;
};

export default CashierPage;
