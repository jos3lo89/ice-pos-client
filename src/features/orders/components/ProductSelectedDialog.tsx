import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Product } from "@/features/categories/interfaces/categories.interface";
import { cn } from "@/lib/utils";
import { Check, Minus, Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  product: Product;
  onClose: () => void;
  isOpen: boolean;
};
const ProductSelectedDialog = ({ product, onClose, isOpen }: Props) => {
  const [productNotes, setProductNotes] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null,
  );
  const [selectedModifierIds, setSelectedModifierIds] = useState<string[]>([]);
  const [productQuantity, setProductQuantity] = useState(1);
  // aqui es donde se agrega el item a la orden
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-slate-900 border-slate-800 text-white rounded-3xl p-0 overflow-hidden outline-none">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-black">
            {product.name}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Personaliza el pedido antes de agregarlo.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] p-6 pt-2">
          <div className="space-y-6">
            {product.product_variants.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-cyan-500">
                  Selecciona el tamaño / tipo
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {product.product_variants.map((v) => (
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
                      <span className="font-bold">{v.variant_name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs">
                          + S/ {Number(v.additional_price).toFixed(2)}
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

            {product.product_modifiers.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-cyan-500">
                  Modificadores Adicionales
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {product.product_modifiers.map((m: any) => (
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
                      <span className="font-bold">{m.modifier_name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs">
                          + S/ {Number(m.additional_price).toFixed(2)}
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
              <div className="flex items-center justify-center gap-8 bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full border border-slate-700 hover:bg-slate-700"
                  onClick={() => {
                    console.log("aumnetando cantidad");
                  }}
                >
                  <Minus className="w-6 h-6" />
                </Button>
                <span className="text-3xl font-black">{"33"}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full border border-slate-700 hover:bg-slate-700"
                  onClick={() => setProductQuantity(productQuantity + 1)}
                >
                  <Plus className="w-6 h-6" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-cyan-500">
                Notas Especiales
              </h4>
              <Input
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
            onClick={() => {
              console.log("agregando al carrito");
            }}
          >
            Agregar S/ {33}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ProductSelectedDialog;
