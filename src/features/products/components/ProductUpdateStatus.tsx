import { useForm, Controller } from "react-hook-form";
import { useProduct } from "../hooks/useProduct";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RefreshCw, CheckCircle2, XCircle } from "lucide-react";

type Props = {
  productId: string;
  productName: string;
  isAvailable: boolean;
  onSuccess?: () => void;
};

const ProductUpdateStatus = ({
  productId,
  productName,
  isAvailable,
  onSuccess,
}: Props) => {
  const { updateStatusProduct } = useProduct();

  const { handleSubmit, control, watch } = useForm<{
    is_available: boolean;
  }>({
    defaultValues: {
      is_available: isAvailable,
    },
  });

  const currentStatus = watch("is_available");

  const onSubmit = (data: { is_available: boolean }) => {
    updateStatusProduct.mutate(
      {
        productId,
        values: data,
      },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      },
    );
  };

  return (
    <DialogContent className="sm:max-w-[425px] bg-[#1e293b] border-slate-700 text-slate-100 shadow-2xl">
      <DialogHeader>
        <div className="mx-auto w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
          <RefreshCw className="w-6 h-6 text-cyan-500" />
        </div>
        <DialogTitle className="text-center text-xl font-bold tracking-tight">
          Actualizar Estado
        </DialogTitle>
        <DialogDescription className="text-center text-slate-400">
          Cambia la disponibilidad de{" "}
          <span className="text-cyan-400 font-semibold">{productName}</span> en
          el sistema.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-slate-700/50 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl border transition-colors ${
                currentStatus
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              {currentStatus ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
            </div>
            <div className="flex flex-col">
              <Label
                htmlFor="status-toggle"
                className="text-sm font-bold text-slate-200"
              >
                {currentStatus ? "Producto Disponible" : "Producto Agotado"}
              </Label>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                {currentStatus
                  ? "Se mostrará en ventas"
                  : "No aparecerá en el POS"}
              </span>
            </div>
          </div>

          <Controller
            name="is_available"
            control={control}
            render={({ field }) => (
              <Switch
                id="status-toggle"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-cyan-500 data-[state=unchecked]:bg-slate-700"
              />
            )}
          />
        </div>

        <DialogFooter className="gap-3 sm:gap-0">
          <Button
            type="submit"
            disabled={
              updateStatusProduct.isPending || currentStatus === isAvailable
            }
            className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold h-11 rounded-xl transition-all shadow-lg shadow-cyan-900/20"
          >
            {updateStatusProduct.isPending
              ? "Actualizando..."
              : "Confirmar Cambio"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ProductUpdateStatus;
