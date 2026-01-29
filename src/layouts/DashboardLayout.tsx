import AuthFallback from "@/components/common/AuthFallback";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { allNavItems } from "@/features/dashboard/components/NavItems";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth.store";
import {
  LogOut,
  Menu,
  PanelLeft,
  PanelLeftClose,
  UtensilsCrossed,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { logout, user } = useAuthStore();

  if (!user) {
    return <AuthFallback />;
  }

  const navItems = allNavItems
    .filter((item) => item.role === user.role)
    .map((item) => item.children)
    .flat();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-screen w-full bg-slate-900 flex text-slate-100 font-sans overflow-hidden">
      {/* <div className="min-h-screen bg-slate-900 flex text-slate-100 font-sans"> */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-slate-800 border-r border-slate-700 transform transition-all duration-200 ease-in-out ${
          sidebarCollapsed ? "lg:w-20" : "w-64"
        } ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-slate-700 h-16 flex items-center">
            <div
              className={`flex items-center w-full ${sidebarCollapsed ? "justify-center" : "gap-3"}`}
            >
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                <UtensilsCrossed className="w-6 h-6 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className="text-lg font-bold text-white">Ice POS</h1>
                  <p className="text-xs text-gray-400">Gestión Restaurante</p>
                </div>
              )}
            </div>
          </div>

          <nav
            className={`flex-1 space-y-1 overflow-y-auto ${sidebarCollapsed ? "p-2" : "p-4"}`}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center rounded-lg transition-colors
                  ${sidebarCollapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5"}
                  ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      : "text-gray-300 hover:bg-slate-700 hover:text-white"
                  }
                `}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          <div
            className={`border-t border-slate-700 ${sidebarCollapsed ? "p-2" : "p-4"}`}
          >
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex w-full items-center justify-center p-2 mb-3 rounded-lg text-gray-400 hover:bg-slate-700 hover:text-white"
            >
              {sidebarCollapsed ? (
                <PanelLeft className="w-5 h-5" />
              ) : (
                <PanelLeftClose className="w-5 h-5" />
              )}
            </button>

            {!sidebarCollapsed && (
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-white font-bold">
                  {user.full_name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-white truncate">
                    {user.full_name}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">
                    {user.role}
                  </p>
                </div>
              </div>
            )}

            <ConfirmDialog
              title="¿Confirmar cierre de sesión?"
              confirmText="Cerrar Sesión"
              onConfirm={handleLogout}
            >
              <Button
                variant="outline"
                className={`w-full bg-slate-700/50 border-slate-600 text-gray-300 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 ${
                  sidebarCollapsed
                    ? "p-2 justify-center"
                    : "justify-start gap-2"
                }`}
              >
                <LogOut className="w-4 h-4" />
                {!sidebarCollapsed && "Salir"}
              </Button>
            </ConfirmDialog>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-slate-900">
        <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center px-4 justify-between lg:justify-end">
          <button
            className="lg:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden lg:flex items-center gap-4">
            <span className="text-sm text-gray-400">
              {new Date().toLocaleDateString("es-PE", { dateStyle: "full" })}
              {/* <span> | </span>
              {new Date().toLocaleTimeString("es-PE", {
                hour12: true,
                timeStyle: "short",
              })} */}
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scroll-smooth p-4 lg:p-6 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
