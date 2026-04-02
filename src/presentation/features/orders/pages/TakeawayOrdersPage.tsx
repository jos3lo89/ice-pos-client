import { useNavigate } from "react-router-dom";
import LoadingState from "@/presentation/components/LoadingState";
import ErrorState from "@/presentation/components/ErrorState";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Badge } from "@/presentation/components/ui/badge";
import { ShoppingBag, Plus, CreditCard, Clock, ChefHat, CheckCircle2, Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/presentation/components/ui/button";
import { formatPricePEN } from "@/utils/format-price";
import { useAuthStore } from "@/application/stores/auth.store";
import { useGetOrderTakeAway } from "@/application/hooks/useOrder";
import type { OrderTakeAwayRes } from "@/core/entities/order.entity";

const localStatusConfig: Record<
  OrderTakeAwayRes["estado"],
  { label: string; color: string; bg: string; icon: any }
> = {
  pendiente: {
    label: "Pendiente",
    color: "text-slate-400",
    bg: "bg-slate-500/10",
    icon: Clock,
  },
  preparando: {
    label: "En Cocina",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    icon: ChefHat,
  },
  listo: {
    label: "Listo",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    icon: CheckCircle2,
  },
  cancelado: {
    label: "Cancelado",
    color: "text-red-400",
    bg: "bg-red-500/10",
    icon: Ban,
  },
};

const TakeawayOrdersPage = () => {
  const navigate = useNavigate();
  const { data: orders, isLoading, isError, refetch } = useGetOrderTakeAway();
  const { user } = useAuthStore();

  if (isLoading) return <LoadingState message="Cargando órdenes para llevar..." />;
  if (isError) return <ErrorState onRetry={() => refetch()} message="Error al cargar las órdenes" />;

  const activeOrders = orders?.filter(o => o.estado !== "cancelado") || [];

  if (activeOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-400 h-[calc(100vh-8rem)]">
        <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
        <p className="text-xl font-semibold">No hay órdenes para llevar activas</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 px-2 mt-6">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-2xl font-bold text-white">Órdenes para Llevar</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
        {activeOrders.map((order) => {
          const config = localStatusConfig[order.estado] || localStatusConfig.pendiente;
          const StatusIcon = config.icon;

          return (
            <Card key={order.id} className="bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60 transition-all shadow-lg overflow-hidden flex flex-col">
              <div className={cn("h-1 w-full", config.bg)} />
              <CardContent className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-lg font-black text-white">#{order.numero_orden}</span>
                    <p className="text-xs text-slate-400">Mozo: {order.usuarios.nombre_completo}</p>
                  </div>
                  <Badge variant="outline" className={cn("border-0 text-[10px] font-black uppercase tracking-widest px-2 flex items-center gap-1", config.color, config.bg)}>
                    {StatusIcon && <StatusIcon className="w-3 h-3" />}
                    <span>{config.label}</span>
                  </Badge>
                </div>

                {order.notas && (
                  <div className="bg-slate-900/50 rounded-lg p-2 mb-4 border border-slate-700/50">
                    <p className="text-xs text-orange-400 italic font-medium line-clamp-2">"{order.notas}"</p>
                  </div>
                )}

                <div className="mt-auto pt-4 border-t border-slate-700/50 flex items-center justify-between mb-4">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total</span>
                  <span className="text-xl text-cyan-400 font-black">{formatPricePEN(order.total)}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <Button 
                    variant="outline" 
                    className={cn("bg-slate-800 hover:bg-slate-700 border-slate-600 hover:border-cyan-500 text-white gap-2 transition-colors", user?.rol === "cajero" ? "" : "col-span-2")}
                    onClick={() => {
                         const prefix = user?.rol === "cajero" ? "/punto-venta/agregar" : "/agregar-item";
                         navigate(`${prefix}/${order.id}`);
                    }}
                  >
                    <Plus className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold">Items</span>
                  </Button>
                  
                  {user?.rol === "cajero" && (
                    <Button 
                      className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 transition-colors shadow-lg shadow-emerald-500/20"
                      onClick={() => navigate(`/punto-venta/cobrar/${order.id}`)}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span className="text-xs font-bold">Cobrar</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TakeawayOrdersPage;
