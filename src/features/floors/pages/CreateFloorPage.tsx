import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFloorSchema, type CreateFloorT } from "../schemas/floor.schema";
import { Layers, ArrowLeft, CheckCircle2, Hash, Type } from "lucide-react";
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
import { Link } from "react-router-dom";
import { useState } from "react";
import type { CreateFloorRes } from "../interfaces/floors.interface";
import { useCreateFloor } from "../hooks/useFloor";

const CreateFloorPage = () => {
  const createFloor = useCreateFloor();
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdFloor, setCreatedFloor] = useState<CreateFloorRes | null>(null);

  const form = useForm<CreateFloorT>({
    resolver: zodResolver(createFloorSchema),
    defaultValues: {
      name: "",
      level: 1,
    },
  });

  const onSubmit = (values: CreateFloorT) => {
    createFloor.mutate(values, {
      onSuccess: (data) => {
        setCreatedFloor(data);
        setShowSuccess(true);
        form.reset();
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-700/50 pb-5">
        <Link
          to="/lista-pisos"
          className="flex items-center text-slate-400 hover:text-cyan-400 text-xs font-medium transition-colors group w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5 group-hover:-translate-x-1 transition-transform" />
          Volver a la lista
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <Layers className="w-6 h-6 text-cyan-500" />
          </div>
          <div>
            <h1
              className="text-2xl font-bold tracking-tight text-white"
              id="create-floor-title"
            >
              Nuevo Piso
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Registra una nueva área o nivel para la gestión de mesas.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {showSuccess && createdFloor && (
          <div className="flex flex-col gap-6 p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 animate-in zoom-in duration-500 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">
                  ¡Piso creado con éxito!
                </h2>
                <p className="text-sm text-slate-400">
                  El piso ha sido registrado correctamente en el sistema.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl bg-slate-900/40 border border-slate-700/30">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  Nombre
                </span>
                <p className="text-slate-200 font-medium flex items-center gap-2">
                  <Type className="w-4 h-4 text-cyan-400" />
                  {createdFloor.name}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  Nivel / Orden
                </span>
                <p className="text-slate-200 font-medium flex items-center gap-2">
                  <Hash className="w-4 h-4 text-cyan-400" />#{" "}
                  {createdFloor.level}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to="/lista-pisos" className="flex-1">
                <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold h-11 rounded-xl transition-all">
                  Volver a la lista
                </Button>
              </Link>
              <Button
                onClick={() => setShowSuccess(false)}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold h-11 rounded-xl transition-all shadow-lg shadow-cyan-900/20"
              >
                Crear otro piso
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
                          <Type className="w-4 h-4 text-cyan-500" />
                          Nombre del Piso
                          <span className="text-red-400 text-[10px] ml-0.5">
                            *
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. Primer Piso, Terraza..."
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
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300 text-sm font-semibold mb-1.5 flex items-center">
                          <Hash className="w-4 h-4 text-cyan-500" />
                          Nivel / Orden
                          <span className="text-red-400 text-[10px] ml-0.5">
                            *
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="1"
                            className="bg-slate-900/50 border-slate-700 focus:border-cyan-500/50 focus:ring-cyan-500/20 h-11 rounded-xl text-slate-100 text-sm transition-all"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Button
                    type="submit"
                    disabled={createFloor.isPending}
                    id="submit-floor-button"
                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold h-11 rounded-xl transition-all shadow-lg shadow-cyan-900/20 text-sm"
                  >
                    {createFloor.isPending ? "Guardando..." : "Guardar Piso"}
                  </Button>

                  <Link to="/lista-pisos" className="flex-1">
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

export default CreateFloorPage;
