import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ROUTES } from "../../constants/routes";
import { ROLES } from "../../constants/role";
import type { RootState } from "../../app/store";
import { logout } from "../../features/auth/authSlice";
import logo from "../../assets/images/logo.webp";

import {
  LayoutDashboard,
  Pill,
  History,
  Boxes,
  FileBarChart2,
  LogOut,
  PackagePlus,
  PackageMinus,
  FileClock,
} from "lucide-react";

const menu = [
  {
    name: "Tổng quan",
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    roles: [ROLES.STOREKEEPER, ROLES.MANAGER],
  },
  {
    name: "Danh sách thuốc",
    path: ROUTES.MEDICINE,
    icon: Pill,
    roles: [ROLES.REQUESTER, ROLES.MANAGER],
  },
  {
    name: "Yêu cầu lấy thuốc",
    path: ROUTES.MEDICINE_REQUEST,
    icon: FileClock,
    roles: [ROLES.REQUESTER],
  },
  {
    name: "Kho thuốc",
    path: ROUTES.INVENTORY,
    icon: Boxes,
    roles: [ROLES.STOREKEEPER, ROLES.MANAGER],
  },
  {
    name: "Lịch sử kho",
    path: ROUTES.STOCK_HISTORY,
    icon: History,
    roles: [ROLES.STOREKEEPER, ROLES.MANAGER],
  },
  {
    name: "Yêu cầu xuất kho",
    path: ROUTES.STOCK_EXPORT,
    icon: PackageMinus,
    roles: [ROLES.STOREKEEPER],
  },
  {
    name: "Thông báo nhập kho",
    path: ROUTES.STOCK_IMPORT,
    icon: PackagePlus,
    roles: [ROLES.STOREKEEPER],
  },
  {
    name: "Kiểm kê",
    path: ROUTES.AUDIT,
    icon: FileBarChart2,
    roles: [ROLES.MANAGER],
  },
];

const roleLabel: Record<string, string> = {
  requestor: "Người yêu cầu",
  MANAGER: "Quản lý kho",
  STOREKEEPER: "Thủ kho",
};
const roleColor: Record<string, string> = {
  requestor: "bg-blue-50 text-blue-600",
  MANAGER: "bg-violet-50 text-violet-600",
  STOREKEEPER: "bg-emerald-50 text-emerald-600",
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
    <aside className="flex h-full w-70 flex-col bg-white border-r border-slate-100">
      <div className="flex gap-2 px-1 py-2 h-25">
        <Link
          to={
            user?.role === ROLES.REQUESTER ? ROUTES.MEDICINE : ROUTES.DASHBOARD
          }
          className="h-full"
        >
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
  );
}
