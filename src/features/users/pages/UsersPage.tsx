import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UsersTable from "../components/UsersTable";
import { Link } from "react-router-dom";

const UsersPage = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-700 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Lista de Empleados
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Administra los accesos y roles de tu equipo.
          </p>
        </div>
        <Link to="/crear-empleado">
          <Button className="bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20 h-11 px-6 rounded-xl transition-all active:scale-95">
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Empleado
          </Button>
        </Link>
      </div>

      <div className="bg-[#1e293b]/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
        <UsersTable />
      </div>
    </div>
  );
};

export default UsersPage;
