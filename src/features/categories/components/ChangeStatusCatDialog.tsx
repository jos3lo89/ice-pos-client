import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, Power, RefreshCcw } from "lucide-react";
import type { GetAllCategoriesRes } from "../interfaces/categories.interface";
import { useCategorie } from "../hooks/useCategorie";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

interface ChangeStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categorie: GetAllCategoriesRes | null;
}

const ChangeStatusCatDialog = ({
  onOpenChange,
  open,
  categorie,
}: ChangeStatusDialogProps) => {
  const { changeState } = useCategorie();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (categorie) {
      setIsActive(categorie.is_active);
    }
  }, [categorie, open]);

  const handleSave = () => {
    if (!categorie) return;

    changeState.mutate(
      {
        categorieId: categorie.id.toString(),
        payload: { is_active: isActive },
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  if (!categorie) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700 text-slate-100 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-slate-100">
            <RefreshCcw className="w-5 h-5 text-cyan-500" />
            Cambiar Estado de la categoria
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Estás modificando el estado de la categoria
            <span className="font-semibold text-cyan-400">
              {" "}
              {categorie.name}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-6">
          {categorie.is_active && (
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-200 leading-relaxed">
                Si desactivas la categoria, este no podra ser utilizado en el
                sistema.
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
                  {isActive ? "Categoria Activo" : "Categoria Inactivo"}
                </Label>
                <p className="text-xs text-slate-500">
                  {isActive
                    ? "Se puede utilizar en el sistema"
                    : "No se puede utilzar"}
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
            disabled={changeState.isPending || categorie.is_active === isActive}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-lg shadow-cyan-900/20"
          >
            {changeState.isPending ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ChangeStatusCatDialog;
