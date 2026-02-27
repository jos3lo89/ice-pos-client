import { useCurrentSession } from "../hooks/useCashier";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { OpenSessionDialog } from "../components/OpenSessionDialog";
import { CloseSessionDialog } from "../components/CloseSessionDialog";

const CashierPage = () => {
  const { data: sessionData, isLoading, isError } = useCurrentSession();
  const [isOpenDialogOpen, setIsOpenDialogOpen] = useState(false);
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);

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

  return (
    <div className="space-y-8 pb-10">
      {/* Header Area */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/20 px-3 py-1 font-bold tracking-wide uppercase text-[10px]">
              Sesión Activa
            </Badge>
            <div className="flex items-center text-gray-500 text-xs gap-2 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(session.fecha_apertura).toLocaleDateString()}
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
            Control de Caja
          </h1>
          <p className="text-gray-400 font-medium">
            Monitoriza los ingresos y el flujo de efectivo en tiempo real.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-12 px-6 rounded-xl border-slate-700 bg-slate-800/50 text-white font-semibold hover:bg-slate-700 hover:text-white transition-all"
          >
            Ver Historial
          </Button>
          <Button
            onClick={() => setIsCloseDialogOpen(true)}
            className="h-12 px-8 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 font-bold hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10 cursor-pointer"
          >
            Arqueo y Cierre
          </Button>
        </div>

        <CloseSessionDialog
          isOpen={isCloseDialogOpen}
          onOpenChange={setIsCloseDialogOpen}
          sessionId={session.id}
          expectedBalance={session.caja_fisica.saldo_esperado}
        />
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ventas Totales"
          value={`S/ ${session.resumen.total_ventas.toFixed(2)}`}
          icon={TrendingUp}
          description="Ventas brutas hoy"
          variant="primary"
        />
        <StatCard
          title="En Efectivo"
          value={`S/ ${session.resumen.total_efectivo.toFixed(2)}`}
          icon={Wallet}
          description="Dinero en caja física"
          variant="emerald"
        />
        <StatCard
          title="Pagos Digitales"
          value={`S/ ${session.resumen.total_digital.toFixed(2)}`}
          icon={Smartphone}
          description="Apps y Transferencias"
          variant="blue"
        />
        <StatCard
          title="Saldo Esperado"
          value={`S/ ${session.caja_fisica.saldo_esperado.toFixed(2)}`}
          icon={ShieldCheck}
          description="Incluye saldo apertura"
          variant="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Detailed Breakdown */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="bg-[#1e293b]/50 border-slate-700/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl">
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
                {/* Cash Progress */}
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
              </div>

              <div className="mt-12 p-6 bg-slate-900/40 rounded-2xl border border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-300">
                      Pagos con Tarjeta
                    </p>
                    <p className="text-xs text-slate-500">
                      Crédito y Débito (Visa/MC)
                    </p>
                  </div>
                </div>
                <div className="text-2xl font-black text-white">
                  S/ {session.ventas_digitales.tarjeta.toFixed(2)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User & Session Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#1e293b]/50 border-slate-700/50 rounded-3xl p-6">
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
                  <p className="text-xs text-slate-400">
                    ID: {session.cajero.usuario}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-[#1e293b]/50 border-slate-700/50 rounded-3xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Clock className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">
                    Apertura de Turno
                  </p>
                  <h3 className="text-lg font-bold text-white">
                    {new Date(session.fecha_apertura).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Hace {getTimeDifference(session.fecha_apertura)}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column - Physics Register Summary */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-linear-to-br from-slate-800 to-slate-900 border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl h-full border-t border-t-white/5">
            <CardHeader className="bg-white/2 border-b border-white/5 p-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-4">
                <PiggyBank className="w-7 h-7 text-emerald-400" />
              </div>
              <CardTitle className="text-2xl font-black text-white tracking-tight">
                Caja Física
              </CardTitle>
              <CardDescription className="text-slate-400">
                Conciliación de dinero real
              </CardDescription>
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
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-xl font-bold text-white">
                      Total Esperado
                    </span>
                    <span className="text-3xl font-black text-emerald-400">
                      S/ {session.caja_fisica.saldo_esperado.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 text-right">
                    Monto calculado por el sistema
                  </p>
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
        </div>
      </div>
    </div>
  );
};

// --- Sub-components for better organization ---

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
        "rounded-3xl border transition-all hover:scale-[1.02] duration-300 group overflow-hidden",
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
              "p-3 rounded-2xl transition-transform group-hover:scale-110 group-hover:rotate-6",
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
          S/ {amount.toFixed(2)}
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
    <div className="text-lg font-bold text-white">S/ {value.toFixed(2)}</div>
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
