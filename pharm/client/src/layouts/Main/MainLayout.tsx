import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="flex h-screen gap-2 bg-slate-100 text-slate-900">
      <Sidebar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
