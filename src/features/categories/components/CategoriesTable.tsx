import { useMemo, useState } from "react";
import type { GetAllCategoriesRes } from "../interfaces/categories.interface";
import { useCategorie } from "../hooks/useCategorie";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import {
  CheckCircle2,
  MoreVertical,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ChangeStatusCatDialog from "./ChangeStatusCatDialog";

const CategoriesTable = () => {
  const [selectedCategorie, setSelectedCategorie] =
    useState<GetAllCategoriesRes | null>(null);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { listCategories } = useCategorie();

  const allCategories = listCategories.data ?? [];

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCategories;

    return allCategories.filter((c) => {
      const fullName = (c.name ?? "").toLowerCase();
      return fullName.includes(q);
    });
  }, [allCategories, query]);

  if (listCategories.isLoading) {
    return <LoadingState message="Obteniendo lista de categorias..." />;
  }

  if (listCategories.isError) {
    return (
      <ErrorState
        title="Error al cargar categorias"
        message={
          listCategories.error?.message || "Ocurrió un problema inesperado."
        }
        onRetry={() => listCategories.refetch()}
      />
    );
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            placeholder="Buscar por nombre..."
            className="pl-9 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-cyan-500"
          />
        </div>
      </div>
      <div className="rounded-md border border-slate-700 bg-slate-800/50 overflow-hidden shadow-xl">
        <Table>
          <TableHeader className="bg-slate-800">
            <TableRow className="border-slate-700 hover:bg-slate-800">
              <TableHead className="text-slate-300 font-bold">N°</TableHead>
              <TableHead className="text-slate-300 font-bold">Nombre</TableHead>
              <TableHead className="text-slate-300 font-bold">
                Descripcion
              </TableHead>

              <TableHead className="text-slate-300 font-bold">
                Cant. Productos
              </TableHead>
              <TableHead className="text-slate-300 font-bold text-center">
                Estado
              </TableHead>
              <TableHead className="text-right text-slate-300 font-bold">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((cat, index) => (
              <TableRow
                key={cat.id}
                className="border-slate-700 hover:bg-slate-700/50 transition-colors"
              >
                <TableCell className="font-medium text-slate-400">
                  <span>{index + 1}</span>
                </TableCell>
                <TableCell className="font-medium text-slate-300">
                  <div className="flex flex-col">
                    <span>{cat.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-400 font-mono text-xs">
                  {cat.description}
                </TableCell>
                <TableCell className="text-slate-300 font-mono text-xs text-center">
                  {cat._count.products}
                </TableCell>
                <TableCell className="text-center">
                  {cat.is_active ? (
                    <div className="inline-flex items-center px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Activo
                    </div>
                  ) : (
                    <div className="inline-flex items-center px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                      <XCircle className="w-3 h-3 mr-1" /> Inactivo
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 focus-visible:ring-cyan-500"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="bg-slate-800 border-slate-700 text-slate-200 w-48 shadow-xl"
                    >
                      <DropdownMenuLabel className="text-slate-400 text-xs uppercase tracking-wider">
                        Opciones
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-slate-700" />

                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedCategorie(cat);
                          setIsStatusDialogOpen(true);
                        }}
                        className="cursor-pointer hover:bg-slate-700 hover:text-cyan-400 focus:bg-slate-700 focus:text-cyan-400 gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Cambiar estado</span>
                      </DropdownMenuItem>

                      {/* <DropdownMenuItem
                        onClick={() => {
                          console.log(user);
                        }}
                        className="cursor-pointer hover:bg-slate-700 hover:text-cyan-400 focus:bg-slate-700 focus:text-cyan-400 gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Editar usuario</span>
                      </DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ChangeStatusCatDialog
        open={isStatusDialogOpen}
        onOpenChange={setIsStatusDialogOpen}
        categorie={selectedCategorie}
      />
    </>
  );
};
export default CategoriesTable;
