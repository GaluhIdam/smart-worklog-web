import {
  CalendarCheck,
  FolderKanban,
  LayoutDashboard,
  UserCheck,
  Users,
  UserRound,
  X,
  Activity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

type Role = "admin" | "hr" | "manager" | "employee";

interface NavigationItem {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
  roles?: Role[];
}

interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}

const navigation: NavigationGroup[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Workspace",
    items: [
      {
        label: "Cases",
        path: "/cases",
        icon: FolderKanban,
        roles: ["admin", "hr", "manager", "employee"],
      },
      {
        label: "Activities",
        path: "/activities",
        icon: Activity,
        roles: ["admin", "hr", "manager", "employee"],
      },
      {
        label: "Attendance",
        path: "/attendance",
        icon: CalendarCheck,
        roles: ["admin", "hr", "manager", "employee"],
      },
      {
        label: "Leave",
        path: "/leave",
        icon: UserCheck,
        roles: ["admin", "hr", "manager", "employee"],
      },
      {
        label: "Employee",
        path: "/employees",
        icon: Users,
        roles: ["admin", "hr"],
      },
    ],
  },
  {
    label: "Administration",
    items: [
      {
        label: "Account",
        path: "/account",
        icon: UserRound,
        roles: ["admin"],
      },
    ],
  },
];

const getItemClass = (isActive: boolean, collapsed: boolean) => {
  const base = "group relative flex h-9 items-center rounded-md text-[13px] font-medium transition-colors duration-150";
  const layout = collapsed ? "justify-center px-0" : "gap-2.5 px-2.5";
  const state = isActive ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900";
  return `${base} ${layout} ${state}`;
};

export default function Sidebar({ collapsed, mobileOpen, onToggle, onClose }: SidebarProps) {
  const { user } = useAuth();
  const role = user?.role?.slug as Role | undefined;
  const visibleNavigation = navigation
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => !item.roles || (role && item.roles.includes(role))),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[1px] lg:hidden"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 top-14 z-50 border-r border-slate-200 bg-white",
          "transition-[width,transform] duration-200 ease-out",
          collapsed ? "w-16" : "w-56",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}>
        <div className="flex h-full flex-col">
          <div className="flex h-11 items-center justify-between border-b border-slate-100 px-2 lg:hidden">
            <span className="px-2 text-xs font-semibold text-slate-700">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
              <X size={16} strokeWidth={1.8} />
            </button>
          </div>

          <nav aria-label="Main navigation" className="flex-1 overflow-y-auto px-2 py-3">
            {visibleNavigation.map((group) => (
              <div key={group.label} className="mb-5 last:mb-0">
                {!collapsed && (
                  <p className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">{group.label}</p>
                )}

                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        title={collapsed ? item.label : undefined}
                        className={({ isActive }) => getItemClass(isActive, collapsed)}>
                        {({ isActive }) => (
                          <>
                            {isActive && !collapsed && <span className="absolute left-0 h-5 w-0.5 rounded-r-full bg-slate-900" />}
                            <Icon size={16} strokeWidth={isActive ? 2 : 1.8} className="shrink-0" />
                            {!collapsed && <span className="truncate">{item.label}</span>}
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="border-t border-slate-200 p-2">
            <button
              type="button"
              onClick={onToggle}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="mt-1 hidden h-8 w-full cursor-pointer items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 lg:flex">
              {collapsed ? <ChevronRight size={16} strokeWidth={1.8} /> : <ChevronLeft size={16} strokeWidth={1.8} />}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
