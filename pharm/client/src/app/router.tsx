import { Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../layouts/ProtectedRoute";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";

import DashboardPage from "../pages/common/skpmng/DashBoardPage";
import ProfilePage from "../pages/common/ProfilePage";

import TakeRequestPage from "../pages/pharmacist/TakeRequestPage";
// import ReturnMedicinePage from "../pages/pharmacist/ReturnRequestPage";
import RequestHistoryPage from "../pages/pharmacist/RequestHistoryPage";
import MedicinePage from "../pages/common/rqtmng/MedicinePage";

import InventoryPage from "../pages/common/skpmng/InventoryPage";
import StockHistoryPage from "../pages/common/skpmng/StockHistoryPage";
import WarehouseMapPage from "../pages/common/skpmng/WarehouseMapPage";

import AuditPage from "../pages/warehouse-manager/AuditPage";
import CreateAuditSessionPage from "../pages/warehouse-manager/CreateAuditSessionPage";

import ExportPage from "../pages/storekeeper/ExportPage";
import ImportPage from "../pages/storekeeper/ImportPage";

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
          <Route path="/profile" element={<ProfilePage />} />

          <Route
            element={
              <ProtectedRoute allowedRoles={["storekeeper", "manager"]} />
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/inventory/map" element={<WarehouseMapPage />} />
            <Route path="/stock-history" element={<StockHistoryPage />} />
          </Route>

          <Route
            element={<ProtectedRoute allowedRoles={["requestor", "manager"]} />}
          >
            <Route path="/medicine" element={<MedicinePage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["requestor"]} />}>
            <Route path="/medicine-request" element={<RequestHistoryPage />} />
            <Route
              path="/medicine-request/create"
              element={<TakeRequestPage />}
            />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>
            <Route path="/audit" element={<AuditPage />} />
            <Route path="/audit/create" element={<CreateAuditSessionPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["storekeeper"]} />}>
            <Route path="/stock-export" element={<ExportPage />} />
            <Route path="/stock-import" element={<ImportPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
