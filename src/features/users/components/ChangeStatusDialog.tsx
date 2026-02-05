import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RefreshCcw, Power, AlertTriangle } from "lucide-react";
import { useUsers } from "../hooks/useUsers";
import type { User } from "../interfaces/users.interface";

interface ChangeStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

const ChangeStatusDialog = ({
  open,
  onOpenChange,
  user,
}: ChangeStatusDialogProps) => {
  const { changeUserSate } = useUsers();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (user) {
      setIsActive(user.is_active);
    }
  }, [user, open]);

  const handleSave = () => {
    if (!user) return;

    changeUserSate.mutate(
      {
        userId: user.id.toString(),
        payload: { is_active: isActive },
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700 text-slate-100 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-slate-100">
            <RefreshCcw className="w-5 h-5 text-cyan-500" />
            Cambiar Estado de Usuario
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Estás modificando el acceso para
            <span className="font-semibold text-cyan-400">
              {" "}
              {user.username}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-6">
          {user.is_active && (
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-200 leading-relaxed">
                Si desactivas al usuario, este perderá inmediatamente el acceso
                al sistema y no podrá iniciar sesión hasta ser reactivado.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900 border border-slate-700">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isActive ? "bg-green-500/20" : "bg-red-500/20"
                }`}
              >
                <Power
                  className={`w-4 h-4 ${
                    isActive ? "text-green-400" : "text-red-400"
                  }`}
                />
              </div>
              <div className="space-y-0.5">
                <Label className="text-base font-medium text-slate-200">
                  {isActive ? "Usuario Activo" : "Usuario Inactivo"}
                </Label>
                <p className="text-xs text-slate-500">
                  {isActive ? "Tiene acceso al sistema" : "Acceso denegado"}
                </p>
              </div>
            </div>

            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
              className="data-[state=checked]:bg-cyan-500 data-[state=unchecked]:bg-slate-700 border-slate-600"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={changeUserSate.isPending || user.is_active === isActive}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-lg shadow-cyan-900/20"
          >
            {changeUserSate.isPending ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeStatusDialog;
