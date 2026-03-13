import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import SignupPage from "./pages/SignupPage.jsx";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import NewsletterPage from "./pages/NewsLetterPage.jsx";
import QuizzesPage from "./pages/QuizzesPage.jsx";
import SolveQuiz from "./pages/SolveQuiz.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import NewsletterReadPage from "./pages/NewsletterReadPage.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import EventTimelinePage from "./pages/EventTimelinePage.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />


      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/quiz" element={<QuizzesPage />} />
          <Route path="/quiz/:id" element={<SolveQuiz />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/newsletter/:id" element={<NewsletterReadPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/timelines" element={<EventTimelinePage />} />

        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
