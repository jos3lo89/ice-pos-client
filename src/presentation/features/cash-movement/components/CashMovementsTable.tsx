import { useGetCashMovements } from "@/application/hooks/useCashMovements";
import ErrorState from "@/presentation/components/ErrorState";
import LoadingState from "@/presentation/components/LoadingState";
import Pagination from "@/presentation/components/Pagination";
import { Badge } from "@/presentation/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components/ui/table";
import { formatPricePEN } from "@/utils/format-price";
import { formatDateTime } from "@/utils/format-date-time";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Receipt,
  User,
  Calendar,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CashMovementsTableProps {
  sessionId: string;
}

const CashMovementsTable = ({ sessionId }: CashMovementsTableProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    data: movementsRes,
    isLoading,
    isError,
    refetch,
  } = useGetCashMovements(sessionId, page, limit);

  if (isLoading) {
    return <LoadingState message="Cargando movimientos de caja..." />;
  }

  if (isError) {
    return (
      <ErrorState
        onRetry={() => refetch()}
        message="Error al cargar movimientos de caja..."
      />
    );
  }

  const data = movementsRes?.data || [];
  const meta = movementsRes?.meta;

  const getMovementStyles = (tipo: string) => {
    switch (tipo) {
      case "ingreso_manual":
        return {
          icon: <ArrowUpCircle className="w-4 h-4 text-emerald-400" />,
          bgColor: "bg-emerald-500/10",
          textColor: "text-emerald-400",
          borderColor: "border-emerald-500/20",
          label: "Ingreso Manual",
        };
      case "egreso_manual":
        return {
          icon: <ArrowDownCircle className="w-4 h-4 text-red-400" />,
          bgColor: "bg-red-500/10",
          textColor: "text-red-400",
          borderColor: "border-red-500/20",
          label: "Egreso Manual",
        };
      case "egreso_gasto":
        return {
          icon: <Receipt className="w-4 h-4 text-amber-400" />,
          bgColor: "bg-amber-500/10",
          textColor: "text-amber-400",
          borderColor: "border-amber-500/20",
          label: "Gasto Administrativo",
        };
      default:
        return {
          icon: <FileText className="w-4 h-4 text-slate-400" />,
          bgColor: "bg-slate-500/10",
          textColor: "text-slate-400",
          borderColor: "border-slate-500/20",
          label: tipo,
        };
    }
  };

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    setPage(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-slate-900/50 border-slate-700 text-slate-400 font-bold uppercase tracking-tighter text-[10px]"
          >
            Total: {meta?.total || 0}
          </Badge>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-700/50 bg-[#1e293b]/40 overflow-hidden shadow-2xl backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-slate-800/60">
            <TableRow className="border-slate-700/50 hover:bg-transparent">
              <TableHead className="text-slate-400 font-black uppercase text-[10px] tracking-wider py-4">
                Tipo de Movimiento
              </TableHead>
              <TableHead className="text-slate-400 font-black uppercase text-[10px] tracking-wider">
                Monto
              </TableHead>
              <TableHead className="text-slate-400 font-black uppercase text-[10px] tracking-wider">
                Descripción
              </TableHead>
              <TableHead className="text-slate-400 font-black uppercase text-[10px] tracking-wider">
                Registrado por
              </TableHead>
              <TableHead className="text-slate-400 font-black uppercase text-[10px] tracking-wider text-right pr-6">
                Fecha / Hora
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((movement) => {
                const styles = getMovementStyles(movement.tipo);
                return (
                  <TableRow
                    key={movement.id}
                    className="border-slate-700/30 hover:bg-slate-700/20 transition-colors group"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center border shadow-inner transition-transform group-hover:scale-105",
                            styles.bgColor,
                            styles.borderColor,
                          )}
                        >
                          {styles.icon}
                        </div>
                        <span
                          className={cn(
                            "text-xs font-bold uppercase",
                            styles.textColor,
                          )}
                        >
                          {styles.label}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "text-sm font-black",
                          movement.tipo === "ingreso_manual"
                            ? "text-emerald-400"
                            : "text-white",
                        )}
                      >
                        {movement.tipo === "ingreso_manual" ? "+" : "-"}{" "}
                        {formatPricePEN(movement.monto)}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-300 text-xs italic line-clamp-2">
                          "{movement.descripcion || "Sin descripción"}"
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                          <User className="w-3 h-3 text-slate-500" />
                        </div>
                        <span className="text-slate-400 text-xs font-medium">
                          {movement.usuarios.nombre_completo}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5 text-slate-300 text-xs font-bold">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          {formatDateTime(movement.fecha_creacion, "date")}
                        </div>
                        <span className="text-slate-500 text-[10px] font-medium">
                          {formatDateTime(movement.fecha_creacion, "time")}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-slate-500">
                    <FileText className="w-10 h-10 opacity-20" />
                    <p className="italic text-sm">
                      No se registraron movimientos manuales en esta sesión.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Footer with Pagination */}
        <div className="bg-slate-800/40 p-4 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              Filas por página
            </div>
            <Select value={limit.toString()} onValueChange={handleLimitChange}>
              <SelectTrigger className="w-[70px] h-8 bg-slate-900/50 border-slate-700 text-slate-300 focus:ring-amber-500/20 rounded-lg text-xs font-bold">
                <SelectValue placeholder={limit.toString()} />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700 text-slate-300 min-w-[70px]">
                {[10, 20, 50, 100].map((v) => (
                  <SelectItem
                    key={v}
                    value={v.toString()}
                    className="text-xs focus:bg-amber-500/10 focus:text-amber-400 cursor-pointer font-bold"
                  >
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Pagination
            currentPage={page}
            totalPages={meta?.lastPage ?? 1}
            onPageChange={setPage}
            hasPrev={meta?.hasPrev ?? false}
            hasNext={meta?.hasNext ?? false}
          />
        </div>
      </div>
    </div>
  );
};

export default CashMovementsTable;
