import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FloorsTable from "../components/FloorsTable";

const FloorsPage = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-700 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Lista de Pisos
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Administra los diferentes niveles y áreas de tu establecimiento.
          </p>
        </div>
        <Link to="/crear-piso">
          <Button className="bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20 h-11 px-6 rounded-xl transition-all active:scale-95">
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Piso
          </Button>
        </Link>
      </div>

      <div className="overflow-hidden">
        <FloorsTable />
      </div>
    </div>
  );
};

export default FloorsPage;
