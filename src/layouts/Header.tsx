import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, LogOut, Menu, Settings, UserRound } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

interface HeaderProps {
  sidebarCollapsed: boolean;
  onMenuClick: () => void;
}

export default function Header({ sidebarCollapsed, onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
  };

  const userName = user?.name ?? "User";
  const userEmail = user?.email ?? "";
  const userRole = user?.role?.name ?? "User";

  const initials = userName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-14 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center">
        <div
          className={[
            "hidden h-full items-center border-r border-slate-200 transition-[width] duration-200 lg:flex",
            sidebarCollapsed ? "w-16 justify-center" : "w-56 px-4",
          ].join(" ")}>
          {sidebarCollapsed ? (
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-xs font-bold text-white">S</div>
          ) : (
            <span className="text-[15px] font-semibold tracking-tight text-slate-900">Smart Worklog</span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 items-center px-3 sm:px-4">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:hidden">
            <Menu size={18} />
          </button>

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              aria-label="Notifications"
              className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900">
              <Bell size={17} strokeWidth={1.8} />

              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
            </button>

            <div className="mx-1 h-5 w-px bg-slate-200" />

            <div ref={profileRef} className="relative">
              <button
                type="button"
                aria-label="Account menu"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((open) => !open)}
                className={[
                  "flex h-8 cursor-pointer items-center gap-2 rounded-md px-1.5 transition-colors",
                  profileOpen ? "bg-slate-100" : "hover:bg-slate-100",
                ].join(" ")}>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-white">
                  {initials || "U"}
                </div>

                <div className="hidden text-left lg:block">
                  <p className="text-xs font-medium leading-none text-slate-700">{userName}</p>

                  <p className="mt-1 text-[10px] leading-none text-slate-400">{userRole}</p>
                </div>

                <ChevronDown
                  size={14}
                  strokeWidth={1.8}
                  className={["hidden text-slate-400 transition-transform lg:block", profileOpen ? "rotate-180" : ""].join(" ")}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-11 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg shadow-slate-950/5">
                  <div className="border-b border-slate-100 px-3 py-2.5">
                    <p className="text-xs font-semibold text-slate-900">{userName}</p>

                    <p className="mt-1 truncate text-[11px] text-slate-400">{userEmail}</p>

                    <p className="mt-1 text-[10px] text-slate-400">{userRole}</p>
                  </div>

                  <div className="p-1.5">
                    <button
                      type="button"
                      onClick={() => setProfileOpen(false)}
                      className="flex h-9 w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
                      <UserRound size={15} strokeWidth={1.8} />
                      Account
                    </button>

                    <button
                      type="button"
                      onClick={() => setProfileOpen(false)}
                      className="flex h-9 w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
                      <Settings size={15} strokeWidth={1.8} />
                      Settings
                    </button>
                  </div>

                  <div className="border-t border-slate-100 p-1.5">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex h-9 w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50">
                      <LogOut size={15} strokeWidth={1.8} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
