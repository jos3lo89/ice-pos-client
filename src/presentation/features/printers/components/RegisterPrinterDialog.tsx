import { useState } from "react";
import { useCreatePrinter } from "@/application/hooks/usePrinter";
import type {
  PrinterLocal,
  PrinterNetwork,
} from "@/core/entities/printer.entity";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/presentation/components/ui/dialog";
import { Button } from "@/presentation/components/ui/button";
import { Printer, Network, Usb } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  printer: PrinterLocal | PrinterNetwork | null;
}

const DESTINOS = [
  { id: "caja", label: "Caja", activeClass: "bg-amber-500/10 border-amber-500 text-amber-400" },
  { id: "bar", label: "Bar", activeClass: "bg-cyan-500/10 border-cyan-500 text-cyan-400" },
  { id: "cocina", label: "Cocina", activeClass: "bg-rose-500/10 border-rose-500 text-rose-400" },
] as const;

const RegisterPrinterDialog = ({ open, onClose, printer }: Props) => {
  const [nombre, setNombre] = useState<(typeof DESTINOS)[number]["id"]>("caja");
  const { mutate, isPending } = useCreatePrinter();

  if (!printer) return null;

  const handleSave = () => {
    const payload =
      printer.type === "network"
        ? { nombre, tipo: "network" as const, ip: printer.ip, puerto: printer.port }
        : { nombre, tipo: "usb" as const };

    mutate(payload, { onSuccess: onClose });
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-800 text-slate-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-white">
            <Printer className="w-5 h-5 text-cyan-500" />
            Registrar Impresora
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Escoge dónde estará físicamente esta impresora para que el sistema le asigne correctamente los tickets.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-5 border-y border-slate-800/50 my-2">
          
          {/* Printer Info Card */}
          <div className="flex items-center gap-3 p-3 bg-slate-950/40 border border-slate-800 rounded-lg mb-6">
            <div className={`p-2 rounded-md ${printer.type === "network" ? 'bg-blue-500/20 text-blue-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
              {printer.type === "network" ? <Network className="w-4 h-4" /> : <Usb className="w-4 h-4" />}
            </div>
            <div>
              <p className="font-semibold text-slate-200 text-sm">{printer.name}</p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
               {printer.type === "network" ? `${printer.ip}:${printer.port}` : "Conexión Local USB"}
              </p>
            </div>
          </div>

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Destino de impresión
          </p>
          <div className="flex gap-2">
            {DESTINOS.map((d) => (
              <button
                key={d.id}
                onClick={() => setNombre(d.id)}
                className={`flex-1 py-3 px-2 rounded-xl text-sm font-bold border-2 transition-all shadow-sm ${
                  nombre === d.id
                    ? d.activeClass
                    : "bg-slate-800/60 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:border-slate-700 hover:text-slate-300"
                }`}
              >
                {d.label}
              </button>
            ))}
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
            {isPending ? "Registrando..." : "Registrar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterPrinterDialog;
