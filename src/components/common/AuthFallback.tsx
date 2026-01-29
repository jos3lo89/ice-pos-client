import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const AuthFallback = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-sans animate-in fade-in duration-500">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-8 text-center space-y-8">
        <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
          <div className="relative w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700 shadow-inner">
            <ShieldAlert className="w-8 h-8 text-cyan-500" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
            Acceso Restringido
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            No hemos detectado una sesión activa o tus credenciales han
            expirado. Por seguridad, el contenido no está disponible.
          </p>
        </div>

        <div className="pt-2">
          <Button
            onClick={() => navigate("/login")}
            className="w-full h-11 bg-linear-to-br from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold shadow-lg border-0 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Iniciar Sesión
          </Button>

          <p className="mt-4 text-xs text-slate-500">
            Si crees que es un error, contacta al soporte.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AuthFallback;
