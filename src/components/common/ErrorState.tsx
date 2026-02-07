import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

const ErrorState = ({
  message = "No pudimos cargar la información. Por favor, intenta nuevamente.",
  onRetry,
  title = "Error de conexión",
}: ErrorStateProps) => {
  return (
    <div className="w-full min-h-75 flex flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>

      <div className="space-y-1 max-w-sm">
        <h3 className="text-slate-200 font-semibold text-lg">{title}</h3>
        <p className="text-slate-400 text-sm">{message}</p>
      </div>

      {onRetry && (
        <Button
          onClick={onRetry}
          className="mt-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow-lg hover:shadow-cyan-500/10 transition-all"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Reintentar
        </Button>
      )}
    </div>
  );
};
export default ErrorState;
