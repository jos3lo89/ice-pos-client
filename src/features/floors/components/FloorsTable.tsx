import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFloors } from "../hooks/useFloor";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  MoreVertical,
  Plus,
  Search,
  XCircle,
  Layers,
  Building,
  Hash,
  ArrowRight,
} from "lucide-react";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const FloorsTable = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, error, refetch } = useFloors(
    page,
    limit,
    searchTerm,
  );

  const allFloors = data?.data ?? [];
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
    return <LoadingState message="Obteniendo lista de pisos..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Error al cargar pisos"
        message={error?.message || "Ocurrió un problema inesperado."}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm transition-all duration-300">
        <form
          onSubmit={handleSubmit(onSearchSubmit)}
          className="flex items-center gap-2 flex-1 max-w-md"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              {...register("search")}
              placeholder="Buscar por nombre..."
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

        <div className="text-sm text-slate-400 font-medium bg-slate-900/40 px-4 py-2 rounded-lg border border-slate-700/30">
          Total:{" "}
          <span className="text-cyan-400 font-bold">{meta?.total ?? 0}</span>{" "}
          pisos registrados
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-xl border border-slate-700/50 bg-slate-800/20 overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-800/60 backdrop-blur-md">
              <TableRow className="border-slate-700/50 hover:bg-transparent transition-colors">
                <TableHead className="text-slate-300 font-bold w-16 px-6">
                  Ord.
                </TableHead>
                <TableHead className="text-slate-300 font-bold">Piso</TableHead>
                <TableHead className="text-slate-300 font-bold text-center">
                  Nivel
                </TableHead>
                <TableHead className="text-slate-300 font-bold text-center">
                  Capacidad de Mesas
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
              {allFloors.length > 0 ? (
                allFloors.map((floor, index) => (
                  <TableRow
                    key={floor.id}
                    className="border-slate-700/30 hover:bg-slate-700/20 transition-all duration-300 group"
                  >
                    <TableCell className="font-mono text-slate-500 text-xs px-6">
                      {(page - 1) * limit + index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900/50 rounded-lg border border-slate-700 group-hover:border-cyan-500/30 transition-all">
                          <Building className="w-4 h-4 text-cyan-500" />
                        </div>
                        <span className="text-slate-200 font-bold tracking-tight text-sm">
                          {floor.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-700 text-slate-400 font-mono text-xs font-black">
                        <Hash className="w-3 h-3 text-cyan-500" />
                        {floor.level}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="bg-cyan-500/5 border-cyan-500/20 text-cyan-400 px-3 py-0.5 rounded-full font-bold"
                      >
                        {floor._count.tables} Mesas
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {floor.is_active ? (
                        <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-black border border-green-500/20 uppercase tracking-widest">
                          <CheckCircle2 className="w-3 h-3 mr-1.5" /> Activo
                        </div>
                      ) : (
                        <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-black border border-red-500/20 uppercase tracking-widest">
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
                          className="bg-slate-900 border-slate-800 text-slate-200 w-56 shadow-2xl p-1.5 rounded-xl border backdrop-blur-xl"
                        >
                          <DropdownMenuLabel className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] px-3 py-2">
                            Gestión de Piso
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-slate-800/50 mx-1" />

                          <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 hover:bg-cyan-500/10 hover:text-cyan-400 focus:bg-cyan-500/10 focus:text-cyan-400 gap-3 transition-colors text-sm font-medium">
                            <Plus className="w-4 h-4" />
                            <span>Agregar Mesa</span>
                          </DropdownMenuItem>

                          <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 hover:bg-cyan-500/10 hover:text-cyan-400 focus:bg-cyan-500/10 focus:text-cyan-400 gap-3 transition-colors text-sm font-medium">
                            <Layers className="w-4 h-4" />
                            <span>Editar Estructura</span>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="bg-slate-800/50 mx-1" />
                          <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 hover:bg-amber-500/10 hover:text-amber-400 focus:bg-amber-500/10 focus:text-amber-400 gap-3 transition-colors text-sm font-medium">
                            <Plus className="w-4 h-4" />
                            <span>Ver Detalles</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-48 text-center text-slate-500"
                  >
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center border border-slate-700">
                        <Building className="w-8 h-8 text-slate-600" />
                      </div>
                      <p className="italic font-medium">
                        No se encontraron pisos registrados.
                      </p>
                      <Link to="/crear-piso">
                        <Button
                          size="sm"
                          className="bg-cyan-600 hover:bg-cyan-500 text-xs font-bold"
                        >
                          Crear el primer piso
                          <ArrowRight className="w-3 h-3 ml-2" />
                        </Button>
                      </Link>
                    </div>
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
    </div>
  );
};

export default FloorsTable;
