import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetProfile } from "../hooks/useUsers";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import {
  User,
  Phone,
  Shield,
  BadgeCheck,
  Clock,
  Mail,
  Smartphone,
  CheckCircle2,
  XCircle,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileDialog = ({ open, onOpenChange }: ProfileDialogProps) => {
  const profileQuery = useGetProfile();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const InfoRow = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: React.ElementType;
    label: string;
    value: string;
  }) => (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:bg-slate-800/60 hover:border-cyan-500/20 transition-all group">
      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-200 truncate">{value}</p>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#1e293b] border-slate-700/50 text-slate-100 p-0 gap-0 overflow-hidden">
        {profileQuery.isLoading && (
          <div className="p-8">
            <LoadingState message="Cargando perfil..." />
          </div>
        )}

        {profileQuery.isError && (
          <div className="p-8">
            <ErrorState
              onRetry={() => profileQuery.refetch()}
              message="Error al cargar el perfil"
            />
          </div>
        )}

        {profileQuery.data && (
          <>
            <DialogHeader className="sr-only">
              <DialogTitle>Mi Perfil</DialogTitle>
              <DialogDescription />
            </DialogHeader>

            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-500 via-blue-500 to-cyan-500" />

              <div className="relative p-6 pb-4 text-center border-b border-slate-700/50">
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-cyan-500/20 ring-4 ring-slate-800">
                    {profileQuery.data.nombre_completo.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-slate-800 border-2 border-slate-700">
                    <BadgeCheck className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white mb-1">
                  {profileQuery.data.nombre_completo}
                </h2>
                <p className="text-cyan-500 font-black uppercase tracking-widest text-xs mb-3">
                  {profileQuery.data.rol}
                </p>

                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight",
                    profileQuery.data.esta_activo
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20",
                  )}
                >
                  {profileQuery.data.esta_activo ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <XCircle className="w-3 h-3" />
                  )}
                  {profileQuery.data.esta_activo ? "Activo" : "Inactivo"}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <InfoRow
                icon={User}
                label="Nombre Completo"
                value={profileQuery.data.nombre_completo}
              />
              <InfoRow
                icon={Mail}
                label="Usuario"
                value={profileQuery.data.usuario}
              />
              <InfoRow
                icon={Shield}
                label="Rol del Sistema"
                value={profileQuery.data.rol}
              />
              <InfoRow
                icon={Phone}
                label="Teléfono"
                value={profileQuery.data.telefono || "No registrado"}
              />

              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/30 border border-slate-700/30">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <div>
                    <p className="text-[9px] text-slate-500 uppercase">
                      Registro
                    </p>
                    <p className="text-xs font-medium text-slate-300">
                      {formatDate(profileQuery.data.fecha_creacion)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/30 border border-slate-700/30">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <div>
                    <p className="text-[9px] text-slate-500 uppercase">
                      Actualizado
                    </p>
                    <p className="text-xs font-medium text-slate-300">
                      {formatDate(profileQuery.data.fecha_actualizacion)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/15 flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-cyan-500/10">
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Para modificar tus datos, contacta a un{" "}
                  <span className="text-cyan-400 font-medium">
                    administrador
                  </span>
                  .
                </p>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
