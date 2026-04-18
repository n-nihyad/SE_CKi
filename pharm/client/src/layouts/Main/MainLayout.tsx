import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";

import { Menu } from "lucide-react";

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false); // 👈 reset khi lên md
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen gap-2 bg-slate-100 text-slate-900">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar mobile + animation */}
      <div
        className={`md:hidden fixed inset-0 z-50 flex ${
          open ? "visible" : "invisible"
        }`}
      >
        {/* Sidebar */}
        <div
          className={`w-70 bg-white shadow-xl transform transition-transform duration-250 ease-in-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </div>

        {/* Overlay */}
        <div
          className={`flex-1 bg-black/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
      </div>

      <main className="flex-1 flex flex-col">
        {/* Top bar mobile */}
        <div className="md:hidden flex items-end pt-1 ps-3 m-0">
          <button
            className="p-1 m-0 bg-white/80 rounded-sm backdrop-blur border-b border-slate-100"
            onClick={() => setOpen(true)}
          >
            <Menu size={35} />
          </button>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
