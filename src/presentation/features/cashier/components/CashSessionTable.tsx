import { useCashSessionHistory } from "@/application/hooks/useCashSession";
import { useState } from "react";
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
import { MoreVertical, Receipt, History } from "lucide-react";
import LoadingState from "@/presentation/components/LoadingState";
import ErrorState from "@/presentation/components/ErrorState";
import Pagination from "@/presentation/components/Pagination";
import { cn } from "@/lib/utils";
import { formatPricePEN } from "@/utils/format-price";
import { formatDateTime } from "@/utils/format-date-time";
import { useNavigate } from "react-router-dom";

interface Props {
  userId: string;
}

const CashSessionTable = ({ userId }: Props) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useCashSessionHistory({
    user_id: userId,
    meta: {
      page,
      limit,
    },
  });

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    setPage(1);
  };

  if (isLoading) {
    return <LoadingState message="Cargando historial de sesiones" />;
  }

  if (isError) {
    return (
      <ErrorState
        message="Error al cargar historial de sesiones"
        onRetry={() => refetch()}
      />
    );
  }

  const sessions = data?.data || [];
  const meta = data?.meta;

  const getStatusBadge = (estado: "abierta" | "cerrada") => {
    switch (estado) {
      case "abierta":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider">
            Sesión Abierta
          </Badge>
        );
      case "cerrada":
        return (
          <Badge className="bg-slate-700/50 text-slate-400 border-slate-600/50 hover:bg-slate-700/80 px-3 py-1 text-[10px] font-black uppercase tracking-wider">
            Sesión Cerrada
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-700/50 bg-[#1e293b]/40 overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-800/60 backdrop-blur-md">
              <TableRow className="border-slate-700/50 hover:bg-transparent">
                <TableHead className="text-slate-300 font-bold uppercase tracking-wider text-[11px] py-4 pl-6">
                  Apertura
                </TableHead>
                <TableHead className="text-slate-300 font-bold uppercase tracking-wider text-[11px] py-4">
                  Cierre
                </TableHead>
                <TableHead className="text-slate-300 font-bold uppercase tracking-wider text-[11px] py-4">
                  Saldos
                </TableHead>
                <TableHead className="text-slate-300 font-bold uppercase tracking-wider text-[11px] py-4">
                  Balance final
                </TableHead>
                <TableHead className="text-slate-300 font-bold uppercase tracking-wider text-[11px] py-4 text-center">
                  Estado
                </TableHead>
                <TableHead className="text-right text-slate-300 font-bold uppercase tracking-wider text-[11px] py-4 pr-6">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <TableRow
                    key={session.id}
                    className="border-slate-700/30 hover:bg-slate-700/20 transition-all duration-300 group"
                  >
                    <TableCell className="pl-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-white font-bold text-sm">
                          {formatDateTime(session.fecha_apertura, "date")}
                        </span>
                        <span className="text-slate-500 text-[10px] font-medium uppercase">
                          {formatDateTime(session.fecha_apertura, "time")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {session.fecha_cierre ? (
                        <div className="flex flex-col">
                          <span className="text-slate-300 font-bold text-sm">
                            {formatDateTime(session.fecha_cierre, "date")}
                          </span>
                          <span className="text-slate-500 text-[10px] font-medium uppercase">
                            {formatDateTime(session.fecha_cierre, "time")}
                          </span>
                        </div>
                      ) : (
                        <span className="text-emerald-500 text-xs font-black uppercase tracking-widest italic animate-pulse">
                          En curso...
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 font-bold uppercase w-12">
                            Inicio:
                          </span>
                          <span className="text-white font-bold text-xs">
                            {formatPricePEN(session.saldo_apertura)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 font-bold uppercase w-12">
                            Esper.:
                          </span>
                          <span className="text-cyan-400 font-bold text-xs">
                            {formatPricePEN(session.saldo_esperado)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 border-t border-slate-700/30 pt-1">
                          <span className="text-[10px] text-slate-500 font-bold uppercase w-12">
                            Real:
                          </span>
                          <span className="text-emerald-400 font-bold text-xs">
                            {formatPricePEN(session.saldo_real)}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span
                          className={cn(
                            "font-black text-sm",
                            Number(session.diferencia) < 0
                              ? "text-rose-400"
                              : Number(session.diferencia) > 0
                                ? "text-emerald-400"
                                : "text-white",
                          )}
                        >
                          {formatPricePEN(session.diferencia)}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase">
                          Diferencia
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(session.estado)}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 rounded-lg transition-all focus-visible:ring-cyan-500 shadow-sm"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="end"
                          className="bg-[#1e293b] border-slate-700 text-slate-200 w-64 shadow-2xl p-1.5 rounded-xl border backdrop-blur-md"
                        >
                          <DropdownMenuLabel className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] px-3 py-2">
                            Acciones de Sesión
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-slate-700/50 mx-1" />

                          <DropdownMenuItem
                            onClick={() => navigate(`/pagos/${session.id}`)}
                            className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-cyan-500/10 hover:text-cyan-400 focus:bg-cyan-500/10 focus:text-cyan-400 gap-3 transition-colors text-sm font-semibold"
                          >
                            <Receipt className="w-4 h-4" />
                            <span>Ver historial de pagos</span>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() =>
                              navigate(`/historial-caja/${session.id}/ordenes`)
                            }
                            className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-blue-500/10 hover:text-blue-400 focus:bg-blue-500/10 focus:text-blue-400 gap-3 transition-colors text-sm font-semibold"
                          >
                            <History className="w-4 h-4" />
                            <span>Historial de órdenes</span>
                          </DropdownMenuItem>

                          {/* <DropdownMenuItem
                            onClick={() =>
                              console.log(
                                "Ver historial de órdenes canceladas de sesión:",
                                session.id,
                              )
                            }
                            className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-rose-500/10 hover:text-rose-400 focus:bg-rose-500/10 focus:text-rose-400 gap-3 transition-colors text-sm font-semibold"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Órdenes canceladas</span>
                          </DropdownMenuItem> */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-slate-500 italic font-medium"
                  >
                    No se encontraron sesiones de caja.
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
              {/* <span className="text-xs text-slate-500 font-bold uppercase tracking-wider whitespace-nowrap">
                Sesiones por página
              </span> */}
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
export default CashSessionTable;
