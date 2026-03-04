import { useParams, useNavigate } from "react-router-dom";
import CashsessionOrdersTable from "../components/CashsessionOrdersTable";
import ErrorState from "@/presentation/components/ErrorState";
import { Button } from "@/presentation/components/ui/button";
import { ArrowLeft, ClipboardList } from "lucide-react";

const CashSessionOrdersPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  if (!sessionId) {
    return <ErrorState message="No se encontro el id de la sesion" />;
  }

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-slate-700/30">
        <div className="flex items-center gap-5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-all shadow-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <ClipboardList className="w-5 h-5 text-cyan-400" />
              </div>
              <h1 className="text-xl font-black text-white tracking-tight">
                Órdenes de la Sesión
              </h1>
            </div>
            <p className="text-slate-400 font-medium text-sm">
              Listado detallado de pedidos procesados en esta jornada
            </p>
          </div>
        </div>
      </header>

      <main>
        <CashsessionOrdersTable sessionId={sessionId} />
      </main>
    </div>
  );
};
export default CashSessionOrdersPage;
