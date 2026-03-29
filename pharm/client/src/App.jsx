import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import AuthLayout from "./modules/auth/AuthLayout";
import Login from "./modules/auth/LoginForm";
import Register from "./modules/auth/RegisterForm";

import MainLayout from "./modules/MainLayout";
import Dashboard from "./modules/pages/DashBoard";
import ExportFIFO from "./modules/pages/ExportFIFO";
import Expiry from "./modules/pages/Expiry";
import Storage from "./modules/pages/Storage";
import History from "./modules/pages/History";
import Inventory from "./modules/pages/Inventory";
import StockControl from "./modules/pages/StockControl";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* PRIVATE */}
        <Route
          path="/"
          element={
            // <PrivateRoute>
            <MainLayout />
            /* </PrivateRoute> */
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="export" element={<ExportFIFO />} />
          <Route path="expiry" element={<Expiry />} />
          <Route path="storage" element={<Storage />} />
          <Route path="history" element={<History />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="stock" element={<StockControl />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
}

{
  /* <BrowserRouter>
      <Routes>
        <Route index element={<DashBoard />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter> */
}
