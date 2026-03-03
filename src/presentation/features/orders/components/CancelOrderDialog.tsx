import { useState } from "react";
import { useCancelOrder } from "@/application/hooks/useOrder";
import { Button } from "@/presentation/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/presentation/components/ui/dialog";
import { Textarea } from "@/presentation/components/ui/textarea";
import { AlertCircle, XCircle, Info, BadgeAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface CancelOrderDialogProps {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
  // onSuccess?: () => void;
}

const CancelOrderDialog = ({
  orderId,
  isOpen,
  onClose,
  // onSuccess,
}: CancelOrderDialogProps) => {
  const [reason, setReason] = useState("");
  const cancelOrder = useCancelOrder();

  const handleCancelOrder = () => {
    if (!reason.trim()) return;

    cancelOrder.mutate(
      {
        orderId: orderId,
        reason: reason.trim(),
      },
      {
        onSuccess: () => {
          setReason("");
          onClose();
          // onSuccess?.();
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#0f172a]/95 border-slate-800/60 backdrop-blur-xl text-white rounded-xl overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] p-0 border-t border-t-white/5">
        <div className="relative overflow-hidden pt-8 pb-4 px-8">
          {/* Decorative background glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/10 blur-[80px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-slate-500/5 blur-[80px] rounded-full" />

          <DialogHeader className="relative z-10 flex flex-col items-center text-center space-y-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full scale-150 group-hover:scale-175 transition-transform duration-500" />
              <div className="relative w-16 h-16 rounded-xl bg-linear-to-br from-red-500/20 to-red-600/5 border border-red-500/30 flex items-center justify-center shadow-inner">
                <XCircle className="w-8 h-8 text-red-500 animate-pulse-slow" />
              </div>
            </div>

            <div className="space-y-2 text-center">
              <DialogTitle className="text-2xl font-black tracking-tight bg-linear-to-b from-white to-slate-400 bg-clip-text text-transparent">
                Cancelar Pedido
              </DialogTitle>
              <DialogDescription className="text-slate-400 font-medium leading-relaxed max-w-[280px]">
                Esta acción es definitiva.
              </DialogDescription>
            </div>
          </DialogHeader>
        </div>

        <div className="px-8 pb-8 space-y-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                <Info className="w-3 h-3 text-red-500/70" />
                Motivo Obligatorio
              </label>
              {reason.length > 0 && (
                <span className="text-[10px] font-bold text-emerald-500/70 bg-emerald-500/5 px-2 py-0.5 rounded-full border border-emerald-500/10">
                  Completado
                </span>
              )}
            </div>

            <div className="relative group">
              <Textarea
                placeholder="Explica brevemente por qué se anula la orden..."
                className="resize-none bg-slate-950/40 border-slate-800/80 focus:border-red-500/40 focus:ring-4 focus:ring-red-500/5 rounded-[1.5rem] min-h-[120px] text-slate-200 placeholder:text-slate-600 transition-all duration-300 py-4 px-5 text-sm leading-relaxed"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <div className="absolute top-4 right-4 text-slate-700 group-focus-within:text-red-500/30 transition-colors">
                <BadgeAlert className="w-5 h-5" />
              </div>
            </div>
          </div>

          {!reason.trim() && (
            <div className="flex items-center gap-3 text-[11px] font-bold text-red-400 bg-red-500/10 p-4 rounded-2xl border border-red-500/20 animate-in fade-in slide-in-from-top-2">
              <div className="w-6 h-6 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4" />
              </div>
              <span>
                Por favor, especifica una razón para poder confirmar la
                anulación.
              </span>
            </div>
          )}
        </div>

        <DialogFooter className="bg-slate-950/80 p-6 border-t border-slate-800/40 flex flex-row gap-3 sm:justify-center">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-800/80 font-bold h-14 transition-all"
          >
            Regresar
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancelOrder}
            disabled={!reason.trim() || cancelOrder.isPending}
            className={cn(
              "flex-[1.5] rounded-2xl font-black h-14 shadow-2xl transition-all active:scale-95 disabled:opacity-30 disabled:grayscale relative overflow-hidden group",
              reason.trim()
                ? "bg-linear-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-red-500/25"
                : "bg-slate-800",
            )}
          >
            {cancelOrder.isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Procesando...</span>
              </div>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Confirmar Anulación
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOrderDialog;
