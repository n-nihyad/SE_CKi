import { Outlet } from "react-router-dom";
import Sidebar from "../modules/components/Sidebar";
import Header from "../modules/components/Header";

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />
        <div className="p-2 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
