import { useState, useRef } from "react";
import { useSaveNetworkConfig } from "@/application/hooks/usePrinter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/presentation/components/ui/dialog";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Network, Server } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const NetworkConfigDialog = ({ open, onClose }: Props) => {
  const [octets, setOctets] = useState<[string, string, string]>(["192", "168", "1"]);
  const port = 9100; // Siempre en 9100 por petición del usuario
  const { mutate, isPending } = useSaveNetworkConfig();
  
  const inputsRef = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleOctetChange = (index: number, value: string) => {
    if (value && !/^\d*$/.test(value)) return;
    if (value && parseInt(value) > 255) return;

    const newOctets = [...octets] as [string, string, string];
    newOctets[index] = value;
    setOctets(newOctets);

    // Auto focus al siguiente
    if (value.length === 3 && index < 2) {
      inputsRef[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Focus anterior si se borra
    if (e.key === "Backspace" && !octets[index] && index > 0) {
      inputsRef[index - 1].current?.focus();
    }
  };

  const handleSave = () => {
    // Validar al menos los campos, sino poner defaults
    const validOctets = octets.map(o => o || "0");
    const seg = `${validOctets[0]}.${validOctets[1]}.${validOctets[2]}.`;
    mutate({ segment: seg, port }, { onSuccess: onClose });
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-800 text-slate-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-white">
            <Network className="w-5 h-5 text-cyan-500" />
            Configurar red
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Ingresa la sub-red donde buscarás las impresoras. El último cuadro es el rango que escanearemos.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-6 border-y border-slate-800/50 my-2">
          
          <div className="space-y-4">
            <Label className="text-slate-300 font-medium tracking-wide text-xs uppercase">Segmento IP Base</Label>
            <div className="flex items-center gap-2 justify-between max-w-[340px] mx-auto">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    ref={inputsRef[idx]}
                    value={octets[idx]}
                    onChange={(e) => handleOctetChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-16 h-14 text-center text-lg font-semibold bg-slate-950/50 border-slate-700 text-cyan-400 focus-visible:border-cyan-500 focus-visible:ring-1 focus-visible:ring-cyan-500/50 tabular-nums shadow-inner transition-all"
                    maxLength={3}
                    placeholder="0"
                  />
                  <span className="text-slate-600 font-bold text-xl mb-2">.</span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Input
                  disabled
                  value="*"
                  className="w-16 h-14 text-center text-2xl font-black bg-slate-950/20 border-slate-800 text-slate-600 cursor-not-allowed tabular-nums shadow-none outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="port" className="text-slate-300 font-medium tracking-wide text-xs uppercase flex items-center gap-2">
              <Server className="w-3.5 h-3.5" />
              Puerto
            </Label>
            <Input
              id="port"
              type="number"
              disabled
              value={port}
              className="bg-slate-950/30 border-slate-800 text-slate-500 font-medium cursor-not-allowed opacity-70"
            />
            <p className="text-[11px] text-cyan-500/60 font-medium">El puerto a consultar está fijado por defecto.</p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0 border-none pt-2">
          <Button 
            variant="outline" 
            onClick={onClose} 
            disabled={isPending}
            className="border-slate-700 hover:bg-slate-800 text-slate-300"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isPending} 
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-lg shadow-cyan-900/20"
          >
            {isPending ? "Guardando..." : "Guardar Configuración"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NetworkConfigDialog;
