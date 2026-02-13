import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCategoriesWithProducts } from "@/features/categories/hooks/useCategorie";
import {
  useCreateOrder,
  useAddProductToOrder,
} from "@/features/orders/hooks/useOrder";
import { useFloorsWithTables } from "@/features/floors/hooks/useFloor";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Search,
  Check,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CartItem {
  id: string; // unique cart item id
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  variant_id?: string;
  variant_name?: string;
  modifier_ids: string[];
  modifier_names: string[];
  notes?: string;
  total_price: number;
}

const OrderEntryPage = () => {
  const { tableId } = useParams<{ tableId: string }>();
  const navigate = useNavigate();

  // Queries
  const categoriesQuery = useCategoriesWithProducts();
  const floorsQuery = useFloorsWithTables();

  // Mutations
  const createOrderMutation = useCreateOrder();
  const addProductMutation = useAddProductToOrder();

  // State
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null,
  );
  const [selectedModifierIds, setSelectedModifierIds] = useState<string[]>([]);
  const [productQuantity, setProductQuantity] = useState(1);
  const [productNotes, setProductNotes] = useState("");

  // Find table info
  const tableInfo = useMemo(() => {
    if (!floorsQuery.data) return null;
    for (const floor of floorsQuery.data) {
      const table = floor.tables.find((t) => t.id === tableId);
      if (table) return { ...table, floorName: floor.name };
    }
    return null;
  }, [floorsQuery.data, tableId]);

  // Derived Data
  const categories = categoriesQuery.data || [];
  const activeCategoryId = selectedCategoryId || categories[0]?.id;

  const filteredProducts = useMemo(() => {
    const activeCategory = categories.find((c) => c.id === activeCategoryId);
    if (!activeCategory) return [];

    return activeCategory.products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [categories, activeCategoryId, searchQuery]);

  const cartTotal = cart.reduce((acc, item) => acc + item.total_price, 0);

  // Handlers
  const openProductDialog = (product: any) => {
    setSelectedProduct(product);
    setSelectedVariantId(product.product_variants?.[0]?.id || null);
    setSelectedModifierIds([]);
    setProductQuantity(1);
    setProductNotes("");
  };

  const addToCart = () => {
    if (!selectedProduct) return;

    const variant = selectedProduct.product_variants.find(
      (v: any) => v.id === selectedVariantId,
    );
    const modifiers = selectedProduct.product_modifiers.filter((m: any) =>
      selectedModifierIds.includes(m.id),
    );

    const modifierTotal = modifiers.reduce(
      (acc: number, m: any) => acc + Number(m.additional_price),
      0,
    );
    const basePrice =
      Number(selectedProduct.price) +
      (variant ? Number(variant.additional_price) : 0);
    const lineTotal = (basePrice + modifierTotal) * productQuantity;

    const newCartItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      product_id: selectedProduct.id,
      name: selectedProduct.name,
      price: basePrice + modifierTotal,
      quantity: productQuantity,
      variant_id: selectedVariantId || undefined,
      variant_name: variant?.variant_name,
      modifier_ids: selectedModifierIds,
      modifier_names: modifiers.map((m: any) => m.modifier_name),
      notes: productNotes,
      total_price: lineTotal,
    };

    setCart([...cart, newCartItem]);
    setSelectedProduct(null);
    toast.success(`${selectedProduct.name} agregado al carrito`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(cart.filter((item) => item.id !== cartItemId));
    console.log("Deleted item Order Item ID (Simulated):", cartItemId);
  };

  const handleSendOrder = async () => {
    if (cart.length === 0) return;

    try {
      let orderId = tableInfo?.current_order_id;

      // 1. Create order if table is free
      if (!orderId) {
        const newOrder = await createOrderMutation.mutateAsync({
          table_id: tableId!,
          notes: "Orden creada desde terminal móvil",
        });
        orderId = newOrder.id;
      }

      // 2. Add products sequentially (or Promise.all)
      toast.loading("Enviando productos a cocina...", { id: "sending-order" });

      const promises = cart.map((item) =>
        addProductMutation.mutateAsync({
          orderId: orderId!,
          order: {
            product_id: item.product_id,
            quantity: item.quantity,
            variant_id: item.variant_id,
            modifier_ids: item.modifier_ids,
            notes: item.notes,
          },
        }),
      );

      await Promise.all(promises);

      toast.success("Orden enviada correctamente", { id: "sending-order" });
      setCart([]);
      setIsCartOpen(false);
      navigate("/mesas");
    } catch (error) {
      // Error handled by mutation toast
    }
  };

  if (categoriesQuery.isLoading || floorsQuery.isLoading) {
    return <LoadingState message="Preparando menú..." />;
  }

  if (categoriesQuery.isError || floorsQuery.isError || !tableInfo) {
    return (
      <ErrorState
        onRetry={() => {
          categoriesQuery.refetch();
          floorsQuery.refetch();
        }}
        message={
          !tableInfo ? "Mesa no encontrada" : "Error al cargar los datos"
        }
      />
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] -m-4 lg:-m-8 animate-in fade-in duration-500">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 p-4 shrink-0 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/mesas")}
            className="rounded-full hover:bg-slate-800 text-slate-400"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">
              Mesa {tableInfo?.table_number}
            </h2>
            <p className="text-[10px] text-cyan-500 uppercase tracking-widest font-black">
              {tableInfo?.floorName}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          className="relative bg-slate-800 border-slate-700 hover:bg-slate-700 rounded-2xl gap-2 h-11 px-4"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart className="w-5 h-5 text-cyan-400" />
          {cart.length > 0 && (
            <Badge className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center p-0 bg-red-500 border-2 border-slate-900 rounded-full text-[10px] font-bold">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </Badge>
          )}
          <span className="font-bold text-sm">S/ {cartTotal.toFixed(2)}</span>
        </Button>
      </header>

      {/* Main Content: Categories & Products */}
      <div className="flex-1 flex overflow-hidden bg-slate-950">
        {/* Sidebar Categories */}
        <aside className="w-24 lg:w-32 bg-slate-900/40 border-r border-slate-800/50 shadow-inner">
          <ScrollArea className="h-full">
            <div className="p-2 space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={cn(
                    "w-full aspect-square flex flex-col items-center justify-center gap-1.5 p-2 rounded-2xl transition-all text-[10px] font-black uppercase tracking-tighter text-center",
                    activeCategoryId === cat.id
                      ? "bg-cyan-500 shadow-lg shadow-cyan-500/20 text-white"
                      : "text-slate-500 hover:bg-slate-800/50 hover:text-slate-300",
                  )}
                >
                  <UtensilsCrossed
                    className={cn(
                      "w-5 h-5",
                      activeCategoryId === cat.id
                        ? "text-white"
                        : "text-slate-600",
                    )}
                  />
                  {cat.name}
                </button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Products Grid */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="p-4 border-b border-slate-800/50">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              <Input
                placeholder="Buscar producto..."
                className="pl-10 h-11 bg-slate-900 border-slate-800 rounded-xl focus-visible:ring-cyan-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="bg-slate-900 border-slate-800 hover:border-cyan-500/30 cursor-pointer overflow-hidden transition-all active:scale-[0.98] group"
                  onClick={() => openProductDialog(product)}
                >
                  <CardContent className="p-4 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors leading-tight">
                          {product.name}
                        </h3>
                        <Badge
                          variant="secondary"
                          className="bg-slate-800 text-cyan-400 rounded-lg text-xs font-black"
                        >
                          S/ {Number(product.price).toFixed(2)}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-slate-500 line-clamp-2">
                        {product.description ||
                          "Deliciosa opción de nuestra carta."}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1">
                      {product.product_variants.length > 0 && (
                        <Badge
                          variant="outline"
                          className="text-[9px] border-slate-700 text-slate-400"
                        >
                          {product.product_variants.length} Variantes
                        </Badge>
                      )}
                      {product.product_modifiers.length > 0 && (
                        <Badge
                          variant="outline"
                          className="text-[9px] border-slate-700 text-slate-400"
                        >
                          Personalizable
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Product Options Dialog */}
      <Dialog
        open={!!selectedProduct}
        onOpenChange={() => setSelectedProduct(null)}
      >
        <DialogContent className="max-w-md bg-slate-900 border-slate-800 text-white rounded-3xl p-0 overflow-hidden outline-none">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-black">
              {selectedProduct?.name}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Personaliza el pedido antes de agregarlo.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh] p-6 pt-2">
            <div className="space-y-6">
              {/* Variants */}
              {selectedProduct?.product_variants.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-cyan-500">
                    Selecciona el tamaño / tipo
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedProduct.product_variants.map((v: any) => (
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

              {/* Modifiers */}
              {selectedProduct?.product_modifiers.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-cyan-500">
                    Modificadores Adicionales
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedProduct.product_modifiers.map((m: any) => (
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

              {/* Quantity */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-cyan-500">
                  Cantidad
                </h4>
                <div className="flex items-center justify-center gap-8 bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-full border border-slate-700 hover:bg-slate-700"
                    onClick={() =>
                      setProductQuantity(Math.max(1, productQuantity - 1))
                    }
                  >
                    <Minus className="w-6 h-6" />
                  </Button>
                  <span className="text-3xl font-black">{productQuantity}</span>
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

              {/* Notes */}
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
              onClick={addToCart}
            >
              Agregar S/{" "}
              {(
                (Number(selectedProduct?.price) +
                  (selectedProduct?.product_variants.find(
                    (v: any) => v.id === selectedVariantId,
                  )?.additional_price || 0) +
                  selectedProduct?.product_modifiers
                    .filter((m: any) => selectedModifierIds.includes(m.id))
                    .reduce(
                      (a: number, b: any) => a + Number(b.additional_price),
                      0,
                    )) *
                productQuantity
              ).toFixed(2)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cart Summary Sheet */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md bg-[#0f172a] border-slate-800 p-0 overflow-hidden flex flex-col outline-none"
        >
          <SheetHeader className="p-6 bg-slate-900/50 border-b border-slate-800">
            <SheetTitle className="text-2xl font-black text-white flex items-center gap-3">
              <ShoppingCart className="text-cyan-400" /> Mi Pedido
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-hidden flex flex-col">
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                  <UtensilsCrossed className="w-10 h-10 text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-300">
                  Carrito vacío
                </h3>
                <p className="text-slate-500 mt-2">
                  Agregue deliciosos productos de nuestra carta para comenzar.
                </p>
              </div>
            ) : (
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="group animate-in slide-in-from-right-4 duration-300"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="space-y-1 pr-4">
                          <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {item.name}
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {item.variant_name && (
                              <Badge className="bg-cyan-500/10 text-cyan-400 border-0 text-[9px] uppercase font-black">
                                {item.variant_name}
                              </Badge>
                            )}
                            {item.modifier_names.map((name) => (
                              <Badge
                                key={name}
                                className="bg-slate-800 text-slate-400 border-0 text-[9px] uppercase font-black"
                              >
                                {name}
                              </Badge>
                            ))}
                          </div>
                          {item.notes && (
                            <p className="text-[10px] text-orange-400 font-bold italic">
                              "{item.notes}"
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg shrink-0"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700/50">
                          <span className="text-xs font-black text-cyan-400">
                            {item.quantity}x
                          </span>
                          <span className="text-[10px] text-slate-400">
                            S/ {item.price.toFixed(2)} c/u
                          </span>
                        </div>
                        <span className="font-bold text-sm text-white">
                          S/ {item.total_price.toFixed(2)}
                        </span>
                      </div>

                      <div className="h-px bg-slate-800 mt-6" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          <SheetFooter className="p-6 bg-slate-900 border-t border-slate-800 flex-col gap-4 sm:flex-col">
            <div className="space-y-3 w-full">
              <div className="flex justify-between items-center text-slate-400 text-sm">
                <span>Subtotal</span>
                <span>S/ {(cartTotal / 1.18).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400 text-sm">
                <span>IGV (18%)</span>
                <span>S/ {(cartTotal - cartTotal / 1.18).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                <span className="text-xl font-black text-white">Total</span>
                <span className="text-2xl font-black text-cyan-500 leading-none">
                  S/ {cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full mt-4">
              <Button
                variant="outline"
                className="h-14 rounded-2xl border-slate-700 bg-slate-800 hover:bg-slate-700 font-bold text-red-400"
                onClick={() => {
                  console.log(
                    "Cancel Order (Simulated ID):",
                    tableInfo?.current_order_id || "NEW",
                  );
                  setCart([]);
                  setIsCartOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                className="h-14 rounded-2xl bg-cyan-500 hover:bg-cyan-600 font-black text-white shadow-xl shadow-cyan-500/20 disabled:opacity-50"
                disabled={
                  cart.length === 0 ||
                  createOrderMutation.isPending ||
                  addProductMutation.isPending
                }
                onClick={handleSendOrder}
              >
                {createOrderMutation.isPending || addProductMutation.isPending
                  ? "Procesando..."
                  : "Enviar Orden"}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default OrderEntryPage;
