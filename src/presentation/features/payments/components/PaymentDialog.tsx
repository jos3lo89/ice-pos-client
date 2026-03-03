import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Wallet,
  CreditCard,
  Smartphone,
  Ticket,
  FileText,
  Receipt,
  Loader2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGetDefaultClient } from "@/application/hooks/useClient";
import {
  paymentSchema,
  type PaymentFormValues,
} from "../schemas/payment.schema";
import { cn } from "@/lib/utils";
import { formatPricePEN } from "@/utils/format-price";
import { useMemo, useEffect } from "react";
import { useCreatePayment } from "@/application/hooks/usePayment";

interface PaymentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
  totalAmount: number;
  itemIds: string[];
  onSuccess?: () => void;
}

export const PaymentDialog = ({
  isOpen,
  onOpenChange,
  orderId,
  totalAmount,
  itemIds,
  onSuccess,
}: PaymentDialogProps) => {
  const { mutate: createPayment, isPending } = useCreatePayment();
  const { data: defaultClient } = useGetDefaultClient();

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      orderId,
      method: "efectivo",
      tipoDocumento: "ticket",
      montoRecibido: 0,
      transactionId: "",
      notes: "",
      clienteId: defaultClient?.id || "",
      lines: itemIds.map((id) => ({ orderItemId: id })),
    },
  });

  // Sync itemIds if they change
  useEffect(() => {
    form.setValue(
      "lines",
      itemIds.map((id) => ({ orderItemId: id })),
    );
  }, [itemIds, form]);

  useEffect(() => {
    if (defaultClient?.id) {
      form.setValue("clienteId", defaultClient.id);
    }
  }, [defaultClient, form]);

  const method = form.watch("method");
  const montoRecibido = form.watch("montoRecibido") || 0;

  const changeAmount = useMemo(() => {
    if (method !== "efectivo") return 0;
    return Math.max(0, montoRecibido - totalAmount);
  }, [method, montoRecibido, totalAmount]);

  const onSubmit = (values: PaymentFormValues) => {
    const payload = {
      ...values,
      // Clean up optional fields based on method
      montoRecibido: values.method === "efectivo" ? values.montoRecibido : null,
      transactionId:
        values.method !== "efectivo" && values.transactionId?.trim()
          ? values.transactionId
          : null,
      notes: values.notes?.trim() || null,
      clienteId: values.clienteId || defaultClient?.id || "",
    };

    createPayment(payload as any, {
      onSuccess: () => {
        onOpenChange(false);
        form.reset();
        onSuccess?.();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] bg-[#0f172a] border-slate-800 text-white overflow-hidden p-0 rounded-3xl border shadow-2xl flex flex-col">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 z-50" />

        <div className="p-6 border-b border-white/5">
          <DialogHeader>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-left">
                <DialogTitle className="text-2xl font-black tracking-tight text-white">
                  Procesar Pago
                </DialogTitle>
                <DialogDescription className="text-slate-400 text-xs font-medium">
                  Confirma el método de pago y el tipo de comprobante.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6 space-y-6">
            <Form {...form}>
              <form
                id="payment-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Amount highlights */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-4 flex flex-col justify-center">
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-0.5">
                      Total a Pagar
                    </span>
                    <span className="text-2xl font-black text-white">
                      {formatPricePEN(totalAmount)}
                    </span>
                  </div>
                  {method === "efectivo" && (
                    <div
                      className={cn(
                        "border rounded-xl p-4 flex flex-col justify-center transition-all animate-in slide-in-from-right-4",
                        changeAmount > 0
                          ? "bg-blue-500/10 border-blue-500/20"
                          : "bg-slate-900/50 border-slate-800/50",
                      )}
                    >
                      <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-0.5">
                        Vuelto
                      </span>
                      <span
                        className={cn(
                          "text-2xl font-black",
                          changeAmount > 0 ? "text-blue-400" : "text-slate-600",
                        )}
                      >
                        {formatPricePEN(changeAmount)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Payment Methods */}
                <div className="space-y-2">
                  <FormLabel className="text-xs font-bold text-slate-400 flex items-center gap-2">
                    <CreditCard className="w-3 h-3 text-emerald-500" />
                    Método de Pago
                  </FormLabel>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      {
                        id: "efectivo",
                        label: "Efectivo",
                        icon: Wallet,
                        color:
                          "hover:border-emerald-500 active:bg-emerald-500/10",
                      },
                      {
                        id: "yape",
                        label: "Yape",
                        icon: Smartphone,
                        color:
                          "hover:border-purple-500 active:bg-purple-500/10",
                      },
                      {
                        id: "plin",
                        label: "Plin",
                        icon: Smartphone,
                        color: "hover:border-blue-500 active:bg-blue-500/10",
                      },
                      {
                        id: "tarjeta",
                        label: "Tarjeta",
                        icon: CreditCard,
                        color:
                          "hover:border-orange-500 active:bg-orange-500/10",
                      },
                    ].map((m: any) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => form.setValue("method", m.id)}
                        className={cn(
                          "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all gap-1 group",
                          method === m.id
                            ? "bg-white/5 border-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                            : "bg-slate-900/50 border-slate-700/50 text-slate-500 grayscale opacity-60 hover:grayscale-0 hover:opacity-100",
                          m.color,
                        )}
                      >
                        <m.icon
                          className={cn(
                            "w-5 h-5 transition-transform group-hover:scale-110",
                            method === m.id
                              ? "text-emerald-400"
                              : "text-slate-600",
                          )}
                        />
                        <span className="text-[9px] font-black uppercase tracking-widest">
                          {m.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic Inputs Based on Method */}
                <div className="grid grid-cols-1 animate-in fade-in duration-500">
                  {method === "efectivo" ? (
                    <FormField
                      control={form.control}
                      name="montoRecibido"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-xs font-bold flex items-center gap-2 text-emerald-400">
                            Monto Recibido (S/)
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
                                className="pl-10 h-12 bg-slate-900/50 border-slate-700/50 rounded-xl text-lg font-black text-white focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-700"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(e.target.valueAsNumber || 0)
                                }
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-[10px] font-medium text-red-400" />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <FormField
                      control={form.control}
                      name="transactionId"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-xs font-bold text-slate-400 flex items-center gap-2">
                            Número de Transacción / Identificador (Opcional)
                          </FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                              <Input
                                placeholder="Ej: 987654..."
                                className="pl-10 h-12 bg-slate-900/50 border-slate-700/50 rounded-xl text-base font-bold text-white focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-700"
                                {...field}
                                value={field.value || ""}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-[10px] font-medium text-red-400" />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {/* Receipt Types */}
                <div className="space-y-2">
                  <FormLabel className="text-xs font-bold text-slate-400 flex items-center gap-2">
                    <Receipt className="w-3 h-3 text-emerald-500" />
                    Tipo de Comprobante
                  </FormLabel>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        id: "ticket",
                        label: "TICKET",
                        icon: Ticket,
                        enabled: true,
                      },
                      {
                        id: "boleta",
                        label: "BOLETA",
                        icon: FileText,
                        enabled: false,
                      },
                      {
                        id: "factura",
                        label: "FACTURA",
                        icon: FileText,
                        enabled: false,
                      },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        disabled={!t.enabled}
                        onClick={() =>
                          t.enabled &&
                          form.setValue("tipoDocumento", t.id as any)
                        }
                        className={cn(
                          "relative h-14 rounded-xl border-2 transition-all flex items-center px-3 gap-3 overflow-hidden",
                          form.watch("tipoDocumento") === t.id
                            ? "bg-emerald-500/10 border-emerald-500 text-white"
                            : "bg-slate-900/50 border-slate-800 text-slate-600 grayscale opacity-40",
                          !t.enabled && "cursor-not-allowed border-dashed",
                        )}
                      >
                        <t.icon
                          className={cn(
                            "w-4 h-4",
                            form.watch("tipoDocumento") === t.id
                              ? "text-emerald-400"
                              : "text-slate-700",
                          )}
                        />
                        <span className="text-[10px] font-black tracking-widest">
                          {t.label}
                        </span>
                        {!t.enabled && (
                          <div className="absolute top-0.5 right-0.5">
                            <Badge className="text-[6px] p-0 px-1 bg-slate-800 text-slate-400 border-none leading-tight h-3">
                              Próx.
                            </Badge>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-xs font-bold text-slate-400">
                        Notas adicionales
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Consideraciones del pago..."
                          className="min-h-[60px] bg-slate-900/50 border-slate-700/50 rounded-xl resize-none focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-700 px-3 py-2 text-xs"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>

        <div className="p-6 bg-slate-900/80 border-t border-white/5">
          <DialogFooter className="flex sm:justify-between items-center gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="h-10 px-6 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-bold transition-all text-sm"
            >
              Cancelar
            </Button>
            <Button
              form="payment-form"
              type="submit"
              disabled={
                isPending || (method === "efectivo" && changeAmount < 0)
              }
              className="flex-1 h-12 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base rounded-xl shadow-2xl shadow-emerald-900/40 transition-all hover:scale-[1.01] active:scale-95 gap-2"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
              {isPending ? "Procesando..." : "Confirmar Pago"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
