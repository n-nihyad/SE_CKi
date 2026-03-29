import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-15 bg-white flex justify-between items-center px-5 border-b border-gray-300">
      {/* Left */}
      <div className="font-bold text-lg">Warehouse System</div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span className="text-lg cursor-pointer hover:scale-110 transition">
          🔔
        </span>

        <div className="font-semibold">Admin</div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
