import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, History } from "lucide-react";
import SessionPaymentsTable from "../components/SessionPaymentsTable";
import ErrorState from "@/components/common/ErrorState";

const SessionPaymentsPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  if (!sessionId) {
    return (
      <ErrorState
        title="Error al cargar la sesión"
        message="No se pudo encontrar la sesión"
        onRetry={() => navigate(-1)}
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-slate-700/50 pb-2">
        <div className="flex items-center justify-start gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-xl border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-slate-300 transition-all hover:scale-110 active:scale-95 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
              <History className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="text-cyan-500 font-black text-[10px] uppercase tracking-[0.2em]">
              Historial de Pagos
            </span>
          </div>
        </div>
      </div>

      <SessionPaymentsTable sessionId={sessionId} />
    </div>
  );
};

export default SessionPaymentsPage;
