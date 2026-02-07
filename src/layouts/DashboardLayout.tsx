import AuthFallback from "@/components/common/AuthFallback";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import {
  allNavItems,
  type NavItem,
} from "@/features/dashboard/components/NavItems";
import { useAuthStore } from "@/stores/auth.store";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
  PanelLeft,
  PanelLeftClose,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

/**
 * DashboardLayout - Unified administration environment with responsive sidebars and sub-menus.
 */
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const location = useLocation();
  const { logout, user } = useAuthStore();

  if (!user) {
    return <AuthFallback />;
  }

  const navGroups = allNavItems.filter((group) => group.role === user.role);
  const navItems = navGroups.flatMap((group) => group.children);

  // Auto-expand menu if child is active
  useEffect(() => {
    navItems.forEach((item) => {
      if (item.children?.some((child) => location.pathname === child.to)) {
        if (!expandedItems.includes(item.label)) {
          setExpandedItems((prev) => [...prev, item.label]);
        }
      }
    });
  }, [location.pathname]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label],
    );
  };

  const handleLogout = () => {
    logout();
  };

  const NavLinkComponent = ({
    item,
    isMobile = false,
  }: {
    item: NavItem;
    isMobile?: boolean;
  }) => {
    const hasChildren = !!item.children;
    const isExpanded = expandedItems.includes(item.label);
    const isActive = item.to
      ? item.exact
        ? location.pathname === item.to
        : location.pathname.startsWith(item.to) &&
          (item.to !== "/" || location.pathname === "/")
      : item.children?.some((c) => location.pathname === c.to);

    if (hasChildren) {
      return (
        <div className="space-y-1">
          <button
            onClick={() => toggleExpand(item.label)}
            className={cn(
              "group relative flex items-center h-11 w-full rounded-xl transition-all duration-300",
              isActive && !isExpanded
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                : "text-gray-400 hover:text-white hover:bg-slate-700/50",
              sidebarCollapsed && !isMobile && "justify-center",
            )}
            title={sidebarCollapsed && !isMobile ? item.label : undefined}
          >
            <div
              className={cn(
                "shrink-0 flex items-center justify-center",
                sidebarCollapsed && !isMobile ? "w-11 h-11" : "w-10 h-10",
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5",
                  isActive
                    ? "text-cyan-400"
                    : "group-hover:scale-110 transition-transform",
                )}
              />
            </div>
            {(isMobile || !sidebarCollapsed) && (
              <>
                <span className="font-semibold text-sm tracking-tight flex-1 text-left ml-2">
                  {item.label}
                </span>
                <div className="pr-3">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 opacity-70" />
                  ) : (
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  )}
                </div>
              </>
            )}
          </button>

          {(isMobile || !sidebarCollapsed) && isExpanded && (
            <div className="pl-6 space-y-1 border-l border-slate-700/50 ml-5">
              {item.children?.map((child) => {
                const isChildActive = location.pathname === child.to;
                return (
                  <Link
                    key={child.to}
                    to={child.to}
                    onClick={() => isMobile && setSidebarOpen(false)}
                    className={cn(
                      "flex items-center h-9 px-4 rounded-lg text-xs font-medium transition-all group",
                      isChildActive
                        ? "text-cyan-400 bg-cyan-400/10"
                        : "text-gray-500 hover:text-gray-200 hover:bg-slate-700/30",
                    )}
                  >
                    <child.icon className="w-3.5 h-3.5 mr-3" />
                    {child.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        to={item.to!}
        onClick={() => isMobile && setSidebarOpen(false)}
        className={cn(
          "group relative flex items-center h-11 rounded-xl transition-all duration-300 overflow-hidden",
          isActive
            ? "bg-linear-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/20"
            : "text-gray-400 hover:text-white hover:bg-slate-700/50",
          sidebarCollapsed && !isMobile && "justify-center",
        )}
        title={sidebarCollapsed && !isMobile ? item.label : undefined}
      >
        <div
          className={cn(
            "shrink-0 flex items-center justify-center",
            sidebarCollapsed && !isMobile ? "w-11 h-11" : "w-10 h-10",
          )}
        >
          <item.icon
            className={cn(
              "w-5 h-5",
              isActive
                ? "scale-110"
                : "group-hover:scale-110 transition-transform",
            )}
          />
        </div>
        {(isMobile || !sidebarCollapsed) && (
          <span className="font-semibold text-sm tracking-tight transition-all duration-300 whitespace-nowrap ml-2">
            {item.label}
          </span>
        )}
        {isActive && !isMobile && !sidebarCollapsed && (
          <div className="absolute right-0 w-1 h-5 bg-white/30 rounded-l-full" />
        )}
      </Link>
    );
  };

  return (
    <div className="h-screen w-full bg-[#0f172a] flex text-slate-100 font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 bg-[#1e293b] border-r border-slate-700/50 transition-all duration-300 ease-in-out flex flex-col shadow-2xl",
          sidebarCollapsed ? "lg:w-20" : "w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-4 gap-3 border-b border-slate-700/50 overflow-hidden shrink-0">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20">
            <UtensilsCrossed className="w-6 h-6 text-white" />
          </div>
          {(!sidebarCollapsed || sidebarOpen) && (
            <div className="overflow-hidden animate-in fade-in slide-in-from-left-2 duration-500">
              <h1 className="text-lg font-bold text-white leading-none">
                Ice POS
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-cyan-500 font-black mt-1">
                Gestión
              </p>
            </div>
          )}
          {sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-auto p-2 text-gray-400 hover:text-white lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav
          className={cn(
            "flex-1 py-6 px-3 space-y-2 overflow-y-auto scrollbar-none",
            sidebarCollapsed && !sidebarOpen && "px-2",
          )}
        >
          {navItems.map((item) => (
            <NavLinkComponent
              key={item.label}
              item={item}
              isMobile={sidebarOpen}
            />
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-700/50 space-y-4">
          {!sidebarCollapsed || sidebarOpen ? (
            <Link
              to="/perfil"
              className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 hover:border-cyan-500/30 transition-all group"
            >
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-bold text-sm shadow-inner shrink-0 group-hover:ring-2 ring-cyan-500/50 transition-all">
                {user.full_name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
                  {user.full_name}
                </p>
                <p className="text-[10px] text-gray-400 capitalize">
                  {user.role}
                </p>
              </div>
            </Link>
          ) : (
            <Link
              to="/perfil"
              className="flex justify-center"
              title={user.full_name}
            >
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-bold text-sm shadow-inner hover:ring-2 ring-cyan-500/50 transition-all">
                {user.full_name.charAt(0)}
              </div>
            </Link>
          )}

          <div className="flex flex-col gap-2">
            <ConfirmDialog
              title="¿Confirmar cierre de sesión?"
              confirmText="Cerrar Sesión"
              onConfirm={handleLogout}
            >
              <button
                className={cn(
                  "flex items-center w-full h-10 rounded-xl text-red-400 hover:bg-red-400/10 transition-all group overflow-hidden",
                  sidebarCollapsed && !sidebarOpen ? "justify-center" : "px-3",
                )}
              >
                <div className="shrink-0 flex items-center justify-center w-6 h-6">
                  <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                </div>
                {(!sidebarCollapsed || sidebarOpen) && (
                  <span className="font-semibold text-sm ml-3">Salir</span>
                )}
              </button>
            </ConfirmDialog>

            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex items-center justify-center w-full h-10 rounded-xl bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              {sidebarCollapsed ? (
                <PanelLeft className="w-5 h-5" />
              ) : (
                <PanelLeftClose className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#0f172a]">
        {/* Desktop/Mobile Header */}
        <header className="h-16 bg-[#1e293b]/50 backdrop-blur-md border-b border-slate-700/50 flex items-center px-6 justify-between shrink-0 z-30">
          <button
            className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-wider">
                Hoy
              </span>
              <span className="text-xs text-gray-300 font-medium">
                {new Date().toLocaleDateString("es-PE", { dateStyle: "full" })}
              </span>
            </div>
          </div>
        </header>

        {/* Top Gradient Line */}
        <div className="h-[2px] w-full bg-linear-to-r from-cyan-500/50 via-blue-600/50 to-transparent shrink-0" />

        {/* View Port */}
        <div className="flex-1 overflow-y-auto scroll-smooth relative p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>

          {/* Background Texture Overlay */}
          <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
