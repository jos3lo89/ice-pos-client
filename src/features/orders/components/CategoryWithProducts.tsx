import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { UtensilsCrossed, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCategoriesWithProducts } from "@/features/categories/hooks/useCategorie";
import { useFloorsWithTables } from "@/features/floors/hooks/useFloor";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { useMemo, useState } from "react";
import type { Product } from "@/features/categories/interfaces/categories.interface";
import ProductSelectedDialog from "./ProductSelectedDialog";

const CategoryWithProducts = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categoriesQuery = useCategoriesWithProducts();
  const floorsQuery = useFloorsWithTables();

  const categories = categoriesQuery.data || [];
  const activeCategoryId = selectedCategoryId || categories[0]?.id;

  const filteredProducts = useMemo(() => {
    const activeCategory = categories.find((c) => c.id === activeCategoryId);
    if (!activeCategory) return [];
    return activeCategory.products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [categories, activeCategoryId, searchQuery]);

  if (categoriesQuery.isLoading || floorsQuery.isLoading) {
    return <LoadingState message="Preparando menú..." />;
  }

  if (categoriesQuery.isError || floorsQuery.isError) {
    return (
      <ErrorState
        onRetry={() => {
          categoriesQuery.refetch();
          floorsQuery.refetch();
        }}
        message="Error al cargar los datos"
      />
    );
  }

  return (
    <>
      <div className="flex-1 flex overflow-hidden bg-slate-950">
        <aside className="w-24 lg:w-32 bg-slate-900/40 border-r border-slate-800/50 shadow-inner">
          <ScrollArea className="h-full">
            <div className="p-1 space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={cn(
                    "w-full aspect-square flex flex-col items-center justify-center gap-1.5 px-1 lg:px-2 rounded-2xl transition-all text-[10px] font-black uppercase tracking-tighter text-center",
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

        <div className="flex-1 flex flex-col min-w-0">
          <div className="p-1">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              <Input
                placeholder="Buscar producto..."
                className="pl-10 h-9 bg-slate-900 border-slate-800 rounded-lg focus-visible:ring-cyan-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 px-2 pt-2 pb-24">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-slate-900 border-slate-800 hover:border-cyan-500/30 cursor-pointer overflow-hidden transition-all active:scale-[0.98] group"
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

      {selectedProduct && (
        <ProductSelectedDialog
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isOpen={!!selectedProduct}
        />
      )}
    </>
  );
};
export default CategoryWithProducts;
