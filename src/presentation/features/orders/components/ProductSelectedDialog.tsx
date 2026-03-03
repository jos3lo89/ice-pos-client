import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Producto } from "@/core/entities/categories.entity";
import { formatPricePEN } from "@/utils/format-price";
import { cn } from "@/lib/utils";
import { Check, Loader2, Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useAddProductToOrder } from "@/application/hooks/useOrder";

type Props = {
  product: Producto;
  onClose: () => void;
  isOpen: boolean;
};
const ProductSelectedDialog = ({ product, onClose, isOpen }: Props) => {
  const [productNotes, setProductNotes] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState<
    string | undefined
  >(undefined);
  const [selectedModifierIds, setSelectedModifierIds] = useState<string[]>([]);
  const [productQuantity, setProductQuantity] = useState(1);

  const { orderId } = useParams();

  const addProductToOrder = useAddProductToOrder();

  const totalPrice = useMemo(() => {
    let unitPrice = Number(product.precio);

    if (selectedVariantId) {
      const variant = product.variantes_producto.find(
        (v) => v.id === selectedVariantId,
      );
      if (variant) {
        unitPrice += Number(variant.precio_adicional);
      }
    }

    if (selectedModifierIds.length > 0) {
      const modifiersPrice = product.modificadores_producto
        .filter((m) => selectedModifierIds.includes(m.id))
        .reduce((acc, curr) => acc + Number(curr.precio_adicional), 0);

      unitPrice += modifiersPrice;
    }

    return unitPrice * productQuantity;
  }, [product, selectedVariantId, selectedModifierIds, productQuantity]);

  const handleIncreaseQuantity = () => {
    setProductQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setProductQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddProduct = () => {
    if (!orderId) {
      toast.error("No se encontro la orden");
      return;
    }
    addProductToOrder.mutate(
      {
        orderId,
        order: {
          productId: product.id,
          quantity: productQuantity,
          modifier_ids: selectedModifierIds,
          notes: productNotes,
          variant_id: selectedVariantId,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-slate-900 border-slate-800 text-white rounded-3xl p-0 overflow-hidden outline-none">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-black">
            {product.nombre}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Personaliza el pedido antes de agregarlo.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] p-6 pt-2">
          <div className="space-y-6">
            {product.variantes_producto.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-cyan-500">
                  Variantes
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {product.variantes_producto.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border transition-all",
                        selectedVariantId === v.id
                          ? "bg-cyan-500/10 border-cyan-500 text-white"
                          : "bg-slate-800/50 border-slate-800 text-slate-400 hover:bg-slate-800",
                      )}
                    >
                      <span className="font-bold">{v.nombre_variante}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs">
                          + {formatPricePEN(v.precio_adicional)}
                        </span>
                        {selectedVariantId === v.id && (
                          <Check className="w-4 h-4 text-cyan-400" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.modificadores_producto.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-cyan-500">
                  Modificadores
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {product.modificadores_producto.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedModifierIds((prev) =>
                          prev.includes(m.id)
                            ? prev.filter((id) => id !== m.id)
                            : [...prev, m.id],
                        );
                      }}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border transition-all",
                        selectedModifierIds.includes(m.id)
                          ? "bg-cyan-500/10 border-cyan-500 text-white"
                          : "bg-slate-800/50 border-slate-800 text-slate-400 hover:bg-slate-800",
                      )}
                    >
                      <span className="font-bold">{m.nombre_modificador}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs">
                          + {formatPricePEN(m.precio_adicional)}
                        </span>
                        {selectedModifierIds.includes(m.id) && (
                          <Check className="w-4 h-4 text-cyan-400" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-cyan-500">
                Cantidad
              </h4>
              <div className="flex items-center justify-center gap-8 bg-slate-800/50 p-2 rounded-xl border border-slate-800">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full border border-slate-700 hover:bg-slate-700"
                  onClick={handleDecreaseQuantity}
                >
                  <Minus className="w-6 h-6" />
                </Button>
                <span className="text-3xl font-black">{productQuantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full border border-slate-700 hover:bg-slate-700"
                  onClick={handleIncreaseQuantity}
                >
                  <Plus className="w-6 h-6" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-cyan-500">
                Notas Especiales
              </h4>
              <Textarea
                placeholder="Ej: Sin cebolla, extra picante..."
                className="h-12 bg-slate-800 border-slate-800 rounded-xl"
                value={productNotes}
                onChange={(e) => setProductNotes(e.target.value)}
              />
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 bg-slate-900 border-t border-slate-800">
          <Button
            className="w-full h-14 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-lg font-bold shadow-xl shadow-cyan-500/20 gap-2"
            onClick={handleAddProduct}
            disabled={addProductToOrder.isPending}
          >
            {addProductToOrder.isPending ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              `Agregar ${formatPricePEN(totalPrice)}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ProductSelectedDialog;
