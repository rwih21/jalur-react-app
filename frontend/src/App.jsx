import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AppShell from "./components/layout/AppShell";
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

function AppContent() {
  const { user, loading } = useAuth();
  const [page, setPage] = useState("home");
  const [authPage, setAuthPage] = useState("login");

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-lg font-semibold text-slate-400">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return authPage === "login" ? (
      <LoginPage onSwitch={() => setAuthPage("register")} />
    ) : (
      <RegisterPage onSwitch={() => setAuthPage("login")} />
    );
  }

  const pages = {
    home: <DashboardPage go={setPage} />,
    dna: <CareerDNAPage />,
    careers: <CareerMatcherPage />,
    roadmap: <RoadmapPage go={setPage} />,
    jobs: <OpportunitiesPage go={setPage} />,
    network: <NetworkPage />,
    copilot: <CopilotPage go={setPage} />,
    interview: <VideoInterviewPage />,
    profile: <ProfilePage />,
  };

  return (
    <AppShell page={page} setPage={setPage}>
      {pages[page]}
    </AppShell>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}