import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import { UtensilsCrossed } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { loginSchema, type LoginT } from "../schemas/auth.schema";
import { useLogin } from "@/application/hooks/useAuth";

const LoginPage = () => {
  const { mutate, isPending } = useLogin();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginT>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginT) => {
    mutate(values);
  };

  return (
    <div className="relative min-h-screen bg-[#070b14] flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] animate-bounce duration-10000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 w-full max-w-[420px] animate-in fade-in zoom-in-95 duration-700">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-10 space-y-4">
          <div className="relative group">
            <div className="absolute -inset-4 bg-linear-to-r from-emerald-500 to-cyan-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative w-16 h-16 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-tr from-emerald-500/20 via-transparent to-cyan-500/20" />
              <UtensilsCrossed className="w-8 h-8 text-emerald-400 relative z-10" />
            </div>
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-black text-white tracking-tighter">
              Ice{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-400">
                Mankora
              </span>
            </h1>
          </div>
        </div>

        <Card className="border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-500/50 via-cyan-500/50 to-emerald-500/50" />

          <CardHeader className="space-y-1 pt-2 pb-2 text-center">
            <CardTitle className="text-xl font-bold text-white tracking-tight">
              Bienvenido de nuevo
            </CardTitle>
            <CardDescription className="text-slate-400 text-sm">
              Ingresa tus credenciales para continuar
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="userName"
                    className="text-xs font-bold text-slate-400 uppercase tracking-wider"
                  >
                    Usuario
                  </label>
                </div>
                <Input
                  id="userName"
                  type="text"
                  autoComplete="username"
                  spellCheck={false}
                  placeholder="ID de usuario..."
                  className="h-12 border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-600 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500/50 transition-all rounded-lg"
                  {...register("userName")}
                />
                {errors.userName && (
                  <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tight animate-in slide-in-from-top-1">
                    {errors.userName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="text-xs font-bold text-slate-400 uppercase tracking-wider"
                  >
                    Contraseña
                  </label>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="h-12 border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-600 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500/50 transition-all rounded-lg"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tight animate-in slide-in-from-top-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {errors.root && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                  <p className="text-xs font-medium text-rose-400 text-center">
                    {errors.root.message}
                  </p>
                </div>
              )}

              <Button
                disabled={isPending}
                type="submit"
                className="w-full h-12 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black shadow-lg shadow-emerald-500/10 transition-all active:scale-[0.98] rounded-lg mt-2 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                {isPending ? (
                  <div className="flex items-center justify-center gap-3 relative z-10">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span className="text-sm">Verificando...</span>
                  </div>
                ) : (
                  <span className="relative z-10 text-sm">
                    Entrar al Sistema
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
