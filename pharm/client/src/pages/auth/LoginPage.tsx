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
    const user = fakeUsers.find(
      (u) => u.username === username && u.password === password,
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
      <h1 className="text-2xl font-bold mb-10">Login</h1>

      <div className="w-80 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          onClick={handleLogin}
          className="mt-2 rounded-lg bg-red-500 py-2 font-semibold text-white transition hover:bg-red-600"
        >
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/register" className="text-teal-700">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
