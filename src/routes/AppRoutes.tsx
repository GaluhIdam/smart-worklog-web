import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Layout from "../layouts/Layout";
import LoginPage from "../pages/public/login/LoginPage";
import DashboardPage from "../pages/private/DashboardPage";
import CasesPage from "../pages/private/cases/CasesPage";
// import ActivitiesPage from "../pages/private/ActivityPage";
// import AttendancePage from "../pages/private/Attendance";
// import LeavePage from "../pages/private/LeavePage";

function RequireAuth() {
  const location = useLocation();
  const { authenticated, loading } = useAuth();
  if (loading) {
    return null;
  }
  if (!authenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}

function PublicRoutes() {
  const { authenticated, loading } = useAuth();
  if (loading) {
    return null;
  }
  if (authenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/cases" element={<CasesPage />} />
          {/* <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/leave" element={<LeavePage />} /> */}
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
