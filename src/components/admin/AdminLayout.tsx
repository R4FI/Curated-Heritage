import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { authStorage } from "@/lib/secureStorage";
import { authService } from "@/services/authService";
import toast from "react-hot-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Inventory",
      path: "/admin/inventory",
      icon: Package,
    },
    {
      label: "Orders",
      path: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      label: "Analytics",
      path: "/admin/analytics",
      icon: BarChart3,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  const handleLogout = async () => {
    try {
      await authService.logout();
      authStorage.clearTokens();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const user = authStorage.getUser();

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar - Desktop */}
      <aside
        className={`hidden md:flex fixed left-0 top-0 h-screen border-r bg-slate-50 flex-col p-4 z-40 transition-all duration-300 ${
          sidebarExpanded ? "w-64" : "w-20"
        }`}
      >
        {/* Header */}
        <div className="mb-10 px-2 flex items-center justify-between">
          {sidebarExpanded ? (
            <div>
              <h1 className="font-heading font-bold text-emerald-900 text-2xl tracking-tight">
                Heritage Admin
              </h1>
              <p className="font-body text-sm text-slate-500 mt-1">
                Heritage Management
              </p>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold text-xl">
                H
              </div>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
          className="absolute -right-3 top-20 w-6 h-6 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          {sidebarExpanded ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {/* Navigation */}
        <nav className="flex-grow space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:translate-x-1 ${
                  isActive
                    ? "bg-emerald-100 text-emerald-900 font-bold"
                    : "text-slate-500 hover:bg-slate-100"
                } ${!sidebarExpanded && "justify-center"}`}
                title={!sidebarExpanded ? item.label : ""}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarExpanded && (
                  <span className="font-body text-sm">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="mt-auto border-t border-slate-200 pt-4">
          {sidebarExpanded ? (
            <div className="flex items-center gap-3 px-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container overflow-hidden">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-bold text-sm">
                    {user?.name?.charAt(0) || "A"}
                  </span>
                )}
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-sm font-semibold truncate">
                  {user?.name || "Admin User"}
                </p>
                <button
                  onClick={handleLogout}
                  className="text-xs font-body text-slate-500 uppercase tracking-widest hover:text-emerald-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full flex justify-center p-2 text-slate-500 hover:text-error transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-50 border-b z-50 flex items-center justify-between px-4">
        <h1 className="font-heading font-bold text-emerald-900 text-xl">
          Heritage Admin
        </h1>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-700"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50">
          <aside className="absolute left-0 top-16 bottom-0 w-64 bg-slate-50 p-4 flex flex-col">
            <nav className="flex-grow space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-emerald-100 text-emerald-900 font-bold"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-body text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-slate-200 pt-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-error transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-body text-sm">Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main
        className={`flex-grow transition-all duration-300 ${
          sidebarExpanded ? "md:ml-64" : "md:ml-20"
        } mt-16 md:mt-0 p-4 md:p-8`}
      >
        {children}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95">
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default AdminLayout;
