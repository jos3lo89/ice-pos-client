import { PDFViewer, pdf } from "@react-pdf/renderer";
import printJS from "print-js";
import { Printer, Receipt, X } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/presentation/components/ui/dialog";
import LoadingState from "@/presentation/components/LoadingState";
import ErrorState from "@/presentation/components/ErrorState";
import { useGetTicket } from "@/application/hooks/usePayment";
import TicketVentaPdf from "./TicketVentaPdf";
import { toast } from "sonner";

interface TicketVentaDialogV2Props {
  isTicketDialogOpen: boolean;
  setIsTicketDialogOpen: (value: boolean) => void;
  paymentId: string;
}

const TicketVentaDialog = ({
  isTicketDialogOpen,
  setIsTicketDialogOpen,
  paymentId,
}: TicketVentaDialogV2Props) => {
  const {
    data: ticketData,
    isLoading,
    isError,
    refetch,
  } = useGetTicket(paymentId);

  const handlePrint = async () => {
    if (!ticketData) {
      toast.error("No se pudo obtener la información del ticket");
      return;
    }
    const blob = await pdf(TicketVentaPdf({ data: ticketData })).toBlob();
    const url = URL.createObjectURL(blob);
    printJS({ printable: url, type: "pdf" });
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
      <DialogContent className="max-w-2xl w-[95vw] h-[90vh] bg-[#0f172a] border-slate-800 p-0 overflow-hidden shadow-2xl rounded-xl flex flex-col gap-0 transition-all duration-300">
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
            Previsualización e impresión del ticket
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col overflow-hidden relative">
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 animate-in fade-in zoom-in-95 duration-500">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
                <LoadingState message="Estructurando datos para el ticket..." />
              </div>
            </div>
          ) : isError ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-500">
              <ErrorState
                title="Error de carga"
                message="Tuvimos problemas para obtener los detalles de la venta."
                onRetry={refetch}
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex-1 overflow-hidden">
                {ticketData && (
                  <PDFViewer
                    showToolbar={false}
                    className="w-full h-full border-none opacity-90 hover:opacity-100 transition-opacity duration-300"
                  >
                    <TicketVentaPdf data={ticketData} />
                  </PDFViewer>
                )}
              </div>

              <div className="p-6 bg-slate-900/80 backdrop-blur-md border-t border-white/5 flex flex-wrap items-center justify-between gap-4 shrink-0 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.5)]">
                <Button
                  variant="ghost"
                  onClick={() => setIsTicketDialogOpen(false)}
                  className="text-slate-400 hover:text-white hover:bg-white/5 font-bold transition-all px-6 rounded-lg hover:scale-105"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cerrar
                </Button>

                <Button
                  variant="default"
                  onClick={handlePrint}
                  className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black px-8 h-12 rounded-lg transition-all shadow-xl shadow-emerald-500/20 active:scale-95 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <Printer className="w-5 h-5 mr-2 relative z-10 group-hover:animate-bounce" />
                  <span className="relative z-10">Imprimir Ticket</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketVentaDialog;
