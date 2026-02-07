import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CategoriesTable from "../components/CategoriesTable";
import { Link } from "react-router-dom";

const CategoriesPage = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-700 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Categorias
          </h1>
        </div>
        <Link to="/crear-categoria">
          <Button className="bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20 px-6 rounded-xl h-11 transition-all">
            <Plus className="w-5 h-5 mr-2" />
            Nueva Categoria
          </Button>
        </Link>
      </div>

      <CategoriesTable />
    </div>
  );
};
export default CategoriesPage;
