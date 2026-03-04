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
} from "@/presentation/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/presentation/components/ui/form";
import { Input } from "@/presentation/components/ui/input";
import { Button } from "@/presentation/components/ui/button";
import { Textarea } from "@/presentation/components/ui/textarea";
import { Wallet, Coins, NotebookPen, Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useOpenSession } from "@/application/hooks/useCashier";

const openSessionSchema = z.object({
  openingBalance: z
    .number("El monto debe ser un número")
    .min(0, "El monto no puede ser negativo"),
  notes: z
    .string()
    .max(200, "Las notas no pueden exceder los 200 caracteres")
    .optional(),
});

type OpenSessionFormValues = z.infer<typeof openSessionSchema>;

interface OpenSessionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OpenSessionDialog = ({
  isOpen,
  onOpenChange,
}: OpenSessionDialogProps) => {
  const queryClient = useQueryClient();
  const { mutate: openSession, isPending } = useOpenSession();

  const form = useForm<OpenSessionFormValues>({
    resolver: zodResolver(openSessionSchema),
    defaultValues: {
      openingBalance: 0,
      notes: "",
    },
  });

  const onSubmit = (values: OpenSessionFormValues) => {
    openSession(
      {
        openingBalance: values.openingBalance,
        notes: values.notes || "",
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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] bg-[#0f172a] border-slate-800 text-white overflow-hidden p-0 rounded-xl border shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500" />

        <div className="p-4 space-y-6">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-left">
                <DialogTitle className="text-2xl font-black tracking-tight text-white">
                  Apertura de Caja
                </DialogTitle>
                <DialogDescription className="text-slate-400 font-medium">
                  Inicia una nueva sesión de venta y registra el saldo inicial
                  en efectivo.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="openingBalance"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <Coins className="w-4 h-4 text-emerald-500" />
                      Monto Inicial (S/)
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold group-focus-within:text-emerald-500 transition-colors">
                          S/
                        </span>
                        <Input
                          placeholder="0.00"
                          type="number"
                          step="0.10"
                          className="pl-10 h-14 bg-slate-900/50 border-slate-700/50 rounded-2xl text-lg font-black text-white focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-600"
                          {...field}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            field.onChange(isNaN(value) ? "" : value);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs font-medium text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <NotebookPen className="w-4 h-4 text-emerald-500" />
                      Notas de Apertura
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej. Cambio recibido del turno anterior..."
                        className="min-h-[100px] bg-slate-900/50 border-slate-700/50 rounded-2xl resize-none focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-600 px-4 py-3"
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
                  className="flex-1 h-12 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm rounded-xl shadow-xl shadow-emerald-900/20 transition-all hover:scale-[1.02] active:scale-95 gap-2"
                >
                  {isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Wallet className="w-5 h-5" />
                  )}
                  {isPending ? "Procesando..." : "Confirmar Apertura"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
