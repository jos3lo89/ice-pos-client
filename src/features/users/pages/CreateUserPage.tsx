import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserSchema,
  userRoles,
  type CreateUserT,
} from "../schemas/user.schema";
import { useUsers } from "../hooks/useUsers";
import {
  UserPlus,
  ArrowLeft,
  CheckCircle2,
  User,
  Key,
  Phone,
  Shield,
  UserCircle,
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

const CreateUserPage = () => {
  const { createUser } = useUsers();
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<CreateUserT>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: "",
      password: "",
      full_name: "",
      role: "mesero",
      phone: "",
    },
  });

  const onSubmit = async (values: CreateUserT) => {
    createUser.mutate(values, {
      onSuccess: () => {
        form.reset();
        setShowSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-700/50 pb-5">
        <Link
          to="/lista-empleados"
          className="flex items-center text-slate-400 hover:text-cyan-400 text-xs font-medium transition-colors group w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5 group-hover:-translate-x-1 transition-transform" />
          Volver a la lista
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <UserPlus className="w-6 h-6 text-cyan-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Nuevo Empleado
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Registra un nuevo colaborador en el sistema.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {showSuccess && (
          <div className="flex flex-col gap-5 p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center animate-in zoom-in duration-500 shadow-2xl backdrop-blur-md">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">
                ¡Empleado creado con éxito!
              </h2>
              <p className="text-sm text-slate-400">
                El nuevo colaborador ya tiene acceso al sistema con su rol
                correspondiente.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link to="/lista-empleados" className="flex-1">
                <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold h-11 rounded-xl transition-all">
                  Volver a la lista
                </Button>
              </Link>
              <Button
                onClick={() => setShowSuccess(false)}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold h-11 rounded-xl transition-all shadow-lg shadow-cyan-900/20"
              >
                Crear otro empleado
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
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300 text-sm font-semibold mb-1.5 flex items-center">
                        <UserCircle className="w-4 h-4 mr-2 text-cyan-500" />
                        Nombre Completo
                        <span className="text-red-400 text-[10px] ml-0.5">
                          *
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej. Suzumiya Haruhi"
                          className="bg-slate-900/50 border-slate-700 focus:border-cyan-500/50 focus:ring-cyan-500/20 h-11 rounded-xl text-slate-100 text-sm transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs mt-1" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300 text-sm font-semibold mb-1.5 flex items-center">
                          <User className="w-4 h-4 mr-2 text-cyan-500" />
                          Usuario
                          <span className="text-red-400 text-[10px] ml-0.5">
                            *
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="suzumiya.haruhi"
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
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300 text-sm font-semibold mb-1.5 flex items-center">
                          <Shield className="w-4 h-4 mr-2 text-cyan-500" />
                          Rol
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
                              <SelectValue placeholder="Selecciona un rol" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                            {userRoles.map((role) => (
                              <SelectItem
                                key={role}
                                value={role}
                                className="capitalize focus:bg-slate-700 focus:text-cyan-400"
                              >
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400 text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300 text-sm font-semibold mb-1.5 flex items-center">
                          <Key className="w-4 h-4 mr-2 text-cyan-500" />
                          Contraseña
                          <span className="text-red-400 text-[10px] ml-0.5">
                            *
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••"
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300 text-sm font-semibold mb-1.5 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-cyan-500" />
                          Teléfono
                          <span className="text-red-400 text-[10px] ml-0.5">
                            *
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="999 999 999"
                            className="bg-slate-900/50 border-slate-700 focus:border-cyan-500/50 focus:ring-cyan-500/20 h-11 rounded-xl text-slate-100 text-sm transition-all"
                            {...field}
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
                    disabled={createUser.isPending}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold h-11 rounded-xl transition-all shadow-lg shadow-cyan-900/20 text-sm"
                  >
                    {createUser.isPending ? (
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
                      "Crear Empleado"
                    )}
                  </Button>

                  <Link to="/lista-empleados" className="flex-1">
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

export default CreateUserPage;
