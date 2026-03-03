import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Ban, Coins, NotebookPen, Loader2, AlertCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useCloseSession } from "@/application/hooks/useCashier";

const closeSessionSchema = z.object({
  actualBalance: z.number().min(0, "El monto no puede ser negativo"),
  notes: z
    .string()
    .max(200, "Las notas no pueden exceder los 200 caracteres")
    .optional(),
});

type CloseSessionFormValues = z.infer<typeof closeSessionSchema>;

interface CloseSessionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  sessionId: string;
  expectedBalance: number;
}

export const CloseSessionDialog = ({
  isOpen,
  onOpenChange,
  sessionId,
  expectedBalance,
}: CloseSessionDialogProps) => {
  const queryClient = useQueryClient();
  const { mutate: closeSession, isPending } = useCloseSession();

  const form = useForm<CloseSessionFormValues>({
    resolver: zodResolver(closeSessionSchema),
    defaultValues: {
      actualBalance: 0,
      notes: "",
    },
  });

  const onSubmit = (values: CloseSessionFormValues) => {
    closeSession(
      {
        sessionId,
        values: {
          actualBalance: values.actualBalance,
          notes: values.notes || "",
        },
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          form.reset();
          queryClient.invalidateQueries({
            queryKey: ["cash-register", "session", "active"],
          });
        },
      },
    );
  };

  const actualBalance = form.watch("actualBalance");
  const difference = actualBalance - expectedBalance;
  const isBalanced = difference === 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] bg-[#0f172a] border-slate-800 text-white overflow-hidden p-0 rounded-3xl border shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-500 via-orange-500 to-rose-500" />

        <div className="p-8 space-y-6">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <Ban className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-left">
                <DialogTitle className="text-2xl font-black tracking-tight text-white">
                  Arqueo y Cierre
                </DialogTitle>
                <DialogDescription className="text-slate-400 font-medium">
                  Finaliza el turno actual y registra el dinero real contado en
                  caja.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-4 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                Saldo Esperado
              </p>
              <p className="text-xl font-black text-white">
                S/ {expectedBalance.toFixed(2)}
              </p>
            </div>
            <div className="h-10 w-px bg-slate-800" />
            <div className="space-y-1 text-right">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                Diferencia
              </p>
              <p
                className={`text-xl font-black ${difference >= 0 ? (isBalanced ? "text-emerald-400" : "text-blue-400") : "text-red-400"}`}
              >
                {difference > 0 ? "+" : ""}S/ {difference.toFixed(2)}
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="actualBalance"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <Coins className="w-4 h-4 text-orange-500" />
                      Saldo Real en Efectivo (S/)
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold group-focus-within:text-orange-500 transition-colors">
                          S/
                        </span>
                        <Input
                          placeholder="0.00"
                          type="number"
                          step="0.10"
                          className="pl-10 h-14 bg-slate-900/50 border-slate-700/50 rounded-2xl text-lg font-black text-white focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-600"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber || 0)
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs font-medium text-red-400" />
                  </FormItem>
                )}
              />

              {!isBalanced && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-200/80 leading-relaxed font-medium">
                    Hay una diferencia de{" "}
                    <span className="font-bold text-amber-400">
                      S/ {Math.abs(difference).toFixed(2)}
                    </span>{" "}
                    respecto al saldo esperado. Asegúrate de que el conteo sea
                    correcto.
                  </p>
                </div>
              )}

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <NotebookPen className="w-4 h-4 text-orange-500" />
                      Notas de Cierre
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Observaciones sobre el arqueo o discrepancias..."
                        className="min-h-[80px] bg-slate-900/50 border-slate-700/50 rounded-2xl resize-none focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-600 px-4 py-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-medium text-red-400" />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-2 flex sm:justify-between items-center gap-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onOpenChange(false)}
                  className="h-12 px-6 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-bold transition-all"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 h-12 bg-linear-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm rounded-xl shadow-xl shadow-red-900/20 transition-all hover:scale-[1.02] active:scale-95 gap-2"
                >
                  {isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Ban className="w-5 h-5" />
                  )}
                  {isPending ? "Cerrando..." : "Proceder al Cierre"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
