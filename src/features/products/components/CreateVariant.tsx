import { useForm } from "react-hook-form";
import { useCreateVariant } from "../hooks/useProduct";
import {
  createVariantSchema,
  type CreateVariantT,
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Layers, DollarSign, Package, CheckCircle2 } from "lucide-react";

type Props = {
  productId: string;
  productName: string;
  onSuccess?: () => void;
};

const CreateVariant = ({ productId, productName, onSuccess }: Props) => {
  const createVariant = useCreateVariant();

  const form = useForm<CreateVariantT>({
    resolver: zodResolver(createVariantSchema),
    defaultValues: {
      variant_name: "",
      additional_price: 0,
      product_id: productId,
    },
  });

  const onSubmit = (data: CreateVariantT) => {
    createVariant.mutate(data, {
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
          <Layers className="w-6 h-6 text-cyan-500" />
        </div>
        <DialogTitle className="text-center text-xl font-bold tracking-tight">
          Nueva Variante
        </DialogTitle>
        <DialogDescription className="text-center text-slate-400">
          Agrega una opción adicional para{" "}
          <span className="text-cyan-400 font-semibold">{productName}</span>.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-2">
          <FormField
            control={form.control}
            name="variant_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 text-sm font-semibold flex items-center">
                  <Package className="w-4 h-4 mr-2 text-cyan-500" />
                  Nombre de la Variante
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. Tamaño Familiar, Sin cebolla, etc."
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
                  * Este monto se sumará al precio base del producto.
                </FormDescription>
                <FormMessage className="text-red-400 text-xs mt-1" />
              </FormItem>
            )}
          />

          <DialogFooter className="pt-4 drop-shadow-2xl">
            <Button
              type="submit"
              disabled={createVariant.isPending}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold h-11 rounded-xl transition-all shadow-lg shadow-cyan-900/20"
            >
              {createVariant.isPending ? (
                "Creando Variante..."
              ) : (
                <span className="flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Guardar Variante
                </span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default CreateVariant;
