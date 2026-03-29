import { Link, useLocation } from "react-router-dom";
import tobi from "../auth/images/tobi.jpg";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Cảnh báo hạn dùng", path: "/expiry" },
    { name: "Xuất thuốc", path: "/export" },
    { name: "Nhập kho", path: "/storage" },
    { name: "Lịch sử giao dịch", path: "/history" },
    { name: "Kiểm kê", path: "/inventory" },
    { name: "Tồn kho", path: "/stock" },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r shadow-sm flex flex-col">
      <div className="flex-1 flex items-center justify-center border-b flex-col">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Pharma WMS
        </Link>
        <img src={tobi} className="h-25"></img>
      </div>

      {/* Menu */}
      <ul className="flex-5 p-4 space-y-2">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-4 py-2 rounded-lg transition
                  ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-blue-100"
                  }
                `}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
