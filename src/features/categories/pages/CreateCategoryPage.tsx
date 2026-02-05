import { useForm } from "react-hook-form";
import { useCategorie } from "../hooks/useCategorie";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCategorieSchema,
  type CreateCategorieT,
} from "../schemas/categorie.schema";
import { Tags, ArrowLeft, CheckCircle2, LinkIcon } from "lucide-react";
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
import { useState, useEffect } from "react";

const CreateCategoryPage = () => {
  const { createCategorie } = useCategorie();
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<CreateCategorieT>({
    resolver: zodResolver(createCategorieSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  const categoryName = form.watch("name");

  // Automatic slug generation
  useEffect(() => {
    const generateSlug = (text: string) => {
      return text
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
        .replace(/[\s_]+/g, "-") // Replace spaces/underscores with hyphens
        .replace(/-+/g, "-"); // Remove multiple hyphens
    };

    form.setValue("slug", generateSlug(categoryName), { shouldValidate: true });
  }, [categoryName, form]);

  const onSubmit = async (values: CreateCategorieT) => {
    createCategorie.mutate(values, {
      onSuccess: () => {
        form.reset();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-700/50 pb-5">
        <Link
          to="/lista-categorias"
          className="flex items-center text-slate-400 hover:text-cyan-400 text-xs font-medium transition-colors group w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5 group-hover:-translate-x-1 transition-transform" />
          Volver a la lista
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <Tags className="w-6 h-6 text-cyan-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Nueva Categoría
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Define una nueva categoría para organizar tus productos.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {showSuccess && (
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 animate-in zoom-in duration-300">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <p className="text-xs font-bold">
              ¡Categoría creada con éxito! Puedes seguir creando más.
            </p>
          </div>
        )}

        <div className="bg-[#1e293b]/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300 text-sm font-semibold mb-1.5 block">
                        Nombre{" "}
                        <span className="text-red-400 text-[10px] ml-0.5">
                          *
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej. Bebidas"
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
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300 text-sm font-semibold mb-1.5 flex items-center">
                        <LinkIcon className="w-3 h-3 mr-1.5 text-slate-500" />
                        URL Slug
                      </FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          placeholder="slug-automatico"
                          className="bg-slate-900/30 border-slate-800 text-slate-500 cursor-not-allowed h-11 rounded-xl text-sm italic"
                          {...field}
                        />
                      </FormControl>
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
                    <FormLabel className="text-slate-300 text-sm font-semibold mb-1.5 block">
                      Descripción (Opcional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descripción breve..."
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
                  disabled={createCategorie.isPending}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold h-11 rounded-xl transition-all shadow-lg shadow-cyan-900/20 text-sm"
                >
                  {createCategorie.isPending ? (
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
                    "Guardar Categoría"
                  )}
                </Button>

                <Link to="/lista-categorias" className="flex-1">
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
      </div>
    </div>
  );
};

export default CreateCategoryPage;
