import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CategoriesTable from "../components/CategoriesTable";
import { useState } from "react";
import CreateCategorieDialog from "../components/CreateCategorieDialog";

const CategoriesPage = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-700 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Categorias
          </h1>
          <p className="text-slate-400 mt-1">
            Gestiona las categorias del sistema.
          </p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nueva Categoria
        </Button>
      </div>

      <CategoriesTable />

      <CreateCategorieDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
    </div>
  );
};
export default CategoriesPage;
