import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Activity } from "lucide-react";
import CashMovementsTable from "../components/CashMovementsTable";
import ErrorState from "@/presentation/components/ErrorState";

const MovementsHistoryPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  if (!sessionId) {
    return (
      <ErrorState
        title="Error al cargar la sesión"
        message="No se pudo encontrar el ID de la sesión para ver los movimientos."
        onRetry={() => navigate(-1)}
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-slate-700/50 pb-4">
        <div className="flex items-center justify-start gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-xl border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-slate-300 transition-all hover:scale-110 active:scale-95 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shadow-inner">
              <Activity className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-amber-500 font-black text-[10px] uppercase tracking-[0.2em] leading-none mb-1">
                Historial de Movimientos
              </span>
            </div>
          </div>
        </div>
      </div>

      <CashMovementsTable sessionId={sessionId} />
    </div>
  );
};

export default MovementsHistoryPage;
