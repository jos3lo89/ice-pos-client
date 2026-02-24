import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateOrder } from "../hooks/useOrder";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Loader2, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  tableId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
const CreateOrderDialog = ({ tableId, open, onOpenChange }: Props) => {
  const createOrder = useCreateOrder();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<{
    notes: string;
  }>({
    defaultValues: {
      notes: "",
    },
  });

  const onSubmit = (data: { notes: string }) => {
    createOrder.mutate(
      {
        table_id: tableId,
        notes: data.notes,
      },
      {
        onSuccess: (data) => {
          onOpenChange(false);
          navigate(`/agregar-item/${data.id}`);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px] bg-[#0f172a] border-slate-800 p-0 overflow-hidden outline-none ring-0">
        <DialogHeader className="px-6 py-8 bg-slate-900/50 border-b border-slate-800 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
              <ClipboardList className="text-cyan-400 w-6 h-6" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-black text-white tracking-tight uppercase">
                Crear Orden
              </DialogTitle>
              <DialogDescription className="text-slate-500 font-medium">
                Inicia una nueva comanda para la mesa.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500">
                Notas de la Orden
              </Label>
              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                Opcional
              </span>
            </div>
            <div className="relative group">
              <Textarea
                placeholder="Ej. Sin cebolla, término medio, alérgicos..."
                className={cn(
                  "bg-slate-900/40 border-slate-800 text-white placeholder:text-slate-600",
                  "rounded-2xl resize-none transition-all duration-300",
                  "focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 focus:bg-slate-900/60",
                  "hover:border-slate-700",
                )}
                {...register("notes")}
              />
            </div>
          </div>

          <DialogFooter className="pt-2 flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 rounded-xl border-slate-800 bg-transparent hover:bg-slate-800/50 font-bold text-slate-400 border-2 transition-all duration-300"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createOrder.isPending}
              className={cn(
                "flex-1 h-12 rounded-xl bg-cyan-500 hover:bg-cyan-400 font-black text-white shadow-xl shadow-cyan-500/20",
                "transition-all duration-300 active:scale-[0.98] disabled:opacity-50",
                "flex items-center justify-center gap-2",
              )}
            >
              {createOrder.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creando...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-5 h-5" />
                  <span>Crear Orden</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default CreateOrderDialog;
