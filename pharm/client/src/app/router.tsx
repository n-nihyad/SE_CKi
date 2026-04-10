import { Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../layouts/ProtectedRoute";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";

import DashboardPage from "../pages/common/DashBoardPage";

import TakeMedicinePage from "../pages/pharmacist/TakeMedicinePage";
import ReturnMedicinePage from "../pages/pharmacist/ReturnMedicinePage";
import MedicineHistoryPage from "../pages/pharmacist/MedicineHistoryPage";

import InventoryPage from "../pages/warehouse-manager/InventoryPage";
import ReportPage from "../pages/warehouse-manager/ReportPage";

import ExportPage from "../pages/storekeeper/ExportPage";
import ImportPage from "../pages/storekeeper/ImportPage";
import UpdateInventoryPage from "../pages/storekeeper/UpdateInventoryPage";
import StockHistoryPage from "../pages/common/StockHistoryPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* Auth layout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route element={<ProtectedRoute allowedRoles={["requestor"]} />}>
            <Route path="/take-medicine" element={<TakeMedicinePage />} />
            <Route path="/return-medicine" element={<ReturnMedicinePage />} />
            <Route path="/medicine-history" element={<MedicineHistoryPage />} />
          </Route>

          <Route
            element={
              <ProtectedRoute
                allowedRoles={["storekeeper", "warehouse_manager"]}
              />
            }
          >
            <Route path="/stock-history" element={<StockHistoryPage />} />
          </Route>

          <Route
            element={<ProtectedRoute allowedRoles={["warehouse_manager"]} />}
          >
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/report" element={<ReportPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["storekeeper"]} />}>
            <Route path="/export" element={<ExportPage />} />
            <Route path="/import" element={<ImportPage />} />
            <Route path="/inventory-update" element={<UpdateInventoryPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
