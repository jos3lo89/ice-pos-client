import { Button } from "@/presentation/components/ui/button";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderCanceled = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-red-500/10 rounded-full">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">Orden Cancelada</h2>
        <p className="text-slate-400">
          La orden ha sido cancelada correctamente
        </p>
        <Button
          variant="outline"
          onClick={() => navigate("/mesas")}
          className="rounded-xl cursor-pointer"
        >
          Volver a las mesas
        </Button>
      </div>
    </div>
  );
};
export default OrderCanceled;
