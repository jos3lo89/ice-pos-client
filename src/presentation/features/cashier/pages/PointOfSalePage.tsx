import ErrorState from "@/presentation/components/ErrorState";
import LoadingState from "@/presentation/components/LoadingState";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/components/ui/tabs";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Badge } from "@/presentation/components/ui/badge";
import {
  LayoutGrid,
  Wallet,
  HandCoins,
  ArrowRight,
  RefreshCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { statusConfig } from "@/presentation/features/orders/utils/status-config";
import type { Mesa } from "@/core/entities/floors.entity";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useFloorsWithTables } from "@/application/hooks/useFloor";
import { Button } from "@/presentation/components/ui/button";

const PointOfSalePage = () => {
  const navigate = useNavigate();
  const floorsQuery = useFloorsWithTables();

  if (floorsQuery.isLoading) {
    return <LoadingState message="Cargando salones y mesas..." />;
  }

  if (floorsQuery.isError) {
    return (
      <ErrorState
        onRetry={() => floorsQuery.refetch()}
        message="Error al cargar las mesas"
      />
    );
  }

  const floors = floorsQuery.data || [];

  if (floors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-slate-500 animate-in fade-in duration-700">
        <div className="w-24 h-24 rounded-full bg-slate-800/50 flex items-center justify-center mb-6 border border-slate-700/50">
          <LayoutGrid className="w-12 h-12 opacity-20" />
        </div>
        <p className="text-2xl font-black text-white">
          No hay pisos configurados
        </p>
        <p className="text-slate-400 mt-2 max-w-xs text-center">
          Configura pisos y mesas en el panel de administración para empezar.
        </p>
      </div>
    );
  }

  const handleTableClick = (table: Mesa) => {
    if (table.estado === "ocupada" && table.orden_actual) {
      navigate(`/punto-venta/cobrar/${table.orden_actual.id}`);
    } else {
      console.log(
        `Click en mesa: ${table.numero_mesa} (Estado: ${table.estado})`,
      );
      if (table.estado === "disponible") {
        toast.info(
          `Mesa ${table.numero_mesa} está disponible para nuevas órdenes.`,
        );
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <Tabs defaultValue={floors[0].id} className="w-full">
        <div className="bg-[#0f172a]/90 backdrop-blur-md pb-2 border-b border-slate-700/30">
          <div className="flex items-center justify-center gap-2">
            <div className="relative group">
              <Button
                onClick={() => floorsQuery.refetch()}
                variant="ghost"
                size="icon"
                disabled={floorsQuery.isRefetching}
                className={cn(
                  "h-11 w-11 rounded-2xl transition-all duration-500",
                  "bg-slate-800/40 border border-slate-700/50 text-slate-400 backdrop-blur-md",
                  "hover:bg-slate-800/60 hover:text-emerald-400 hover:border-emerald-500/30 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]",
                  "shadow-2xl shadow-black/20",
                  floorsQuery.isRefetching &&
                    "border-emerald-500/50 text-emerald-500",
                )}
                title="Actualizar mesas"
              >
                <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors duration-500 rounded-2xl" />
                <RefreshCcw
                  className={cn(
                    "w-5 h-5 relative z-10 transition-all duration-500",
                    floorsQuery.isRefetching
                      ? "animate-spin text-emerald-500"
                      : "group-hover:rotate-180 text-slate-400 group-hover:text-emerald-400",
                  )}
                />

                {floorsQuery.isRefetching && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3 z-20">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                )}
              </Button>
            </div>
            <TabsList className="bg-slate-800/30 border border-slate-700/50 p-1 rounded-2xl inline-flex w-auto overflow-x-auto no-scrollbar">
              {floors.map((floor) => (
                <TabsTrigger
                  key={floor.id}
                  value={floor.id}
                  className="rounded-xl px-8 py-2.5 data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition-all whitespace-nowrap font-bold text-sm tracking-tight"
                >
                  {floor.nombre}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {floors.map((floor) => (
          <TabsContent key={floor.id} value={floor.id} className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {floor.mesas.map((table) => {
                const config =
                  statusConfig[table.estado] || statusConfig.disponible;
                const StatusIcon = config.icon;
                const isOcupada = table.estado === "ocupada";

                return (
                  <Card
                    key={table.id}
                    className={cn(
                      "relative group cursor-pointer overflow-hidden border-slate-700/50 transition-all duration-300 hover:scale-[1.05] active:scale-95 shadow-2xl rounded-3xl",
                      isOcupada
                        ? "bg-linear-to-br from-slate-800 to-slate-900 border-orange-500/20 shadow-orange-950/20"
                        : "bg-[#1e293b]/50 hover:bg-slate-800/80 hover:border-emerald-500/30",
                    )}
                    onClick={() => handleTableClick(table)}
                  >
                    {/* Status Indicator Bar */}
                    <div
                      className={cn(
                        "absolute top-0 left-0 w-full h-1.5 transition-colors",
                        table.estado === "disponible"
                          ? "bg-emerald-500"
                          : isOcupada
                            ? "bg-orange-500"
                            : table.estado === "reservada"
                              ? "bg-blue-500"
                              : "bg-slate-500",
                      )}
                    />

                    <CardContent className="p-6 flex flex-col items-center gap-4">
                      {/* Icon Container */}
                      <div
                        className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:rotate-12 shadow-inner",
                          config.color,
                        )}
                      >
                        <StatusIcon className="w-7 h-7" />
                      </div>

                      <div className="text-center space-y-1">
                        <span className="text-3xl font-black text-white block tracking-tighter">
                          {table.numero_mesa}
                        </span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "border-0 text-[10px] font-black uppercase tracking-[0.2em] px-0 bg-transparent",
                            config.color.split(" ")[1], // only get the text color
                          )}
                        >
                          {config.label}
                        </Badge>
                      </div>

                      {isOcupada && table.orden_actual && (
                        <div className="mt-2 pt-4 border-t border-slate-700/50 w-full">
                          <div className="flex flex-col items-center gap-1.5">
                            <div className="flex items-center gap-2 text-orange-400">
                              <Wallet className="w-3.5 h-3.5" />
                              <span className="text-xs font-black tracking-tight">
                                S/{" "}
                                {parseFloat(table.orden_actual.total).toFixed(
                                  2,
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 py-1.5 px-3 bg-orange-500/10 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-all w-full justify-center">
                              <HandCoins className="w-3 h-3" />
                              <span className="text-[10px] font-bold">
                                COBRAR
                              </span>
                              <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PointOfSalePage;
