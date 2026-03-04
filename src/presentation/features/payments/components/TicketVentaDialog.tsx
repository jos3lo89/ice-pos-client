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

  return (
    <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
      <DialogContent className="max-w-2xl w-[95vw] h-[90vh] bg-[#0f172a] border-slate-800 p-0 overflow-hidden shadow-2xl rounded-xl flex flex-col gap-0">
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

        <div className="flex-1 overflow-hidden">
          {ticketData && (
            <PDFViewer
              showToolbar={false}
              className="w-full h-full border-none"
            >
              <TicketVentaPdf data={ticketData} />
            </PDFViewer>
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

          <Button
            variant="default"
            onClick={handlePrint}
            className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black px-8 h-12 rounded-lg transition-all shadow-xl shadow-emerald-500/20 active:scale-95 group"
          >
            <Printer className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Imprimir Ticket
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketVentaDialog;
