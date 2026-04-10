// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Pill,
//   History,
//   Boxes,
//   ClipboardList,
//   FileBarChart2,
//   LogOut,
// } from "lucide-react";

// export default function Sidebar() {
//   return (
//     <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
//       {/* Logo */}
//       <div className="h-16 flex items-center px-6 border-b border-slate-200">
//         <h1 className="text-xl font-bold text-slate-800">MediStock</h1>
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 p-4 space-y-2">
//         <NavLink
//           to="/dashboard"
//           className={({ isActive }) =>
//             `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
//               isActive
//                 ? "bg-slate-900 text-white"
//                 : "text-slate-600 hover:bg-slate-100"
//             }`
//           }
//         >
//           <LayoutDashboard size={20} />
//           <span>Dashboard</span>
//         </NavLink>

//         <NavLink
//           to="/take-medicine"
//           className={({ isActive }) =>
//             `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
//               isActive
//                 ? "bg-slate-900 text-white"
//                 : "text-slate-600 hover:bg-slate-100"
//             }`
//           }
//         >
//           <Pill size={20} />
//           <span>Lấy thuốc</span>
//         </NavLink>

//         <NavLink
//           to="/medicine-history"
//           className={({ isActive }) =>
//             `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
//               isActive
//                 ? "bg-slate-900 text-white"
//                 : "text-slate-600 hover:bg-slate-100"
//             }`
//           }
//         >
//           <History size={20} />
//           <span>Lịch sử</span>
//         </NavLink>

//         <NavLink
//           to="/inventory"
//           className={({ isActive }) =>
//             `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
//               isActive
//                 ? "bg-slate-900 text-white"
//                 : "text-slate-600 hover:bg-slate-100"
//             }`
//           }
//         >
//           <Boxes size={20} />
//           <span>Kho thuốc</span>
//         </NavLink>

//         <NavLink
//           to="/export-request"
//           className={({ isActive }) =>
//             `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
//               isActive
//                 ? "bg-slate-900 text-white"
//                 : "text-slate-600 hover:bg-slate-100"
//             }`
//           }
//         >
//           <ClipboardList size={20} />
//           <span>Yêu cầu xuất kho</span>
//         </NavLink>

//         <NavLink
//           to="/report"
//           className={({ isActive }) =>
//             `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
//               isActive
//                 ? "bg-slate-900 text-white"
//                 : "text-slate-600 hover:bg-slate-100"
//             }`
//           }
//         >
//           <FileBarChart2 size={20} />
//           <span>Báo cáo</span>
//         </NavLink>
//       </nav>

//       {/* Footer */}
//       <div className="border-t border-slate-200 p-4">
//         <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-500 hover:bg-red-50">
//           <LogOut size={20} />
//           <span>Đăng xuất</span>
//         </button>
//       </div>
//     </aside>
//   );
// }

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
} from "lucide-react";

import logo from "../assets/images/logo.webp";

const menu = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["requestor", "warehouse_manager", "storekeeper"],
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
    name: "Kho thuốc",
    path: "/inventory",
    icon: Boxes,
    roles: ["warehouse_manager"],
  },
  {
    name: "Báo cáo",
    path: "/report",
    icon: FileBarChart2,
    roles: ["warehouse_manager"],
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
    name: "Cập nhật kho",
    path: "/inventory-update",
    roles: ["storekeeper"],
    icon: Boxes,
  },
  {
    name: "Lịch sử kho",
    path: "/stock-history",
    roles: ["storekeeper", "warehouse_manager"],
    icon: History,
  },
];

export default function Sidebar() {
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white shadow-sm">
      {/* Logo */}
      <div className="flex flex-col items-center justify-center border-b border-slate-200 px-4 py-6">
        <Link to="/dashboard">
          <img
            src={logo}
            alt="logo"
            className="mb-3 h-20 w-20 rounded-full object-cover"
          />
        </Link>

        <h1 className="text-xl font-bold text-blue-600">Pharma WMS</h1>

        <p className="mt-1 text-sm text-slate-500">Medicine Inventory</p>

        {user && (
          <div className="mt-4 text-center">
            <p className="font-medium text-slate-700">{user.name}</p>
            <p className="text-sm text-slate-500">{user.role}</p>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2 p-4">
        {menu
          .filter((item) => item.roles.includes(user?.role || ""))
          .map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                    isActive
                      ? "bg-blue-500 text-white shadow"
                      : "text-slate-700 hover:bg-blue-100 hover:text-blue-700"
                  }`
                }
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={20} />
          <span className="font-medium">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}
