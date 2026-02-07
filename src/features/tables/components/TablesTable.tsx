import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTableList } from "../hooks/useTable";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Plus,
  Search,
  XCircle,
  Table as TableIcon,
  Layers,
  Settings2,
  History,
} from "lucide-react";
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
import type { TableStatusT } from "../interfaces/table.interface";

const TablesTable = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, error, refetch } = useTableList(
    page,
    limit,
    searchTerm,
  );

  const allTables = data?.data ?? [];
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

  const handlePrevPage = () => {
    if (meta?.hasPrev) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (meta?.hasNext) setPage((prev) => prev + 1);
  };

  const getStatusBadge = (status: TableStatusT) => {
    switch (status) {
      case "disponible":
        return (
          <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-black border border-green-500/20 uppercase tracking-widest">
            <CheckCircle2 className="w-3 h-3 mr-1.5" /> Disponible
          </div>
        );
      case "ocupada":
        return (
          <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-black border border-red-500/20 uppercase tracking-widest">
            <XCircle className="w-3 h-3 mr-1.5" /> Ocupada
          </div>
        );
      case "reservada":
        return (
          <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-black border border-amber-500/20 uppercase tracking-widest">
            <History className="w-3 h-3 mr-1.5" /> Reservada
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-500/10 text-slate-400 text-[10px] font-black border border-slate-500/20 uppercase tracking-widest">
            {status}
          </div>
        );
    }
  };

  if (isLoading) {
    return <LoadingState message="Obteniendo lista de mesas..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Error al cargar mesas"
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
              placeholder="Buscar por número de mesa..."
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
            >
              <XCircle className="w-4 h-4 mr-2" />
              Limpiar
            </Button>
          )}
        </form>

        <div className="text-sm text-slate-400 font-medium bg-slate-900/40 px-4 py-2 rounded-lg border border-slate-700/30">
          Total:{" "}
          <span className="text-cyan-400 font-bold">{meta?.total ?? 0}</span>{" "}
          mesas registradas
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-xl border border-slate-700/50 bg-slate-800/20 overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <TableUI>
            <TableHeader className="bg-slate-800/60 backdrop-blur-md">
              <TableRow className="border-slate-700/50 hover:bg-transparent transition-colors">
                <TableHead className="text-slate-300 font-bold w-16 px-6">
                  Ord.
                </TableHead>
                <TableHead className="text-slate-300 font-bold">Mesa</TableHead>
                <TableHead className="text-slate-300 font-bold">
                  Piso / Área
                </TableHead>
                <TableHead className="text-slate-300 font-bold text-center">
                  Estado
                </TableHead>
                <TableHead className="text-slate-300 font-bold text-center">
                  Pedido Actual
                </TableHead>
                <TableHead className="text-right text-slate-300 font-bold pr-6">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allTables.length > 0 ? (
                allTables.map((table, index) => (
                  <TableRow
                    key={table.id}
                    className="border-slate-700/30 hover:bg-slate-700/20 transition-all duration-300 group"
                  >
                    <TableCell className="font-mono text-slate-500 text-xs px-6">
                      {(page - 1) * limit + index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900/50 rounded-lg border border-slate-700 group-hover:border-cyan-500/30 transition-all">
                          <TableIcon className="w-4 h-4 text-cyan-500" />
                        </div>
                        <span className="text-slate-200 font-bold tracking-tight text-sm">
                          Mesa {table.table_number}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-slate-300 text-sm font-medium">
                          {table.floors?.name || "Sin asignar"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(table.status)}
                    </TableCell>
                    <TableCell className="text-center">
                      {table.current_order_id ? (
                        <Badge
                          variant="outline"
                          className="bg-cyan-500/5 border-cyan-500/20 text-cyan-400 px-3 py-0.5 rounded-full font-bold text-[10px]"
                        >
                          # {table.current_order_id.substring(0, 8)}
                        </Badge>
                      ) : (
                        <span className="text-slate-600 text-[10px] font-medium tracking-wider">
                          N/A
                        </span>
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
                            Gestión de Mesa
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-slate-800/50 mx-1" />

                          <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 hover:bg-cyan-500/10 hover:text-cyan-400 focus:bg-cyan-500/10 focus:text-cyan-400 gap-3 transition-colors text-sm font-medium">
                            <Plus className="w-4 h-4" />
                            <span>Ver Comandas</span>
                          </DropdownMenuItem>

                          <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 hover:bg-cyan-500/10 hover:text-cyan-400 focus:bg-cyan-500/10 focus:text-cyan-400 gap-3 transition-colors text-sm font-medium">
                            <Settings2 className="w-4 h-4" />
                            <span>Editar Detalles</span>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="bg-slate-800/50 mx-1" />
                          <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 hover:bg-red-500/10 hover:text-red-400 focus:bg-red-500/10 focus:text-red-400 gap-3 transition-colors text-sm font-medium">
                            <XCircle className="w-4 h-4" />
                            <span>Inhabilitar Mesa</span>
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
                        <TableIcon className="w-8 h-8 text-slate-600" />
                      </div>
                      <p className="italic font-medium">
                        No se encontraron mesas registradas.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </TableUI>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-slate-800/40 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-medium">
            Mostrando página{" "}
            <span className="text-cyan-400 font-bold">{meta?.page}</span> de{" "}
            <span className="text-slate-200">{meta?.lastPage}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={!meta?.hasPrev}
              className="bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-30 rounded-lg gap-1 px-3 h-9 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </Button>

            <div className="flex items-center gap-1.5 px-3">
              {Array.from({ length: meta?.lastPage ?? 0 }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-lg text-xs font-black transition-all duration-300 ${
                      p === page
                        ? "bg-cyan-600 text-white shadow-xl shadow-cyan-900/40 scale-110"
                        : "text-slate-500 hover:text-slate-200 hover:bg-slate-700/50"
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={!meta?.hasNext}
              className="bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-30 rounded-lg gap-1 px-3 h-9 transition-all"
            >
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablesTable;
