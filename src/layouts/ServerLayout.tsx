import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import {
  Menu,
  Utensils,
  LogOut,
  LayoutDashboard,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { cn } from "@/lib/utils";
import AuthFallback from "@/components/common/AuthFallback";

const ServerLayout = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return <AuthFallback />;
  }

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const navItems = [{ label: "Mesas y Salones", to: "/mesas", icon: Utensils }];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-sans">
      {/* Mobile Top Header */}
      <header className="h-16 bg-[#1e293b]/80 backdrop-blur-md border-b border-slate-700/50 flex items-center px-4 justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white rounded-xl"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[280px] bg-[#1e293b] border-slate-800 p-0 flex flex-col outline-none"
            >
              <SheetHeader className="p-6 border-b border-slate-800">
                <SheetTitle className="text-left flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <LayoutDashboard className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg leading-none">
                      Ice POS
                    </span>
                    <span className="text-[10px] text-cyan-500 font-black uppercase tracking-widest mt-1">
                      Terminal Móvil
                    </span>
                  </div>
                </SheetTitle>
                <SheetDescription />
              </SheetHeader>

              <div className="flex-1 py-6 px-3 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl transition-all group",
                      isActive(item.to)
                        ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        className={cn(
                          "w-5 h-5",
                          isActive(item.to) ? "text-white" : "text-slate-500",
                        )}
                      />
                      <span className="font-bold text-sm tracking-tight">
                        {item.label}
                      </span>
                    </div>
                    {!isActive(item.to) && (
                      <ChevronRight className="w-4 h-4 opacity-30" />
                    )}
                  </Link>
                ))}
              </div>

              <div className="p-4 border-t border-slate-800 space-y-4">
                <Link
                  to="/perfil"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-bold shadow-inner">
                    {user.full_name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">
                      {user.full_name}
                    </p>
                    <p className="text-[10px] text-cyan-500 font-black uppercase tracking-widest">
                      {user.role}
                    </p>
                  </div>
                </Link>

                <ConfirmDialog
                  title="¿Cerrar sesión?"
                  confirmText="Salir ahora"
                  onConfirm={handleLogout}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-12 rounded-2xl text-red-400 hover:text-red-300 hover:bg-red-400/10 gap-3 px-4"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-bold">Cerrar Sesión</span>
                  </Button>
                </ConfirmDialog>
              </div>
            </SheetContent>
          </Sheet>

          <Link to="/mesas" className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-cyan-500" />
            {/* <span className="font-bold tracking-tight text-white uppercase text-sm">
              Pedidos
            </span> */}
          </Link>
        </div>

        <Link
          to="/perfil"
          className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-cyan-400 shadow-inner"
        >
          {user.full_name.charAt(0)}
        </Link>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col overflow-x-hidden relative">
        <div className="w-full flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ServerLayout;
