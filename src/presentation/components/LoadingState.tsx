import { Loader2 } from "lucide-react";

type LoadingStateProps = {
  message?: string;
};

const LoadingState = ({
  message = "Cargando registros...",
}: LoadingStateProps) => {
  return (
    <div className="w-full min-h-75 flex flex-col items-center justify-center gap-3 rounded-xl">
      <div className="relative">
        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full" />
        <Loader2 className="w-10 h-10 text-cyan-500 animate-spin relative z-10" />
      </div>
      <p className="text-slate-400 text-sm font-medium animate-pulse">
        {message}
      </p>
    </div>
  );
};
export default LoadingState;
