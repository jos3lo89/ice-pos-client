import { ArrowLeft, FileQuestion, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-8 text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-80" />

        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700 shadow-inner group">
            <FileQuestion className="w-10 h-10 text-cyan-500 group-hover:rotate-12 transition-transform duration-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-br from-slate-100 to-slate-400 tracking-tighter">
            404
          </h1>
          <h2 className="text-xl font-semibold text-slate-200">
            ¿Te has perdido?
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[85%] mx-auto">
            La ruta que buscas no existe, fue movida o quizás nunca estuvo aquí.
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3 sm:flex-row sm:gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex-1 h-11 border-slate-600 bg-transparent text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-500 transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Regresar
          </Button>

          <Button
            onClick={() => navigate("/")}
            className="flex-1 h-11 bg-linear-to-br from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold shadow-lg border-0 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="w-4 h-4 mr-2" />
            Ir al Inicio
          </Button>
        </div>
      </div>

      <p className="mt-8 text-xs text-slate-600 font-mono">Ice POS System</p>
    </div>
  );
};
export default NotFound;
