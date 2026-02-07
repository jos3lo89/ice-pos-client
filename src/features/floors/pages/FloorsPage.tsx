import { Plus, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FloorsTable from "../components/FloorsTable";

const FloorsPage = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-cyan-500">
            <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em]">
              Gestión de Local
            </span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Pisos y <span className="text-cyan-500">Áreas</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium max-w-xl">
            Administra los diferentes niveles de tu establecimiento. Aquí puedes
            organizar tus mesas por zonas o pisos para un mejor control.
          </p>
        </div>

        <Link to="/crear-piso">
          <Button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold h-12 px-6 rounded-xl transition-all shadow-lg shadow-cyan-900/30 flex items-center gap-2 group">
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            Nuevo Piso
          </Button>
        </Link>
      </div>

      {/* Table Section */}
      <div>
        <FloorsTable />
      </div>
    </div>
  );
};

export default FloorsPage;
