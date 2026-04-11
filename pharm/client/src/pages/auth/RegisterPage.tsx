import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center w-full mt-20">
      <div className="mb-5 mt-20 flex justify-center">
        <h1 className="text-2xl font-bold">Đăng kí tài khoản</h1>
      </div>
      <div className="w-1/2">
        <Link to="/login">
          <ArrowLeft className="ms-8 mb-4 cursor-pointer" />
        </Link>
      </div>

      <div className="flex flex-col items-center w-full">
        <div className="w-80 flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Họ và tên</label>
            <input
              type="text"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Mật khẩu</label>
            <input
              type="password"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Button */}
          <button className="mt-4 bg-red-500 hover:bg-red-600 transition text-white py-2 rounded font-semibold">
            Đăng kí
          </button>
        </div>
      </div>
    </div>
  );
}
