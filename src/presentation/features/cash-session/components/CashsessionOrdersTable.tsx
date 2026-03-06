import { useCashSessionOrders } from "@/application/hooks/useCashSession";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Search,
  XCircle,
  MoreVertical,
  Utensils,
  Package,
  Clock,
  CheckCircle2,
  XCircle as CancelIcon,
  Timer,
  ExternalLink,
} from "lucide-react";
import { Input } from "@/presentation/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";
import { Button } from "@/presentation/components/ui/button";
import { Badge } from "@/presentation/components/ui/badge";
import LoadingState from "@/presentation/components/LoadingState";
import ErrorState from "@/presentation/components/ErrorState";
import Pagination from "@/presentation/components/Pagination";
import { cn } from "@/lib/utils";
import { formatPricePEN } from "@/utils/format-price";
import { formatDateTime } from "@/utils/format-date-time";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/application/stores/auth.store";

type Props = {
  sessionId: string;
};

const CashsessionOrdersTable = ({ sessionId }: Props) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { data, isLoading, isError, refetch } = useCashSessionOrders({
    sessionId,
    meta: {
      page,
      limit,
      search: searchTerm,
    },
  });

  const { register, handleSubmit, reset } = useForm<{ search: string }>({
    defaultValues: {
      search: "",
    },
  });

  const onSearchSubmit = (values: { search: string }) => {
    setSearchTerm(values.search);
    setPage(1);
  };

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    setPage(1);
  };

  if (isLoading) {
    return <LoadingState message="Cargando órdenes..." />;
  }

  if (isError) {
    return (
      <ErrorState message="Error al cargar órdenes" onRetry={() => refetch()} />
    );
  }

  const orders = data?.data || [];
  const meta = data?.meta;

  const getOrderStatusBadge = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return (
          <Badge className="bg-slate-700/50 text-slate-400 border-slate-600/30 gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            <Timer className="w-3 h-3" /> {estado}
          </Badge>
        );
      case "preparando":
        return (
          <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            <Clock className="w-3 h-3 animate-spin-slow" /> {estado}
          </Badge>
        );
      case "listo":
        return (
          <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3 h-3" /> {estado}
          </Badge>
        );
      case "servido":
        return (
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            <Utensils className="w-3 h-3" /> {estado}
          </Badge>
        );
      case "completado":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3 h-3" /> {estado}
          </Badge>
        );
      case "cancelado":
        return (
          <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/20 gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            <CancelIcon className="w-3 h-3" /> {estado}
          </Badge>
        );
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  const getOrderTypeIcon = (type: string) => {
    return type === "en_local" ? (
      <Utensils className="w-4 h-4 text-emerald-400" />
    ) : (
      <Package className="w-4 h-4 text-orange-400" />
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm">
        <form
          onSubmit={handleSubmit(onSearchSubmit)}
          className="flex items-center gap-2 flex-1 max-w-md"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              {...register("search")}
              placeholder="Buscar por N° de orden..."
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

        <div className="text-sm text-slate-400 font-medium">
          Total de órdenes:{" "}
          <span className="text-cyan-400 font-bold">{meta?.total ?? 0}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-700/50 bg-[#1e293b]/40 overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-800/60 backdrop-blur-md">
              <TableRow className="border-slate-700/50 hover:bg-transparent">
                <TableHead className="text-slate-300 font-bold uppercase tracking-wider text-[11px] py-4 pl-6">
                  N° Orden
                </TableHead>
                <TableHead className="text-slate-300 font-bold uppercase tracking-wider text-[11px] py-4">
                  Estado
                </TableHead>
                <TableHead className="text-slate-300 font-bold uppercase tracking-wider text-[11px] py-4">
                  Tipo / Mesa
                </TableHead>
                <TableHead className="text-slate-300 font-bold uppercase tracking-wider text-[11px] py-4">
                  Mesero
                </TableHead>
                <TableHead className="text-slate-300 font-bold uppercase tracking-wider text-[11px] py-4">
                  Total
                </TableHead>
                <TableHead className="text-slate-300 font-bold uppercase tracking-wider text-[11px] py-4">
                  Pagado / Pend.
                </TableHead>
                <TableHead className="text-slate-300 font-bold uppercase tracking-wider text-[11px] py-4">
                  Fecha
                </TableHead>
                <TableHead className="text-right text-slate-300 font-bold uppercase tracking-wider text-[11px] py-4 pr-6">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="border-slate-700/30 hover:bg-slate-700/20 transition-all duration-300 group"
                  >
                    <TableCell className="pl-6 py-4 font-black text-cyan-400 text-sm">
                      {order.numero_orden}
                    </TableCell>
                    <TableCell>{getOrderStatusBadge(order.estado)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center border border-slate-700/50">
                          {getOrderTypeIcon(order.tipo_orden)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-slate-200 text-xs font-bold uppercase">
                            {order.tipo_orden.replace("_", " ")}
                          </span>
                          <span className="text-slate-500 text-[10px] font-bold">
                            Mesa {order.mesa}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300 font-medium text-xs">
                      {order.mesero}
                    </TableCell>
                    <TableCell>
                      <span className="text-white font-black text-sm">
                        {formatPricePEN(order.total)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-emerald-400 font-bold text-xs">
                          {formatPricePEN(order.monto_pagado)}
                        </span>
                        <span
                          className={cn(
                            "text-[10px] font-black",
                            order.pendiente > 0
                              ? "text-rose-400/80"
                              : "text-slate-500",
                          )}
                        >
                          Pend: {formatPricePEN(order.pendiente)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-slate-300 text-[11px] font-bold">
                          {formatDateTime(order.fecha_creacion, "date")}
                        </span>
                        <span className="text-slate-500 text-[10px] uppercase">
                          {formatDateTime(order.fecha_creacion, "time")}
                        </span>
                      </div>
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
                          className="bg-[#1e293b] border-slate-700 text-slate-200 w-56 shadow-2xl p-1.5 rounded-xl border backdrop-blur-md"
                        >
                          <DropdownMenuLabel className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] px-3 py-2">
                            Gestión de Orden
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-slate-700/50 mx-1" />

                          <DropdownMenuItem
                            onClick={() => {
                              const userRol = user?.rol;
                              const redirectUrl =
                                userRol === "cajero"
                                  ? `/punto-venta/cobrar/${order.id}`
                                  : `/orden/detalles/${order.id}`;

                              navigate(redirectUrl);
                            }}
                            className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-cyan-500/10 hover:text-cyan-400 focus:bg-cyan-500/10 focus:text-cyan-400 gap-3 transition-colors text-sm font-semibold"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Ver más detalles</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-slate-500 italic font-medium"
                  >
                    No se encontraron órdenes en esta sesión.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 bg-slate-800/40 border-t border-slate-700/50 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full lg:w-auto">
            <div className="text-xs text-slate-400 font-medium whitespace-nowrap order-2 sm:order-1">
              Página{" "}
              <span className="text-cyan-400 font-bold">{meta?.page}</span> de{" "}
              <span className="text-slate-200">{meta?.lastPage}</span>
            </div>

            <div className="flex items-center gap-2 order-1 sm:order-2">
              <Select
                value={limit.toString()}
                onValueChange={handleLimitChange}
              >
                <SelectTrigger className="w-[70px] h-8 bg-slate-900/50 border-slate-700 text-slate-200 focus:ring-cyan-500/20 rounded-lg text-xs font-bold">
                  <SelectValue placeholder={limit.toString()} />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700 text-slate-200 min-w-[70px]">
                  {[5, 10, 20, 50].map((v) => (
                    <SelectItem
                      key={v}
                      value={v.toString()}
                      className="text-xs focus:bg-cyan-500/10 focus:text-cyan-400 cursor-pointer font-bold"
                    >
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
export default CashsessionOrdersTable;
