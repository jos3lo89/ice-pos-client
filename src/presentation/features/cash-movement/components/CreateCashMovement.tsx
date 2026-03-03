import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";
import { Input } from "@/presentation/components/ui/input";
import { Textarea } from "@/presentation/components/ui/textarea";
import { Button } from "@/presentation/components/ui/button";
import { useCreateCashMovements } from "@/application/hooks/useCashMovements";
import {
  PlusCircle,
  MinusCircle,
  Receipt,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  cashMovementSchema,
  type CashMovementFormValues,
} from "../schemas/created-movement.schema";

interface CreateCashMovementProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateCashMovement = ({
  isOpen,
  onOpenChange,
}: CreateCashMovementProps) => {
  const { mutate: createMovement, isPending } = useCreateCashMovements();

  const form = useForm<CashMovementFormValues>({
    resolver: zodResolver(cashMovementSchema),
    defaultValues: {
      tipo: "ingreso_manual",
      monto: 0,
      descripcion: "",
    },
  });

  const onSubmit = (data: CashMovementFormValues) => {
    createMovement(
      {
        ...data,
        descripcion: data.descripcion || null,
      },
      {
        onSuccess: () => {
          form.reset();
          onOpenChange(false);
        },
      },
    );
  };

  const selectedType = form.watch("tipo");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-[#0f172a] border-slate-800 text-white rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-500 via-blue-500 to-purple-500 opacity-50" />

        <DialogHeader className="pt-2">
          <div className="flex items-center gap-3 mb-2">
            <div
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500",
                selectedType === "ingreso_manual"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : selectedType === "egreso_manual"
                    ? "bg-red-500/10 text-red-400"
                    : "bg-amber-500/10 text-amber-400",
              )}
            >
              {selectedType === "ingreso_manual" && (
                <ArrowUpCircle className="w-7 h-7" />
              )}
              {selectedType === "egreso_manual" && (
                <ArrowDownCircle className="w-7 h-7" />
              )}
              {selectedType === "egreso_gasto" && (
                <Receipt className="w-7 h-7" />
              )}
            </div>
            <div>
              <DialogTitle className="text-2xl font-black tracking-tight text-white">
                Nuevo Movimiento
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Registra una entrada o salida de efectivo manual.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 pt-4"
          >
            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Tipo de Movimiento
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-14 bg-slate-900/50 border-slate-800 rounded-2xl focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all text-sm font-semibold">
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-slate-900 border-slate-800 text-white rounded-2xl">
                      <SelectItem
                        value="ingreso_manual"
                        className="focus:bg-emerald-500/10 focus:text-emerald-400 rounded-xl cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <PlusCircle className="w-4 h-4 text-emerald-400" />
                          <span>Ingreso Manual</span>
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="egreso_manual"
                        className="focus:bg-red-500/10 focus:text-red-400 rounded-xl cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <MinusCircle className="w-4 h-4 text-red-400" />
                          <span>Egreso Manual</span>
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="egreso_gasto"
                        className="focus:bg-amber-500/10 focus:text-amber-400 rounded-xl cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Receipt className="w-4 h-4 text-amber-400" />
                          <span>Gasto Administrativo</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[10px] font-bold text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Monto (S/)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
                        S/
                      </div>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="h-14 bg-slate-900/50 border-slate-800 rounded-2xl pl-10 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all text-lg font-black"
                        {...field}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          field.onChange(isNaN(value) ? "" : value);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Descripción / Motivo
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ej: Pago de servicios, compra de suministros, etc."
                      className="min-h-[100px] bg-slate-900/50 border-slate-800 rounded-2xl focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all resize-none text-sm leading-relaxed"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold text-red-400" />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-between gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-12 flex-1 rounded-xl border-slate-800 bg-transparent text-white font-bold hover:bg-slate-800/50 transition-all"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className={cn(
                  "h-12 flex-1 rounded-xl font-bold transition-all shadow-lg active:scale-95",
                  selectedType === "ingreso_manual"
                    ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20"
                    : selectedType === "egreso_manual"
                      ? "bg-red-600 hover:bg-red-500 shadow-red-900/20"
                      : "bg-amber-600 hover:bg-amber-500 shadow-amber-900/20",
                )}
              >
                {isPending ? "Guardando..." : "Confirmar Movimiento"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCashMovement;
