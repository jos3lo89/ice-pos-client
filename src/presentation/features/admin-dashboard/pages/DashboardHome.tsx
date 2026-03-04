import { Link } from "react-router-dom";
import { Card, CardContent } from "@/presentation/components/ui/card";
import {
  Trophy,
  CalendarDays,
  CalendarRange,
  CalendarCheck,
  History,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

const DashboardHome = () => {
  const reportLinks = [
    {
      to: "/reportes/ranking-productos",
      title: "Ranking de Productos",
      description: "Analiza cuáles son tus artículos más vendidos",
      icon: Trophy,
      color: "emerald",
    },
    {
      to: "/reportes/ventas-dia",
      title: "Ventas por Día",
      description: "Seguimiento detallado de ingresos diarios",
      icon: CalendarDays,
      color: "cyan",
    },
    {
      to: "/reportes/ventas-semana",
      title: "Ventas por Semana",
      description: "Evolución y rendimiento semanal",
      icon: CalendarRange,
      color: "blue",
    },
    {
      to: "/reportes/ventas-mes",
      title: "Ventas por Mes",
      description: "Balance y métricas mensuales",
      icon: CalendarCheck,
      color: "indigo",
    },
    {
      to: "/reportes/historial-sesiones",
      title: "Historial de Sesiones",
      description: "Registro sistemático de aperturas y cierres",
      icon: History,
      color: "purple",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportLinks.map((link, index) => (
          <Link key={index} to={link.to} className="group">
            <Card className="h-full bg-slate-900/40 backdrop-blur-md border-white/5 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden relative group">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardContent className="p-8 relative z-10 flex flex-col h-full">
                <div
                  className={`w-14 h-14 rounded-2xl bg-${link.color}-500/10 flex items-center justify-center mb-6 border border-${link.color}-500/20 group-hover:scale-110 transition-transform duration-500`}
                >
                  <link.icon className={`w-7 h-7 text-${link.color}-400`} />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {link.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {link.description}
                </p>

                <div className="mt-auto flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  Ver Reporte <ArrowRight className="w-3 h-3" />
                </div>
              </CardContent>

              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp className="w-12 h-12 rotate-[-10deg]" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>
    </div>
  );
};

export default DashboardHome;
