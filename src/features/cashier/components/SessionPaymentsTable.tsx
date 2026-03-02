import { useState, Fragment } from "react";
import { useSessionPayments } from "../hooks/useCashier";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import {
  MoreVertical,
  Search,
  XCircle,
  Receipt,
  CreditCard,
  Wallet,
  CircleDollarSign,
  Ticket,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { TicketVentaDialog } from "./TicketVentaDialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PaymentSession } from "../interfaces/session-payments.interface";
import { formatPricePEN } from "@/helpers/format-price";
import { formatDateTime } from "@/utils/format-date-time";
import { useNavigate } from "react-router-dom";

interface SessionPaymentsTableProps {
  sessionId: string;
}

const SessionPaymentsTable = ({ sessionId }: SessionPaymentsTableProps) => {
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null,
  );
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    setPage(1);
  };

  const { data, isLoading, isError, error, refetch } = useSessionPayments({
    sessionId,
    meta: {
      page,
      limit,
      search: searchTerm,
    },
  });

  const pagos = data?.pagos ?? [];
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

  const getMethodIcon = (metodo: string) => {
    switch (metodo) {
      case "efectivo":
        return <CircleDollarSign className="w-4 h-4 text-emerald-400" />;
      case "tarjeta":
        return <CreditCard className="w-4 h-4 text-blue-400" />;
      case "yape":
        return <Wallet className="w-4 h-4 text-purple-400" />;
      case "plin":
        return <Wallet className="w-4 h-4 text-cyan-400" />;
      default:
        return <CircleDollarSign className="w-4 h-4 text-slate-400" />;
    }
  };

  const getMethodLabel = (metodo: string) => {
    switch (metodo) {
      case "efectivo":
        return "Efectivo";
      case "tarjeta":
        return "Tarjeta";
      case "yape":
        return "Yape";
      case "plin":
        return "Plin";
      default:
        return metodo;
    }
  };

  if (isLoading) {
    return <LoadingState message="Obteniendo historial de pagos..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Error al cargar pagos"
        message={
          error instanceof Error
            ? error.message
            : "Ocurrió un problema inesperado."
        }
        onRetry={() => refetch()}
      />
    );
  }

  const pagosAgrupados = pagos.reduce(
    (acumulador: Record<string, PaymentSession[]>, pago) => {
      const numeroOrden = pago.ordenes.numero_orden;

      if (!acumulador[numeroOrden]) {
        acumulador[numeroOrden] = [];
      }

      acumulador[numeroOrden].push(pago);

      return acumulador;
    },
    {} as Record<string, PaymentSession[]>,
  );

  const resultadoFinal = Object.entries(pagosAgrupados)
    .map(([numeroOrden, listaDePagos]) => ({
      numeroOrden: numeroOrden,
      pagos: listaDePagos,
    }))
    .sort((a, b) => b.numeroOrden.localeCompare(a.numeroOrden));

  return (
    <div className="space-y-4 mb-20">
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
              title="Limpiar búsqueda"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Limpiar
            </Button>
          )}
        </form>

        <div className="text-sm text-slate-400 font-medium">
          Total de pagos:{" "}
          <span className="text-cyan-400 font-bold">{meta?.total ?? 0}</span>
        </div>
      </div>

      <div className="rounded-xl border border-slate-700/50 bg-[#1e293b]/40 overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-800/60 backdrop-blur-md">
              <TableRow className="border-slate-700/50 hover:bg-transparent">
                <TableHead className="text-slate-300 font-bold w-[120px]">
                  Orden
                </TableHead>
                <TableHead className="text-slate-300 font-bold">
                  Pago N°
                </TableHead>
                <TableHead className="text-slate-300 font-bold">
                  Método
                </TableHead>
                <TableHead className="text-slate-300 font-bold">
                  Monto
                </TableHead>
                <TableHead className="text-slate-300 font-bold">
                  Documento
                </TableHead>
                <TableHead className="text-slate-300 font-bold">
                  Fecha
                </TableHead>
                <TableHead className="text-right text-slate-300 font-bold pr-6">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resultadoFinal.length > 0 ? (
                resultadoFinal.map((grupo) => (
                  <Fragment key={grupo.numeroOrden}>
                    {grupo.pagos.map((pago, index) => {
                      const isFirst = index === 0;
                      return (
                        <TableRow
                          key={pago.id}
                          className={cn(
                            "border-slate-700/30 hover:bg-slate-700/20 transition-all duration-300 group",
                            !isFirst && "border-t-0",
                          )}
                        >
                          <TableCell className="align-top pt-4">
                            {isFirst ? (
                              <div className="space-y-1">
                                <span className="text-cyan-400 font-black text-sm block">
                                  {pago.ordenes.numero_orden}
                                </span>
                                <span className="text-[10px] text-slate-500 uppercase font-bold">
                                  Mesa {pago.ordenes.mesa_historial.numero_mesa}
                                </span>
                              </div>
                            ) : (
                              <div className="flex justify-center">
                                <div className="w-0.5 h-8 bg-slate-700/50 rounded-full" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className="text-slate-300 font-mono text-xs">
                              {pago.numero_pago}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center border border-slate-700/50">
                                {getMethodIcon(pago.metodo)}
                              </div>
                              <span className="text-slate-200 text-sm font-medium">
                                {getMethodLabel(pago.metodo)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-white font-bold">
                                {formatPricePEN(pago.monto)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-slate-900/50 border-slate-700 text-slate-400 text-[10px] uppercase font-bold py-0 h-5"
                            >
                              {pago.tipo_documento}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-slate-300 text-xs">
                                {formatDateTime(pago.fecha_creacion, "date")}
                              </span>
                              <span className="text-slate-500 text-[10px]">
                                {formatDateTime(pago.fecha_creacion, "time")}
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
                                className="bg-[#1e293b] border-slate-700 text-slate-200 w-52 shadow-2xl p-1.5 rounded-xl"
                              >
                                <DropdownMenuLabel className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] px-3 py-2">
                                  Opciones de Pago
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-slate-700/50 mx-1" />

                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedPaymentId(pago.id);
                                    setIsTicketDialogOpen(true);
                                  }}
                                  className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-emerald-500/10 hover:text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-400 gap-3 transition-colors text-sm font-medium"
                                >
                                  <Receipt className="w-4 h-4" />
                                  <span>Ver Ticket</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() => {
                                    navigate(
                                      `/punto-venta/cobrar/${pago.ordenes.id}`,
                                    );
                                  }}
                                  className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-cyan-500/10 hover:text-cyan-400 focus:bg-cyan-500/10 focus:text-cyan-400 gap-3 transition-colors text-sm font-medium"
                                >
                                  <Ticket className="w-4 h-4" />
                                  <span>Ver Orden</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-slate-500 italic"
                  >
                    No se encontraron pagos en esta sesión.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 bg-slate-800/40 border-t border-slate-700/50 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full lg:w-auto">
            <div className="text-xs text-slate-400 font-medium whitespace-nowrap order-2 sm:order-1">
              Mostrando página{" "}
              <span className="text-cyan-400 font-bold">{meta?.page}</span> de{" "}
              <span className="text-slate-200">{meta?.lastPage}</span>
            </div>

            <div className="flex items-center gap-2 order-1 sm:order-2">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider whitespace-nowrap">
                Filas
              </span>
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

      {selectedPaymentId && (
        <TicketVentaDialog
          isTicketDialogOpen={isTicketDialogOpen}
          setIsTicketDialogOpen={setIsTicketDialogOpen}
          paymentId={selectedPaymentId}
        />
      )}
    </div>
  );
};

export default SessionPaymentsTable;
