import type { TableStatusT } from "@/common/types/order";
import { Coffee, Info, User, Utensils, type LucideIcon } from "lucide-react";

export const statusConfig: Record<
  TableStatusT,
  { label: string; color: string; icon: LucideIcon }
> = {
  disponible: {
    label: "Disponible",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: Coffee,
  },
  ocupada: {
    label: "Ocupada",
    color: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    icon: Utensils,
  },
  reservada: {
    label: "Reservada",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    icon: User,
  },
  limpieza: {
    label: "Limpieza",
    color: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    icon: Info,
  },
};
