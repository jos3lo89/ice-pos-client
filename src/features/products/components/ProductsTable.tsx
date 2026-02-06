import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProduct } from "../hooks/useProduct";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
  XCircle,
  Layers,
  Settings2,
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
import { Dialog } from "@/components/ui/dialog";
import ProductUpdateStatus from "./ProductUpdateStatus";
import type { Product } from "../interfaces/product.interface";

const ProductsTable = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

  const { getAllProducts } = useProduct();

  const { data, isLoading, isError, error, refetch } = getAllProducts(
    page,
    limit,
    searchTerm,
  );

  const allProducts = data?.products ?? [];
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

  if (isLoading) {
    return <LoadingState message="Obteniendo lista de productos..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Error al cargar productos"
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
              placeholder="Buscar por nombre o descripción..."
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
          productos
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
                  Producto
                </TableHead>
                <TableHead className="text-slate-300 font-bold">
                  Categoría
                </TableHead>
                <TableHead className="text-slate-300 font-bold">
                  Precio
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
              {allProducts.length > 0 ? (
                allProducts.map((product, index) => (
                  <TableRow
                    key={product.id}
                    className="border-slate-700/30 hover:bg-slate-700/20 transition-all duration-300 group"
                  >
                    <TableCell className="font-mono text-slate-500 text-xs">
                      {(page - 1) * limit + index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-200 font-medium tracking-tight">
                          {product.name}
                        </span>
                        <span className="text-slate-500 text-xs truncate max-w-[200px]">
                          {product.description || "Sin descripción"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-slate-900/60 border-slate-700 text-slate-400 py-0.5 px-2 rounded-md group-hover:border-cyan-500/30 transition-colors"
                      >
                        {product.categories.name}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-cyan-400 font-mono font-bold">
                        S/ {Number(product.price).toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {product.is_available ? (
                        <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20 uppercase tracking-wider">
                          <CheckCircle2 className="w-3 h-3 mr-1.5" /> Disponible
                        </div>
                      ) : (
                        <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold border border-red-500/20 uppercase tracking-wider">
                          <XCircle className="w-3 h-3 mr-1.5" /> Agotado
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
                          className="bg-[#1e293b] border-slate-700 text-slate-200 w-56 shadow-2xl p-1.5 rounded-xl"
                        >
                          <DropdownMenuLabel className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] px-3 py-2">
                            Gestión de Producto
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-slate-700/50 mx-1" />

                          <DropdownMenuItem
                            onClick={() =>
                              console.log("Agregar variante ID:", product.id)
                            }
                            className="cursor-pointer rounded-lg px-3 py-2 hover:bg-cyan-500/10 hover:text-cyan-400 focus:bg-cyan-500/10 focus:text-cyan-400 gap-3 transition-colors text-sm font-medium"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Agregar Variante</span>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() =>
                              console.log("Agregar modificador ID:", product.id)
                            }
                            className="cursor-pointer rounded-lg px-3 py-2 hover:bg-cyan-500/10 hover:text-cyan-400 focus:bg-cyan-500/10 focus:text-cyan-400 gap-3 transition-colors text-sm font-medium"
                          >
                            <Layers className="w-4 h-4" />
                            <span>Agregar Modificador</span>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsStatusDialogOpen(true);
                            }}
                            className="cursor-pointer rounded-lg px-3 py-2 hover:bg-cyan-500/10 hover:text-cyan-400 focus:bg-cyan-500/10 focus:text-cyan-400 gap-3 transition-colors text-sm font-medium"
                          >
                            <RefreshCw className="w-4 h-4" />
                            <span>Cambiar Estado</span>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="bg-slate-700/50 mx-1" />
                          <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 hover:bg-amber-500/10 hover:text-amber-400 focus:bg-amber-500/10 focus:text-amber-400 gap-3 transition-colors text-sm font-medium">
                            <Settings2 className="w-4 h-4" />
                            <span>Editar Detalles</span>
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
                    className="h-32 text-center text-slate-500 italic"
                  >
                    No se encontraron productos con esos criterios.
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

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={!meta?.hasPrev}
              className="bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-30 rounded-lg gap-1 px-3"
            >
              <ChevronLeft className="w-4 h-4" />
              {meta?.hasPrev ? "Anterior" : "Inicio"}
            </Button>

            <div className="flex items-center gap-1.5 px-3">
              {Array.from({ length: meta?.lastPage ?? 0 }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      p === page
                        ? "bg-cyan-600 text-white shadow-lg shadow-cyan-900/30 scale-110"
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
              className="bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-30 rounded-lg gap-1 px-3"
            >
              {meta?.hasNext ? "Siguiente" : "Final"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        {selectedProduct && (
          <ProductUpdateStatus
            productId={selectedProduct.id}
            productName={selectedProduct.name}
            isAvailable={selectedProduct.is_available}
            onSuccess={() => {
              setIsStatusDialogOpen(false);
              setSelectedProduct(null);
            }}
          />
        )}
      </Dialog>
    </div>
  );
};

export default ProductsTable;
