import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/Project";
import Layout from "./Layout";
import Productivity from "./pages/Productivity";
import Calculator from "./pages/Calculator";
import BillingPage from "./pages/Billing";
import ResourcesPage from "./pages/Resources";
import MasterDatabase from "./pages/MasterDatabase";
import Invoices from "./pages/Invoices";
import SettingsPage from "./pages/Settings";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />


      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
