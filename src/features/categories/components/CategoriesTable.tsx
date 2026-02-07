import { useState } from "react";
import type { Category } from "../interfaces/categories.interface";
import { UseCategorieList } from "../hooks/useCategorie";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import {
  CheckCircle2,
  MoreVertical,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";
import Pagination from "@/components/common/Pagination";
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
import { useForm } from "react-hook-form";

const CategoriesTable = () => {
  const [selectedCategorie, setSelectedCategorie] = useState<Category | null>(
    null,
  );
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

  // Pagination and Search State
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch categories with current params
  const { data, isLoading, isError, error, refetch } = UseCategorieList(
    page,
    limit,
    searchTerm,
  );

  const allCategories = data?.categories ?? [];
  const meta = data?.meta;

  const { register, handleSubmit, reset } = useForm<{ search: string }>({
    defaultValues: {
      search: "",
    },
  });

  const onSearchSubmit = (values: { search: string }) => {
    setSearchTerm(values.search);
    setPage(1);
  };

  if (isLoading) {
    return <LoadingState message="Obteniendo lista de categorias..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Error al cargar categorias"
        message={error?.message || "Ocurrió un problema inesperado."}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm">
        <form
          onSubmit={handleSubmit(onSearchSubmit)}
          className="flex items-center gap-2 flex-1 max-w-md"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              {...register("search")}
              placeholder="Buscar categorías..."
              className="pl-10 bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-cyan-500 h-10 rounded-lg"
            />
          </div>
          <Button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-all shadow-lg shadow-cyan-900/20 px-6"
          >
            Buscar
          </Button>
          {searchTerm && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                reset({ search: "" });
                setSearchTerm("");
                setPage(1);
              }}
              className="text-slate-400 hover:text-white hover:bg-slate-700/50 px-3"
              title="Limpiar búsqueda"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Limpiar
            </Button>
          )}
        </form>

        <div className="text-sm text-slate-400 font-medium">
          Total:{" "}
          <span className="text-cyan-400 font-bold">{meta?.total ?? 0}</span>{" "}
          categorías
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-xl border border-slate-700/50 bg-[#1e293b]/40 overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-800/60 backdrop-blur-md">
              <TableRow className="border-slate-700/50 hover:bg-transparent">
                <TableHead className="text-slate-300 font-bold w-16">
                  N°
                </TableHead>
                <TableHead className="text-slate-300 font-bold">
                  Nombre
                </TableHead>
                <TableHead className="text-slate-300 font-bold">
                  Cant. Productos
                </TableHead>
                <TableHead className="text-slate-300 font-bold text-center">
                  Estado
                </TableHead>
                <TableHead className="text-right text-slate-300 font-bold pr-6">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCategories.length > 0 ? (
                allCategories.map((cat, index) => (
                  <TableRow
                    key={cat.id}
                    className="border-slate-700/30 hover:bg-slate-700/20 transition-all duration-300 group"
                  >
                    <TableCell className="font-mono text-slate-500 text-xs text-center">
                      {(page - 1) * limit + index + 1}
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-200 font-medium">
                        {cat.name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-slate-900/50 border border-slate-700 text-cyan-400 font-mono text-xs">
                        {cat._count.products}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {cat.is_active ? (
                        <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20 uppercase tracking-wider">
                          <CheckCircle2 className="w-3 h-3 mr-1.5" /> Activo
                        </div>
                      ) : (
                        <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold border border-red-500/20 uppercase tracking-wider">
                          <XCircle className="w-3 h-3 mr-1.5" /> Inactivo
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 rounded-lg transition-all focus-visible:ring-cyan-500"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="end"
                          className="bg-[#1e293b] border-slate-700 text-slate-200 w-52 shadow-2xl p-1.5 rounded-xl"
                        >
                          <DropdownMenuLabel className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] px-3 py-2">
                            Gestión de Categoría
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-slate-700/50 mx-1" />

                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedCategorie(cat);
                              setIsStatusDialogOpen(true);
                            }}
                            className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-cyan-500/10 hover:text-cyan-400 focus:bg-cyan-500/10 focus:text-cyan-400 gap-3 transition-colors text-sm font-medium"
                          >
                            <RefreshCw className="w-4 h-4" />
                            <span>Cambiar Estado</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-slate-500 italic"
                  >
                    No se encontraron categorías con esos criterios.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-slate-800/40 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-medium">
            Mostrando página{" "}
            <span className="text-cyan-400 font-bold">{meta?.page}</span> de{" "}
            <span className="text-slate-200">{meta?.lastPage}</span>
          </div>

          <Pagination
            currentPage={page}
            totalPages={meta?.lastPage ?? 0}
            onPageChange={setPage}
            hasPrev={meta?.hasPrev ?? false}
            hasNext={meta?.hasNext ?? false}
          />
        </div>
      </div>

      <ChangeStatusCatDialog
        open={isStatusDialogOpen}
        onOpenChange={setIsStatusDialogOpen}
        categorie={selectedCategorie}
      />
    </div>
  );
};

export default CategoriesTable;
