import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header sidebarCollapsed={sidebarCollapsed} onMenuClick={() => setMobileSidebarOpen(true)} />

      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onToggle={() => setSidebarCollapsed((value) => !value)}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <main
        className={["min-h-screen pt-16 transition-[padding] duration-200", sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-[240px]"].join(" ")}>
        <div className="px-4 py-5 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
