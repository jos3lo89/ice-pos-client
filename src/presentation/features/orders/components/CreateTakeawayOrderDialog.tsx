import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/presentation/components/ui/dialog";
import { Button } from "@/presentation/components/ui/button";
import { Label } from "@/presentation/components/ui/label";
import { Input } from "@/presentation/components/ui/input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Loader2, PlusCircle, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreateOrder } from "@/application/hooks/useOrder";
import { useAuthStore } from "@/application/stores/auth.store";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
const CreateTakeawayOrderDialog = ({ open, onOpenChange }: Props) => {
  const createOrder = useCreateOrder();
  const navigate = useNavigate();
  const { user } = useAuthStore();

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
        tipo_orden: "para_llevar",
        notes: data.notes,
      },
      {
        onSuccess: (data) => {
          onOpenChange(false);
          if (user?.rol === "cajero") {
            navigate(`/punto-venta/agregar/${data.id}`);
          } else {
            navigate(`/agregar-item/${data.id}`);
          }
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
              <ShoppingBag className="text-cyan-400 w-6 h-6" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-black text-white tracking-tight uppercase">
                Para Llevar
              </DialogTitle>
              <DialogDescription className="text-slate-500 font-medium">
                Inicia una orden para llevar.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500">
                Nombre del Cliente / Notas
              </Label>
              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                Opcional
              </span>
            </div>
            <div className="relative group">
              <Input
                placeholder="Ej. Juan Pérez"
                className={cn(
                  "bg-slate-900/40 border-slate-800 text-white placeholder:text-slate-600",
                  "rounded-2xl transition-all duration-300 h-12",
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
export default CreateTakeawayOrderDialog;
