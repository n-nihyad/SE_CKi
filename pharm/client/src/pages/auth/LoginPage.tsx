import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login, fakeUsers } from "../../features/auth/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername) {
      setError("Vui lòng nhập tài khoản");
      return;
    }
    if (!trimmedPassword) {
      setError("Vui lòng nhập mật khẩu");
      return;
    }

    const user = fakeUsers.find(
      (u) => u.username === trimmedUsername && u.password === trimmedPassword,
    );

    if (!user) {
      setError("Sai tài khoản hoặc mật khẩu");
      return;
    }

    dispatch(
      login({
        id: user.id,
        name: user.name,
        role: user.role,
      }),
    );

    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center w-full mt-20">
      <h1 className="text-3xl font-bold mb-10">Đăng nhập</h1>

      <div className="w-80 flex flex-col gap-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="w-80 flex flex-col gap-3"
        >
          <input
            type="text"
            placeholder="Nhập username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            className="rounded-lg border border-slate-300 px-4 py-2"
          />

          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="rounded-lg border border-slate-300 px-4 py-2"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="rounded-lg bg-red-500 py-2 font-semibold text-white transition hover:bg-red-600"
          >
            Đăng nhập
          </button>
        </form>

        <p className="text-center">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-teal-700">
            Tạo tài khoản
          </Link>
        </p>
      </div>
    </div>
  );
}
