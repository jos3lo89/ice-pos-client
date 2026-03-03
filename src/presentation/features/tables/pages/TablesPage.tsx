import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid } from "lucide-react";
import TablesTable from "../components/TablesTable";
import { Link } from "react-router-dom";

const TablesPage = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-700 pb-5">
        <div>
          <div className="flex items-center gap-2 text-cyan-500 mb-1">
            <LayoutGrid className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Gestión de Local
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Lista de Mesas
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Administra la distribución y el estado de las mesas de tu
            establecimiento.
          </p>
        </div>
        <Link to="/crear-mesa">
          <Button className="bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20 h-11 px-6 rounded-xl transition-all active:scale-95">
            <Plus className="w-5 h-5 mr-2" />
            Nueva Mesa
          </Button>
        </Link>
      </div>

      <div className="overflow-hidden">
        <TablesTable />
      </div>
    </div>
  );
};

export default TablesPage;
