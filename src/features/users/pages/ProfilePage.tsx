import LoadingState from "@/components/common/LoadingState";
import { useGetProfile } from "../hooks/useUsers";
import ErrorState from "@/components/common/ErrorState";
import {
  User,
  Phone,
  Calendar,
  Shield,
  BadgeCheck,
  Clock,
  ArrowLeft,
  Mail,
  Smartphone,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const ProfilePage = () => {
  const profileQuery = useGetProfile();

  if (profileQuery.isLoading) {
    return <LoadingState message="Cargando perfil..." />;
  }

  if (profileQuery.isError) {
    return (
      <ErrorState
        onRetry={() => profileQuery.refetch()}
        message="Error al cargar el perfil"
      />
    );
  }

  const profile = profileQuery.data;

  if (!profile) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const InfoCard = ({
    icon: Icon,
    label,
    value,
    className,
  }: {
    icon: any;
    label: string;
    value: string | React.ReactNode;
    className?: string;
  }) => (
    <div
      className={cn(
        "p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex items-start gap-4 transition-all hover:bg-slate-800/60 hover:border-cyan-500/30 group",
        className,
      )}
    >
      <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
          {label}
        </p>
        <div className="text-slate-100 font-semibold">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium mb-2 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </Link>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Mi <span className="text-cyan-500">Perfil</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Gestiona la información de tu cuenta y preferencias.
          </p>
        </div>

        <div className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center gap-2 text-sm font-bold animate-pulse">
          <BadgeCheck className="w-4 h-4" />
          Sesión Activa
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="relative group overflow-hidden rounded-3xl bg-linear-to-b from-slate-800 to-[#1e293b] border border-slate-700/50 p-8 text-center shadow-2xl">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <User className="w-32 h-32 -rotate-12" />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="mx-auto w-24 h-24 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-cyan-500/20 ring-4 ring-slate-800">
                {profile.full_name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {profile.full_name}
                </h2>
                <p className="text-cyan-500 font-medium uppercase tracking-widest text-xs mt-1">
                  {profile.role}
                </p>
              </div>

              <div className="flex justify-center gap-2 pt-2">
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1.5",
                    profile.is_active
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20",
                  )}
                >
                  {profile.is_active ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <XCircle className="w-3 h-3" />
                  )}
                  {profile.is_active ? "Estado: Activo" : "Estado: Inactivo"}
                </span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-700/50 grid grid-cols-1 gap-4 text-left font-sans">
              <div className="flex items-center gap-3 text-slate-300 text-sm">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="truncate">{profile.username}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 text-sm">
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>{profile.phone || "No registrado"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8 space-y-8">
            <section>
              <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-cyan-500" />
                Información de la Cuenta
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard
                  icon={User}
                  label="Nombre Completo"
                  value={profile.full_name}
                />
                <InfoCard
                  icon={Mail}
                  label="Nombre de Usuario / Email"
                  value={profile.username}
                />
                <InfoCard
                  icon={Shield}
                  label="Rol del Sistema"
                  value={profile.role}
                />
                <InfoCard
                  icon={Phone}
                  label="Teléfono de Contacto"
                  value={profile.phone || "N/A"}
                />
              </div>
            </section>

            <section className="pt-8 border-t border-slate-700/50">
              <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 text-cyan-500" />
                Registro y Actividad
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard
                  icon={Calendar}
                  label="Fecha de Registro"
                  value={formatDate(profile.created_at)}
                />
                <InfoCard
                  icon={Clock}
                  label="Última Actualización"
                  value={formatDate(profile.updated_at)}
                />
              </div>
            </section>

            <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex flex-col sm:flex-row items-center gap-6 justify-between">
              <div className="space-y-1 text-center sm:text-left">
                <p className="text-white font-bold">Importante</p>
                <p className="text-slate-400 text-sm">
                  Si necesitas modificar tus datos de perfil, por favor contacta
                  con un administrador del sistema.
                </p>
              </div>
              <button className="px-6 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-sm border border-slate-700 hover:bg-slate-700 transition-all shadow-lg shrink-0">
                Contactar Soporte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
