import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateUserDialog from "../components/CreateUserDialog";
import UsersTable from "../components/UsersTable";

const UsersPage = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-700 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Usuarios
          </h1>
          <p className="text-slate-400 mt-1">
            Gestiona el acceso y roles del personal del restaurante.
          </p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      <UsersTable />

      <CreateUserDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  );
};

export default UsersPage;
