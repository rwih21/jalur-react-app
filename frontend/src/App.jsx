import React, { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Loader2 } from "lucide-react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AppShell from "./components/layout/AppShell";
import LandingPage from "./pages/LandingPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import ResultsPage from "./pages/ResultsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CareerDNAPage from "./pages/CareerDNAPage";
import CareerMatcherPage from "./pages/CareerMatcherPage";
import RoadmapPage from "./pages/RoadmapPage";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import NetworkPage from "./pages/NetworkPage";
import CopilotPage from "./pages/CopilotPage";
import VideoInterviewPage from "./pages/VideoInterviewPage";
import ProfilePage from "./pages/ProfilePage";

function LoadingScreen() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <Loader2 className="size-6 animate-spin text-primary" />
        <span className="text-sm font-medium">Loading...</span>
      </div>
    </div>
  );
}

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingScreen />;
  if (!user) {
    return <Navigate to="/login" state={{ returnTo: location.pathname }} replace />;
  }
  return children;
}

function GuestOnly({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (user) return <Navigate to="/app" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestOnly>
            <LandingPage />
          </GuestOnly>
        }
      />
      <Route path="/assessment" element={<QuestionnairePage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route
        path="/login"
        element={
          <GuestOnly>
            <LoginPage />
          </GuestOnly>
        }
      />
      <Route
        path="/register"
        element={
          <GuestOnly>
            <RegisterPage />
          </GuestOnly>
        }
      />

      <Route
        path="/app"
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="dna" element={<CareerDNAPage />} />
        <Route path="careers" element={<CareerMatcherPage />} />
        <Route path="roadmap" element={<RoadmapPage />} />
        <Route path="jobs" element={<OpportunitiesPage />} />
        <Route path="network" element={<NetworkPage />} />
        <Route path="copilot" element={<CopilotPage />} />
        <Route path="interview" element={<VideoInterviewPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}