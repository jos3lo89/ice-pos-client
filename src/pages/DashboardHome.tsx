import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  DollarSign,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  UtensilsCrossed,
} from "lucide-react";

const DashboardHome = () => {
  const stats = [
    {
      title: "Ingresos Hoy",
      value: "$1,250.00",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      title: "Pedidos Totales",
      value: "45",
      change: "+5%",
      trend: "up",
      icon: ShoppingCart,
      color: "bg-blue-500",
    },
    {
      title: "Mesas Activas",
      value: "8/12",
      change: "66%",
      trend: "neutral",
      icon: UtensilsCrossed,
      color: "bg-purple-500",
    },
    {
      title: "Ticket Promedio",
      value: "$27.80",
      change: "-2%",
      trend: "down",
      icon: Clock,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-white">Resumen</h1>
        <p className="text-gray-400">
          Vista general del rendimiento del restaurante
        </p>
      </div>

      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-slate-800 border-slate-700 text-slate-100"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-20`}>
                  <stat.icon
                    className={`w-5 h-5 text-${stat.color.replace("bg-", "")}-400`}
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm">
                {stat.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : stat.trend === "down" ? (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                ) : null}
                <span
                  className={
                    stat.trend === "up"
                      ? "text-green-400"
                      : stat.trend === "down"
                        ? "text-red-400"
                        : "text-gray-400"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-gray-500">vs ayer</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Aquí podrías agregar las tablas de "Recent Orders" del archivo original */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h3 className="text-lg font-bold text-white mb-4">
            Pedidos Recientes
          </h3>
          <div className="text-gray-400 text-sm text-center py-10">
            Datos de la tabla aquí...
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h3 className="text-lg font-bold text-white mb-4">Top Productos</h3>
          <div className="text-gray-400 text-sm text-center py-10">
            Lista de productos aquí...
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
