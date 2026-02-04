import { useForm } from "react-hook-form";
import { useCategorie } from "../hooks/useCategorie";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCategorieSchema,
  type CreateCategorieT,
} from "../schemas/categorie.schema";
import { Tags, ArrowLeft, CheckCircle2 } from "lucide-react";
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
import { Link } from "react-router-dom";
import { useState } from "react";

const CreateCategoryPage = () => {
  const { createCategorie } = useCategorie();
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<CreateCategorieT>({
    resolver: zodResolver(createCategorieSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: CreateCategorieT) => {
    createCategorie.mutate(values, {
      onSuccess: () => {
        form.reset();
        setShowSuccess(true);
        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-700/50 pb-6">
        <Link
          to="/lista-categorias"
          className="flex items-center text-slate-400 hover:text-cyan-400 text-sm font-medium transition-colors group w-fit"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver a la lista
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
            <Tags className="w-8 h-8 text-cyan-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Crear Nueva Categoría
            </h1>
            <p className="text-slate-400 mt-1">
              Define una nueva categoría para organizar tus productos.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Form Column */}
        <div className="space-y-6">
          {showSuccess && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 animate-in zoom-in duration-300">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <p className="text-sm font-bold">
                ¡Categoría creada con éxito! Puedes seguir creando más.
              </p>
            </div>
          )}

          <div className="bg-[#1e293b]/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 lg:p-8 shadow-2xl">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300 font-semibold mb-2 block">
                        Nombre de la Categoría{" "}
                        <span className="text-red-400 text-xs ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej. Bebidas, Entradas, Postres..."
                          className="bg-slate-900/50 border-slate-700 focus:border-cyan-500/50 focus:ring-cyan-500/20 h-12 rounded-xl text-slate-100 transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300 font-semibold mb-2 block">
                        Descripción (Opcional)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe brevemente de qué trata esta categoría..."
                          className="bg-slate-900/50 border-slate-700 focus:border-cyan-500/50 focus:ring-cyan-500/20 min-h-[120px] rounded-xl text-slate-100 transition-all resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs mt-1" />
                    </FormItem>
                  )}
                />

                <div className="pt-4 flex items-center gap-4">
                  <Button
                    type="submit"
                    disabled={createCategorie.isPending}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold h-12 rounded-xl transition-all shadow-lg shadow-cyan-900/20"
                  >
                    {createCategorie.isPending ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      "Crear Categoría"
                    )}
                  </Button>

                  <Link to="/lista-categorias" className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 h-12 rounded-xl transition-all"
                    >
                      Cancelar
                    </Button>
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryPage;
