import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTableSchema, type CreateTableT } from "../schemas/table.schema";
import {
  ArrowLeft,
  CheckCircle2,
  Table as TableIcon,
  Layers,
  LayoutGrid,
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
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCreateTable } from "../hooks/useTable";
import { useAllFloors } from "@/features/floors/hooks/useFloor";
import type { TableCreateRes } from "../interfaces/table.interface";

const CreateTablePage = () => {
  const { data: floorsData } = useAllFloors();
  const createTable = useCreateTable();
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdTable, setCreatedTable] = useState<TableCreateRes | null>(null);

  const floors = floorsData ?? [];

  const form = useForm<CreateTableT>({
    resolver: zodResolver(createTableSchema),
    defaultValues: {
      table_number: "",
      floor_id: "",
    },
  });

  const onSubmit = (values: CreateTableT) => {
    createTable.mutate(values, {
      onSuccess: (data) => {
        setCreatedTable(data);
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
          to="/lista-mesas"
          className="flex items-center text-slate-400 hover:text-cyan-400 text-xs font-medium transition-colors group w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5 group-hover:-translate-x-1 transition-transform" />
          Volver a la lista
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <LayoutGrid className="w-6 h-6 text-cyan-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Nueva Mesa
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Registra una nueva mesa asignada a un piso o área.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {showSuccess && createdTable && (
          <div className="flex flex-col gap-6 p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 animate-in zoom-in duration-500 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">
                  ¡Mesa creada con éxito!
                </h2>
                <p className="text-sm text-slate-400">
                  La mesa ha sido registrada correctamente en el sistema.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl bg-slate-900/40 border border-slate-700/30">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  Número de Mesa
                </span>
                <p className="text-slate-200 font-medium flex items-center gap-2">
                  <TableIcon className="w-4 h-4 text-cyan-400" />
                  Mesa {createdTable.table_number}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  Piso / Área
                </span>
                <p className="text-slate-200 font-medium flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  {createdTable.floors?.name || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to="/lista-mesas" className="flex-1">
                <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold h-11 rounded-xl transition-all">
                  Volver a la lista
                </Button>
              </Link>
              <Button
                onClick={() => setShowSuccess(false)}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold h-11 rounded-xl transition-all shadow-lg shadow-cyan-900/20"
              >
                Crear otra mesa
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
                    name="table_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300 text-sm font-semibold mb-1.5 flex items-center">
                          <TableIcon className="w-4 h-4 mr-2 text-cyan-500" />
                          Número de Mesa
                          <span className="text-red-400 text-[10px] ml-0.5">
                            *
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. T-01, Mesa 5..."
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
                    name="floor_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300 text-sm font-semibold mb-1.5 flex items-center">
                          <Layers className="w-4 h-4 mr-2 text-cyan-500" />
                          Piso / Área
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
                              <SelectValue placeholder="Selecciona el piso" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                            {floors?.map((floor) => (
                              <SelectItem
                                key={floor.id}
                                value={floor.id}
                                className="focus:bg-slate-700 focus:text-cyan-400"
                              >
                                {floor.level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400 text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Button
                    type="submit"
                    disabled={createTable.isPending}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold h-11 rounded-xl transition-all shadow-lg shadow-cyan-900/20 text-sm"
                  >
                    {createTable.isPending ? "Guardando..." : "Guardar Mesa"}
                  </Button>

                  <Link to="/lista-mesas" className="flex-1">
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

export default CreateTablePage;
