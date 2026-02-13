import { useNavigate } from "react-router-dom";
import { useFloorsWithTables } from "@/features/floors/hooks/useFloor";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import { statusConfig } from "../utils/status-config";

const FloorWithTablesPage = () => {
  const navigate = useNavigate();
  const floorsQuery = useFloorsWithTables();

  if (floorsQuery.isLoading) {
    return <LoadingState message="Cargando salones y mesas..." />;
  }

  if (floorsQuery.isError) {
    return (
      <ErrorState
        onRetry={() => floorsQuery.refetch()}
        message="Error al cargar las mesas"
      />
    );
  }

  const floors = floorsQuery.data || [];

  if (floors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-400">
        <Utensils className="w-16 h-16 mb-4 opacity-20" />
        <p className="text-xl font-semibold">No hay salones configurados</p>
      </div>
    );
  }

  const handleTableClick = (table: any) => {
    if (table.status === "disponible") {
      navigate(`/crear-orden/${table.id}`);
    } else if (table.status === "ocupada" && table.current_order_id) {
      // En un POS real, iríamos a ver la orden. Por ahora el requerimiento dice crear/add items
      navigate(`/crear-orden/${table.id}`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <Tabs defaultValue={floors[0].id} className="w-full">
        <div className="sticky top-0 z-20 bg-[#0f172a]/80 backdrop-blur-md pb-4 pt-2 -mx-4 px-4 lg:-mx-8 lg:px-8 overflow-x-auto scrollbar-none">
          <TabsList className="bg-slate-800/50 border border-slate-700/50 p-1 rounded-2xl inline-flex w-auto min-w-full lg:min-w-0">
            {floors.map((floor) => (
              <TabsTrigger
                key={floor.id}
                value={floor.id}
                className="rounded-xl px-6 py-2.5 data-[state=active]:bg-cyan-500 data-[state=active]:text-white transition-all whitespace-nowrap"
              >
                {floor.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {floors.map((floor) => (
          <TabsContent key={floor.id} value={floor.id} className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {floor.tables.map((table) => {
                const config =
                  statusConfig[table.status] || statusConfig.disponible;
                const StatusIcon = config.icon;

                return (
                  <Card
                    key={table.id}
                    className={cn(
                      "relative group cursor-pointer overflow-hidden border-slate-700/50 transition-all hover:scale-[1.03] active:scale-95 shadow-lg",
                      table.status === "disponible"
                        ? "bg-slate-800/40 hover:bg-slate-800/60 hover:border-cyan-500/30"
                        : "bg-slate-900/60 border-slate-800/50",
                    )}
                    onClick={() => handleTableClick(table)}
                  >
                    <div
                      className={cn(
                        "absolute top-0 left-0 w-1 h-full transition-colors",
                        table.status === "disponible"
                          ? "bg-emerald-500"
                          : table.status === "ocupada"
                            ? "bg-orange-500"
                            : table.status === "reservada"
                              ? "bg-blue-500"
                              : "bg-slate-500",
                      )}
                    />

                    <CardContent className="p-5 flex flex-col items-center gap-3">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:rotate-6 shadow-inner",
                          config.color,
                        )}
                      >
                        <StatusIcon className="w-6 h-6" />
                      </div>

                      <div className="text-center">
                        <span className="text-2xl font-black text-white block leading-none">
                          {table.table_number}
                        </span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "mt-2 border-0 text-[10px] font-black uppercase tracking-widest px-0",
                            config.color,
                          )}
                        >
                          {config.label}
                        </Badge>
                      </div>

                      {table.status === "ocupada" &&
                        table.current_order?.[0] && (
                          <div className="mt-1 pt-2 border-t border-slate-700/50 w-full text-center">
                            <p className="text-[10px] font-bold text-orange-400">
                              Total: S/ {table.current_order[0].total}
                            </p>
                          </div>
                        )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default FloorWithTablesPage;
