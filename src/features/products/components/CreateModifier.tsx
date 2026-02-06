import { useForm } from "react-hook-form";
import { useProduct } from "../hooks/useProduct";
import {
  createModifierSchema,
  type CreateModifierT,
} from "../schemas/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wand2, DollarSign, Tag, CheckCircle2 } from "lucide-react";

type Props = {
  productId: string;
  productName: string;
  onSuccess?: () => void;
};

const CreateModifier = ({ productId, productName, onSuccess }: Props) => {
  const { createModifier } = useProduct();

  const form = useForm<CreateModifierT>({
    resolver: zodResolver(createModifierSchema),
    defaultValues: {
      modifier_name: "",
      additional_price: 0,
      product_id: productId,
    },
  });

  const onSubmit = (data: CreateModifierT) => {
    createModifier.mutate(data, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
      },
    });
  };

  return (
    <DialogContent className="sm:max-w-[450px] bg-[#1e293b] border-slate-700 text-slate-100 shadow-2xl">
      <DialogHeader>
        <div className="mx-auto w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
          <Wand2 className="w-6 h-6 text-cyan-500" />
        </div>
        <DialogTitle className="text-center text-xl font-bold tracking-tight">
          Nuevo Modificador
        </DialogTitle>
        <DialogDescription className="text-center text-slate-400">
          Agrega un extra o modificación para{" "}
          <span className="text-cyan-400 font-semibold">{productName}</span>.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-2">
          <FormField
            control={form.control}
            name="modifier_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 text-sm font-semibold flex items-center">
                  <Tag className="w-4 h-4 mr-2 text-cyan-500" />
                  Nombre del Modificador
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. Extra Queso, Sin Ají, Picante, etc."
                    className="bg-slate-900/50 border-slate-700 focus:border-cyan-500/50 focus:ring-cyan-500/20 h-11 rounded-xl text-slate-100 text-sm transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additional_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 text-sm font-semibold flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-cyan-500" />
                  Precio Adicional (S/)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="bg-slate-900/50 border-slate-700 focus:border-cyan-500/50 focus:ring-cyan-500/20 h-11 rounded-xl text-slate-100 text-sm transition-all"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormDescription className="text-[10px] text-slate-500 font-medium italic">
                  * Este monto se sumará al total si el cliente elige este
                  extra.
                </FormDescription>
                <FormMessage className="text-red-400 text-xs mt-1" />
              </FormItem>
            )}
          />

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              disabled={createModifier.isPending}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold h-11 rounded-xl transition-all shadow-lg shadow-cyan-900/20"
            >
              {createModifier.isPending ? (
                "Creando Modificador..."
              ) : (
                <span className="flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Guardar Modificador
                </span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default CreateModifier;
