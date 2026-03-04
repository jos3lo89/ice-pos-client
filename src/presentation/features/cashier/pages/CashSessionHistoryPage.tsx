import { useAuthStore } from "@/application/stores/auth.store";
import ErrorState from "@/presentation/components/ErrorState";
import CashSessionTable from "../components/CashSessionTable";
import { Button } from "@/presentation/components/ui/button";
import { ArrowLeft, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CashSessionHistoryPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!user) {
    return <ErrorState message="Usuario no encontrado" />;
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
                <History className="w-5 h-5 text-cyan-400" />
              </div>
              <h1 className="text-xl font-black text-white tracking-tight">
                Historial de Sesiones
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main>
        <CashSessionTable userId={user.id} />
      </main>
    </div>
  );
};

export default CashSessionHistoryPage;
