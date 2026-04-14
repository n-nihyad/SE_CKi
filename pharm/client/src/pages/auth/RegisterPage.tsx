import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { register as registerApi } from "../../api/authApi";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    try {
      await registerApi({
        name,
        email,
        password,
      });

      alert("Đăng ký thành công");
      navigate("/login");
    } catch (err: unknown) {
      console.log(err);

      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Đăng ký thất bại");
      } else {
        setError("Lỗi không xác định");
      }
    }
  };
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
        <div className="w-80 flex flex-col gap-3">
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Họ và tên</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Mật khẩu</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Button */}
          <button
            onClick={handleRegister}
            className="bg-red-500 hover:bg-red-600 transition text-white py-2 rounded font-semibold"
          >
            Đăng kí
          </button>
        </div>
      </div>
    </div>
  );
}
