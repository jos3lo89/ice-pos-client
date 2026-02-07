import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFloorSchema, type CreateFloorT } from "../schemas/floor.schema";
import {
  Layers,
  ArrowLeft,
  CheckCircle2,
  Hash,
  Type,
  Building,
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
      },
    });
  };

  if (showSuccess && createdFloor) {
    return (
      <div className="flex flex-col items-center justify-center py-12 animate-in fade-in zoom-in duration-500">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-10 rounded-3xl shadow-2xl max-w-lg w-full text-center space-y-6">
          <div className="mx-auto w-24 h-24 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-12 h-12 text-cyan-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-white tracking-tight">
              ¡Piso Creado!
            </h2>
            <p className="text-slate-400">
              El piso ha sido registrado exitosamente en el sistema.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 text-left space-y-4">
            <div className="flex justify-between items-center border-b border-slate-700/30 pb-3">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                Nombre
              </span>
              <span className="text-white font-bold">{createdFloor.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                Nivel / Orden
              </span>
              <span className="text-cyan-400 font-mono font-bold text-lg">
                # {createdFloor.level}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button
              onClick={() => setShowSuccess(false)}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold h-12 rounded-xl transition-all shadow-lg shadow-cyan-900/20"
            >
              Crear otro piso
            </Button>
            <Link to="/lista-pisos">
              <Button
                variant="ghost"
                className="w-full text-slate-400 hover:text-white hover:bg-slate-700/50 h-12 rounded-xl"
              >
                Volver al listado
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-cyan-500 mb-2">
            <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em]">
              Administración
            </span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Crear Nuevo <span className="text-cyan-500">Piso</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Registra una nueva área o nivel para la gestión de mesas.
          </p>
        </div>

        <Link to="/lista-pisos">
          <Button
            variant="ghost"
            className="group text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver a la lista
          </Button>
        </Link>
      </div>

      {/* Main Form Card */}
      <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-700" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Floor Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-slate-200 font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                      <Type className="w-4 h-4 text-cyan-500" />
                      Nombre del Piso
                    </FormLabel>
                    <FormControl>
                      <div className="relative group/input">
                        <Input
                          placeholder="Ej. Primer Piso, Terraza, VIP..."
                          className="bg-slate-900/50 border-slate-700 text-slate-100 h-14 rounded-2xl px-5 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all placeholder:text-slate-600 block w-full"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs font-medium" />
                  </FormItem>
                )}
              />

              {/* Floor Level / Order */}
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-slate-200 font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                      <Hash className="w-4 h-4 text-cyan-500" />
                      Nivel / Orden
                    </FormLabel>
                    <FormControl>
                      <div className="relative group/input">
                        <Input
                          type="number"
                          placeholder="1"
                          className="bg-slate-900/50 border-slate-700 text-slate-100 h-14 rounded-2xl px-5 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all block w-full"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs font-medium" />
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-slate-900/30 rounded-2xl p-4 border border-slate-700/30 flex items-start gap-3">
              <Building className="w-5 h-5 text-cyan-500 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                El nombre del piso se utilizará para identificar las áreas en el
                punto de venta. El nivel determina el orden de visualización de
                las pestañas en el POS.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                disabled={createFloor.isPending}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-black h-14 rounded-2xl transition-all shadow-xl shadow-cyan-900/20 text-lg uppercase tracking-widest disabled:opacity-50"
              >
                {createFloor.isPending ? (
                  <div className="flex items-center gap-2">
                    <span className="animate-pulse">Registrando piso...</span>
                  </div>
                ) : (
                  "Guardar Piso"
                )}
              </Button>

              <Link to="/lista-pisos" className="flex-1 sm:flex-none">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-14 px-8 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 rounded-2xl font-bold transition-all uppercase tracking-widest text-sm"
                >
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateFloorPage;
