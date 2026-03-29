import { Link } from "react-router";

export default function LoginForm() {
  return (
    <div className="flex flex-col items-center w-full mt-20">
      <h1 className="text-2xl font-bold mb-10">Login</h1>

      <div className="w-80 flex flex-col gap-4">
        <input placeholder="Username" className="input" />
        <input type="password" placeholder="Password" className="input" />

        <button className="mt-4 bg-red-500 hover:bg-red-600 transition text-white py-2 rounded font-semibold">
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
