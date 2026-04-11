import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";

import {
  LayoutDashboard,
  Pill,
  History,
  Boxes,
  FileBarChart2,
  LogOut,
  PackagePlus,
  PackageMinus,
  RotateCcw,
  Map,
} from "lucide-react";

import logo from "../assets/images/logo.webp";

const menu = [
  {
    name: "Tổng quan",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["requestor", "warehouse_manager", "storekeeper"],
  },
  {
    name: "Kho thuốc",
    path: "/inventory",
    icon: Boxes,
    roles: ["warehouse_manager", "storekeeper"],
  },
  {
    name: "Lịch sử kho",
    path: "/stock-history",
    icon: History,
    roles: ["storekeeper", "warehouse_manager"],
  },
  {
    name: "Sơ đồ kho",
    path: "/map",
    icon: Map,
    roles: ["storekeeper", "warehouse_manager"],
  },
  {
    name: "Lấy thuốc",
    path: "/take-medicine",
    icon: Pill,
    roles: ["requestor"],
  },
  {
    name: "Trả thuốc",
    path: "/return-medicine",
    icon: RotateCcw,
    roles: ["requestor"],
  },
  {
    name: "Lịch sử",
    path: "/medicine-history",
    icon: History,
    roles: ["requestor"],
  },
  {
    name: "Xuất kho",
    path: "/export",
    icon: PackageMinus,
    roles: ["storekeeper"],
  },
  {
    name: "Nhập kho",
    path: "/import",
    icon: PackagePlus,
    roles: ["storekeeper"],
  },
  {
    name: "Báo cáo",
    path: "/report",
    icon: FileBarChart2,
    roles: ["warehouse_manager"],
  },
];

const roleLabel: Record<string, string> = {
  requestor: "Người yêu cầu",
  warehouse_manager: "Quản lý kho",
  storekeeper: "Thủ kho",
};
const roleColor: Record<string, string> = {
  requestor: "bg-blue-50 text-blue-600",
  warehouse_manager: "bg-violet-50 text-violet-600",
  storekeeper: "bg-emerald-50 text-emerald-600",
};

export default function Sidebar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const filteredMenu = menu.filter((item) =>
    item.roles.includes(user?.role || ""),
  );

  return (
    <aside className="flex h-screen max-w-70 flex-col bg-white border-r border-slate-100 rounded-xl">
      <div className="flex gap-2 px-1 py-2 h-25">
        <Link to="/dashboard" className="h-full">
          <img
            src={logo}
            alt="logo"
            className="h-full w-20 rounded-lg object-cover"
          />
        </Link>
        <div className="h-full flex flex-col justify-center">
          <p className="text-2xl w-45 font-bold text-slate-800 leading-none">
            Pharma WMS
          </p>
          <p className="mt-0.5 text-sm text-slate-400">Kho thuốc</p>
        </div>
      </div>
      <div className="h-10 text-3xl font-bold text-center mt-5">Menu</div>
      <nav className="flex-1 space-y-0.5 px-3">
        {filteredMenu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-5 rounded-lg px-3 py-2.5 text-xl transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={22}
                    className={isActive ? "text-white" : "text-slate-400"}
                  />
                  <span className="font-medium">{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
      <div className="border-t border-slate-100 p-1 space-y-0.5">
        {user && (
          <NavLink
            to="/profile"
            className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2.5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-600">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xl font-medium text-slate-700">
                {user.name}
              </p>
              <span
                className={`mt-0.5 inline-block rounded px-1 py-0.5 text-sm font-medium ${roleColor[user.role] ?? "bg-slate-100 text-slate-500"}`}
              >
                {roleLabel[user.role] ?? user.role}
              </span>
            </div>
          </NavLink>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xl text-slate-500 transition hover:bg-red-50 hover:text-red-500"
        >
          <LogOut size={22} className="text-slate-400" />
          <span className="font-medium">Đăng xuất</span>
        </button>
      </div>
    </aside>
    // <aside className="flex h-screen w-80 flex-col bg-white border-r border-slate-100 rounded-xl">
    //   {/* Logo */}
    //   <div className="px-5 py-6 h-20">
    //     <Link to="/dashboard" className="h-full flex items-center gap-3">
    //       <img
    //         src={logo}
    //         alt="logo"
    //         className="h-15 w-15 rounded-lg object-cover"
    //       />
    //       <div>
    //         <p className="text-xl font-bold text-slate-800 leading-none">
    //           Pharma WMS
    //         </p>
    //         <p className="mt-0.5 text-sm text-slate-400">Medicine Inventory</p>
    //       </div>
    //     </Link>
    //   </div>

    //   {/* Divider label */}
    //   <p className="mb-1 px-5 text-sm text-center font-medium uppercase tracking-wides">
    //     Menu
    //   </p>

    //   {/* Nav */}
    //   <nav className="flex-1 space-y-0.5 overflow-y-auto px-3">
    //     {filteredMenu.map((item) => {
    //       const Icon = item.icon;
    //       return (
    //         <NavLink
    //           key={item.path}
    //           to={item.path}
    //           className={({ isActive }) =>
    //             `flex items-center gap-5 rounded-lg px-3 py-2.5 text-xl transition ${
    //               isActive
    //                 ? "bg-blue-600 text-white"
    //                 : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
    //             }`
    //           }
    //         >
    //           {({ isActive }) => (
    //             <>
    //               <Icon
    //                 size={16}
    //                 className={isActive ? "text-white" : "text-slate-400"}
    //               />
    //               <span className="font-medium">{item.name}</span>
    //             </>
    //           )}
    //         </NavLink>
    //       );
    //     })}
    //   </nav>

    //   {/* Footer */}
    //   <div className="border-t border-slate-100 p-3 space-y-0.5">
    //     {/* User info */}
    // {user && (
    //   <NavLink
    //     to="/profile"
    //     className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2.5"
    //   >
    //     <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-600">
    //       {user.name?.charAt(0).toUpperCase()}
    //     </div>
    //     <div className="min-w-0">
    //       <p className="truncate text-sm font-medium text-slate-700">
    //         {user.name}
    //       </p>
    //       <span
    //         className={`mt-0.5 inline-block rounded px-1.5 py-0.5 text-xs font-medium ${roleColor[user.role] ?? "bg-slate-100 text-slate-500"}`}
    //       >
    //         {roleLabel[user.role] ?? user.role}
    //       </span>
    //     </div>
    //   </NavLink>
    // )}

    // {/* Logout */}
    // <button
    //   onClick={handleLogout}
    //   className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xl text-slate-500 transition hover:bg-red-50 hover:text-red-500"
    // >
    //   <LogOut size={30} className="text-slate-400" />
    //   <span className="font-medium">Đăng xuất</span>
    // </button>
    //   </div>
    // </aside>
  );
}
