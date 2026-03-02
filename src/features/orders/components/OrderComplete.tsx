import { ArrowLeft, Calendar, CheckCircle2, Receipt, User } from "lucide-react";
import type { CurrentOrderRes } from "../interfaces/current-order.interface";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/utils/format-date-time";
import { formatPricePEN } from "@/helpers/format-price";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type Props = {
  currentOrderData: CurrentOrderRes;
};
const OrderComplete = ({ currentOrderData }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />

      <div className="w-full max-w-lg space-y-6 animate-in fade-in zoom-in-95 duration-700">
        {/* Header Status */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 mb-2 relative group md:scale-110 lg:scale-125">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
            <CheckCircle2 className="w-8 h-8 text-emerald-400 relative z-10 transition-transform group-hover:scale-110" />
          </div>
          <div>
            <h1 className="text-xl lg:text-2xl font-black text-white tracking-tighter">
              ¡Orden Completada!
            </h1>
            <p className="text-slate-400 font-medium">
              La orden ha sido procesada y pagada satisfactoriamente
            </p>
          </div>
        </div>

        {/* Receipt Card */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-cyan-500 to-emerald-500" />

          <div className="p-8 space-y-8">
            {/* Top Info */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/5 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <Receipt className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-cyan-500 font-black text-[10px] uppercase tracking-[0.2em]">
                    {currentOrderData.numero_orden}
                  </span>
                </div>
              </div>
              <div className="text-right flex flex-col items-center sm:items-end gap-1">
                <Badge
                  variant="outline"
                  className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 font-black uppercase text-[10px] px-3"
                >
                  Atendido en Local
                </Badge>
                <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1.5 uppercase tracking-wide">
                  <Calendar className="w-3 h-3" />
                  {formatDateTime(currentOrderData.fecha_completado, "date")} a
                  las{" "}
                  {formatDateTime(currentOrderData.fecha_completado, "time")}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">
                Resumen de Productos ({currentOrderData.items_orden.length})
              </h4>
              <div className="max-h-60 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {currentOrderData.items_orden.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                        <span className="text-xs font-black text-cyan-400">
                          {item.cantidad}x
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                          {item.nombre_producto}
                        </span>
                        {item.estado === "cancelado" && (
                          <span className="text-[9px] text-red-500 font-black uppercase px-1.5 bg-red-500/10 rounded-md border border-red-500/20 w-fit">
                            Cancelado
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-black text-white">
                      {formatPricePEN(item.total_linea)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-slate-800">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                      Mesero
                    </span>
                    <span className="text-xs font-bold text-white">
                      {currentOrderData.usuarios.nombre_completo}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-1">
                    Monto Total Pagado
                  </p>
                  <p className="text-2xl font-black text-white tracking-tighter">
                    {formatPricePEN(currentOrderData.total)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Button
            onClick={() => navigate("/mesas")}
            className="h-16 rounded-3xl bg-linear-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-black text-lg transition-all shadow-xl shadow-cyan-500/20 active:scale-95 group"
          >
            Volver a Mesas
            <ArrowLeft className="w-5 h-5 ml-2 transition-transform group-hover:-translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default OrderComplete;
