import ErrorState from "@/components/common/ErrorState";
import LoadingState from "@/components/common/LoadingState";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TicketOutput } from "@/utils/ticket/ticket.interface";
import TicketVenta from "@/utils/ticket/TicketVenta";
import { Printer, Receipt, Eye, X, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useGetTicket } from "@/application/hooks/usePayment";

interface TicketVentaDialogProps {
  isTicketDialogOpen: boolean;
  setIsTicketDialogOpen: (value: boolean) => void;
  paymentId: string;
}

export const TicketVentaDialog = ({
  isTicketDialogOpen,
  setIsTicketDialogOpen,
  paymentId,
}: TicketVentaDialogProps) => {
  const [base64, setBase64] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    data: ticketData,
    isLoading,
    isError,
    refetch,
  } = useGetTicket(paymentId);

  // Generar vista previa automáticamente al cargar los datos
  useEffect(() => {
    if (ticketData && !base64) {
      onGenerateTicket("b64");
    }
  }, [ticketData]);

  if (isLoading) {
    return (
      <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
        <DialogContent className="max-w-md bg-slate-900 border-slate-800 p-12 shadow-2xl rounded-xl flex flex-col items-center justify-center">
          <DialogHeader>
            <DialogTitle>Ticket de Venta</DialogTitle>
            <DialogDescription>
              Cargando información del ticket...
            </DialogDescription>
          </DialogHeader>
          <LoadingState message="Cargando información del ticket..." />
        </DialogContent>
      </Dialog>
    );
  }

  if (isError) {
    return (
      <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
        <DialogContent className="max-w-md bg-slate-900 border-slate-800 p-12 shadow-2xl rounded-xl">
          <DialogHeader>
            <DialogTitle>Ticket de Venta</DialogTitle>
            <DialogDescription>
              Error al cargar la información del ticket
            </DialogDescription>
          </DialogHeader>
          <ErrorState
            message="Error al cargar la información del ticket"
            onRetry={refetch}
          />
        </DialogContent>
      </Dialog>
    );
  }

  const onGenerateTicket = async (output: TicketOutput) => {
    if (!ticketData) return;

    setIsGenerating(true);
    try {
      const dataEmpresa = {
        logo: "/logo/logo-ice.png",
        ...ticketData,
      };

      const response = await TicketVenta(dataEmpresa, output);
      if (output === "b64" && response.success && response.content) {
        setBase64(response.content);
      }
    } catch (error) {
      console.error("Error generating ticket:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
      <DialogContent className="max-w-2xl w-[95vw] h-[90vh] bg-[#0f172a] border-slate-800 p-0 overflow-hidden shadow-2xl rounded-xl flex flex-col gap-0 ">
        <DialogHeader className="p-4 flex flex-row items-center justify-between border-b border-white/5 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-inner">
              <Receipt className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-0.5">
              <DialogTitle className="text-xl font-black text-white tracking-tight">
                Ticket de Venta
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="sr-only">
            Previsualización y descarga del ticket
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 bg-slate-950/50 overflow-hidden relative group">
          {base64 ? (
            <iframe
              title="Ticket Preview"
              className="w-full h-full border-none"
              src={`data:application/pdf;base64,${base64}#toolbar=0&navpanes=0&scrollbar=0`}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-4 animate-pulse">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
                <FileText className="w-8 h-8 text-slate-600" />
              </div>
              <p className="text-slate-500 font-bold text-sm tracking-wide">
                Generando vista previa...
              </p>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-900/80 backdrop-blur-md border-t border-white/5 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <Button
            variant="ghost"
            onClick={() => setIsTicketDialogOpen(false)}
            className="text-slate-400 hover:text-white hover:bg-white/5 font-bold transition-all px-6 rounded-lg hover:scale-105"
          >
            <X className="w-4 h-4 mr-2" />
            Cerrar
          </Button>

          <div className="flex gap-3">
            <Button
              variant="outline"
              disabled={isGenerating}
              onClick={() => onGenerateTicket("b64")}
              className={cn(
                "border-slate-700 bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700 font-bold px-6 h-12 rounded-lg transition-all shadow-lg hover:shadow-white/5",
                isGenerating && "opacity-50",
              )}
            >
              <Eye className="w-4 h-4 mr-2" />
              Actualizar Vista
            </Button>

            <Button
              variant="default"
              disabled={isGenerating}
              onClick={() => onGenerateTicket("print")}
              className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black px-8 h-12 rounded-lg transition-all shadow-xl shadow-emerald-500/20 active:scale-95 group"
            >
              <Printer className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Imprimir Ticket
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
