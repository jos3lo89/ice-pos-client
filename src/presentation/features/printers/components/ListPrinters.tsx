import { useState } from "react";
import {
  useDiscover,
  useNetworkConfig,
  usePrinters,
  useTestPrinter,
  useDeletePrinter,
} from "@/application/hooks/usePrinter";
import NetworkConfigDialog from "./NetworkConfigDialog";
import RegisterPrinterDialog from "./RegisterPrinterDialog";
import type {
  PrinterLocal,
  PrinterNetwork,
} from "@/core/entities/printer.entity";
import { Button } from "@/presentation/components/ui/button";
import { Badge } from "@/presentation/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/presentation/components/ui/card";
import { Network, Usb, Trash2, Printer, Settings, RefreshCw, AlertCircle } from "lucide-react";

const getPrinterIcon = (type: string) => {
  return type === "network" ? <Network className="w-5 h-5" /> : <Usb className="w-5 h-5" />;
};

const getBadgeStyles = (key: string) => {
  switch (key) {
    case "caja":
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    case "bar":
      return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20";
    case "cocina":
      return "bg-rose-500/10 text-rose-500 border-rose-500/20";
    case "network":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "usb":
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
};

const ListPrinters = () => {
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [printerToRegister, setPrinterToRegister] = useState<
    PrinterLocal | PrinterNetwork | null
  >(null);

  const { data: networkConfig, isError: noConfig } = useNetworkConfig();
  const {
    data: discoverData,
    isFetching: isScanning,
    refetch: runDiscover,
  } = useDiscover();
  const { data: savedPrinters, isLoading: loadingSaved } = usePrinters();
  const {
    mutate: testPrinter,
    isPending: isTesting,
    variables: testingNombre,
  } = useTestPrinter();
  const { mutate: deletePrinter } = useDeletePrinter();

  const handleDiscover = () => {
    if (noConfig || !networkConfig) {
      setShowConfigDialog(true);
      return;
    }
    runDiscover();
  };

  const allFound = [
    ...(discoverData?.local ?? []),
    ...(discoverData?.network ?? []),
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pt-4 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Printer className="w-6 h-6 text-cyan-500" />
            Gestión de Impresoras
          </h1>
          {networkConfig && (
            <p className="text-sm text-slate-400 mt-1 flex items-center gap-2">
              <Network className="w-4 h-4" />
              Red configurada: <span className="text-slate-200 font-medium">{networkConfig.segment}0/24</span>
              <button
                onClick={() => setShowConfigDialog(true)}
                className="text-cyan-500 hover:text-cyan-400 flex items-center gap-1 ml-2 transition-colors disabled:opacity-50"
              >
                <Settings className="w-3.5 h-3.5" />
                Cambiar
              </button>
            </p>
          )}
        </div>
        <Button
          onClick={handleDiscover}
          disabled={isScanning}
          className="bg-cyan-600 hover:bg-cyan-700 text-white min-w-[170px]"
        >
          {isScanning ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Escaneando...
            </>
          ) : noConfig || !networkConfig ? (
            <>
              <Settings className="w-4 h-4 mr-2" />
              Configurar y buscar
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Buscar impresoras
            </>
          )}
        </Button>
      </div>

      {(noConfig || !networkConfig) && !discoverData && (
        <Card className="bg-amber-500/10 border-amber-500/20">
          <CardContent className="flex items-center gap-3 py-4 text-amber-500">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">No hay segmento de red configurado. Haz clic en "Configurar y buscar" para comenzar.</p>
          </CardContent>
        </Card>
      )}

      {discoverData && allFound.length > 0 && (
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              Impresoras Encontradas
              <Badge variant="secondary" className="bg-slate-800 text-slate-300">
                {allFound.length}
              </Badge>
            </CardTitle>
            <CardDescription>Escaneo realizado en {discoverData.segment_scanned}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {allFound.map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-800/40 hover:bg-slate-800/80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${p.type === 'network' ? 'bg-blue-500/20 text-blue-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                    {getPrinterIcon(p.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-200">{p.name}</p>
                      <Badge variant="outline" className={`h-5 text-[10px] uppercase font-bold tracking-wider ${getBadgeStyles(p.type)}`}>
                        {p.type === "network" ? "Red" : "USB"}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                      {p.type === "network" ? (
                        <><Network className="w-3 h-3" /> {p.ip}:{p.port}</>
                      ) : (
                        <><Usb className="w-3 h-3" /> {p.detail}</>
                      )}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPrinterToRegister(p)}
                  className="border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10 hover:text-cyan-400"
                >
                  Registrar
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {discoverData && allFound.length === 0 && (
        <div className="p-8 text-center rounded-xl border border-dashed border-slate-700 bg-slate-900/40">
          <Printer className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 font-medium">No se encontraron impresoras en {discoverData.segment_scanned}</p>
        </div>
      )}

      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            Impresoras Registradas
            <Badge variant="secondary" className="bg-slate-800 text-slate-300">
              {savedPrinters?.length ?? 0}
            </Badge>
          </CardTitle>
          <CardDescription>Administra las impresoras guardadas en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingSaved ? (
            <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="h-20 bg-slate-800/50 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (!savedPrinters || savedPrinters.length === 0) ? (
            <div className="text-center py-8">
              <Printer className="w-12 h-12 text-slate-700 mx-auto mb-3" />
              <p className="text-slate-400">No tienes ninguna impresora registrada.</p>
              <p className="text-slate-500 text-sm mt-1">Realiza un escaneo y registra una para usar el sistema.</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {savedPrinters.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-800/40"
                >
                  <div className="flex items-center gap-4">
                     <div className="p-2.5 rounded-lg bg-slate-800 text-slate-400">
                        {getPrinterIcon(p.tipo)}
                     </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-200">
                          {p.tipo === "network" ? p.ip : p.nombre}
                        </p>
                        <Badge variant="outline" className={`h-5 text-[10px] uppercase font-bold tracking-wider ${getBadgeStyles(p.nombre)}`}>
                          {p.nombre}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                        {p.tipo === "usb" ? (
                          <span className="flex items-center gap-1.5"><Usb className="w-3.5 h-3.5" /> USB local</span>
                        ) : (
                          <span className="flex items-center gap-1.5"><Network className="w-3.5 h-3.5" /> Puerto {p.puerto}</span>
                        )}
                        {!p.activa && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-slate-600" />
                            <span className="text-amber-500">Desactivada</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => testPrinter(p.nombre)}
                      disabled={isTesting && testingNombre === p.nombre}
                      className="border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300"
                    >
                      {isTesting && testingNombre === p.nombre ? "Probando..." : "Test"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deletePrinter(p.nombre)}
                      className="bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white border border-rose-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <NetworkConfigDialog
        open={showConfigDialog}
        onClose={() => setShowConfigDialog(false)}
      />
      <RegisterPrinterDialog
        open={!!printerToRegister}
        printer={printerToRegister}
        onClose={() => setPrinterToRegister(null)}
      />
    </div>
  );
};

export default ListPrinters;
