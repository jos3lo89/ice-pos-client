import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProductSchema,
  type CreateProductT,
} from "../schemas/product.schema";
import { useProduct } from "../hooks/useProduct";
import { useCategorie } from "@/features/categories/hooks/useCategorie";
import {
  PackagePlus,
  ArrowLeft,
  CheckCircle2,
  Tag,
  DollarSign,
  Printer,
  AlignLeft,
  Package,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { CreateProductRes } from "../interfaces/product.interface";

const CreateProductPage = () => {
  const { createProduct } = useProduct();
  const { listAllCategories } = useCategorie();
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdProduct, setCreatedProduct] = useState<CreateProductRes | null>(
    null,
  );

  const { data: categoriesDataAll } = listAllCategories;
  const categories = categoriesDataAll ?? [];

  const form = useForm<CreateProductT>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      category_id: "",
      description: "",
      area_impresion: "cocina",
    },
  });

  const onSubmit = async (values: CreateProductT) => {
    createProduct.mutate(values, {
      onSuccess: (data) => {
        setCreatedProduct(data);
        form.reset();
        setShowSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-700/50 pb-5">
        <Link
          to="/lista-productos"
          className="flex items-center text-slate-400 hover:text-cyan-400 text-xs font-medium transition-colors group w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5 group-hover:-translate-x-1 transition-transform" />
          Volver a la lista
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <PackagePlus className="w-6 h-6 text-cyan-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Nuevo Producto
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Agrega un nuevo producto al catálogo de ventas.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {showSuccess && createdProduct && (
          <div className="flex flex-col gap-6 p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 animate-in zoom-in duration-500 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">
                  ¡Producto creado con éxito!
                </h2>
                <p className="text-sm text-slate-400">
                  El producto ha sido registrado correctamente en el sistema.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl bg-slate-900/40 border border-slate-700/30">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  Producto
                </span>
                <p className="text-slate-200 font-medium flex items-center gap-2">
                  <Package className="w-4 h-4 text-cyan-400" />
                  {createdProduct.name}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  Precio
                </span>
                <p className="text-slate-200 font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  S/ {parseFloat(createdProduct.price).toFixed(2)}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  Área de Impresión
                </span>
                <p className="text-slate-200 font-medium flex items-center gap-2 capitalize">
                  <Printer className="w-4 h-4 text-purple-400" />
                  {createdProduct.area_impresion}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  Categoría
                </span>
                <p className="text-slate-200 font-medium flex items-center gap-2">
                  <Tag className="w-4 h-4 text-orange-400" />
                  {categories.find((c) => c.id === createdProduct.category_id)
                    ?.name || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to="/lista-productos" className="flex-1">
                <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold h-11 rounded-xl transition-all">
                  Volver a la lista
                </Button>
              </Link>
              <Button
                onClick={() => setShowSuccess(false)}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold h-11 rounded-xl transition-all shadow-lg shadow-cyan-900/20"
              >
                Crear otro producto
              </Button>
            </div>
          </div>
        )}

        {!showSuccess && (
          <div className="bg-[#1e293b]/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300 text-sm font-semibold mb-1.5 flex items-center">
                          <Package className="w-4 h-4 mr-2 text-cyan-500" />
                          Nombre del Producto
                          <span className="text-red-400 text-[10px] ml-0.5">
                            *
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. Hamburguesa de Pollo"
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
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300 text-sm font-semibold mb-1.5 flex items-center">
                          <DollarSign className="w-4 h-4 mr-2 text-cyan-500" />
                          Precio de Venta
                          <span className="text-red-400 text-[10px] ml-0.5">
                            *
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="bg-slate-900/50 border-slate-700 focus:border-cyan-500/50 focus:ring-cyan-500/20 h-11 rounded-xl text-slate-100 text-sm transition-all"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300 text-sm font-semibold mb-1.5 flex items-center">
                          <Tag className="w-4 h-4 mr-2 text-cyan-500" />
                          Categoría
                          <span className="text-red-400 text-[10px] ml-0.5">
                            *
                          </span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-slate-900/50 border-slate-700 focus:border-cyan-500/50 focus:ring-cyan-500/20 h-11 rounded-xl text-slate-100 text-sm transition-all">
                              <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.id}
                                className="focus:bg-slate-700 focus:text-cyan-400"
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400 text-xs mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="area_impresion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300 text-sm font-semibold mb-1.5 flex items-center">
                          <Printer className="w-4 h-4 mr-2 text-cyan-500" />
                          Área de Impresión
                          <span className="text-red-400 text-[10px] ml-0.5">
                            *
                          </span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-slate-900/50 border-slate-700 focus:border-cyan-500/50 focus:ring-cyan-500/20 h-11 rounded-xl text-slate-100 text-sm transition-all capitalize">
                              <SelectValue placeholder="Selecciona el área" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                            <SelectItem
                              value="cocina"
                              className="focus:bg-slate-700 focus:text-cyan-400"
                            >
                              Cocina
                            </SelectItem>
                            <SelectItem
                              value="bar"
                              className="focus:bg-slate-700 focus:text-cyan-400"
                            >
                              Bar
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400 text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300 text-sm font-semibold mb-1.5 flex items-center">
                        <AlignLeft className="w-4 h-4 mr-2 text-cyan-500" />
                        Descripción (Opcional)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Agrega detalles del producto..."
                          className="bg-slate-900/50 border-slate-700 focus:border-cyan-500/50 focus:ring-cyan-500/20 min-h-[100px] rounded-xl text-slate-100 text-sm transition-all resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs mt-1" />
                    </FormItem>
                  )}
                />

                <div className="pt-2 flex items-center gap-3">
                  <Button
                    type="submit"
                    disabled={createProduct.isPending}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold h-11 rounded-xl transition-all shadow-lg shadow-cyan-900/20 text-sm"
                  >
                    {createProduct.isPending ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Guardando...
                      </span>
                    ) : (
                      "Crear Producto"
                    )}
                  </Button>

                  <Link to="/lista-productos" className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 h-11 rounded-xl transition-all text-sm"
                    >
                      Cancelar
                    </Button>
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProductPage;
