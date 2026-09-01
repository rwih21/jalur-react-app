import React, { useState } from "react";
import AppShell from "./components/layout/AppShell";
import DashboardPage from "./pages/DashboardPage";
import CareerDNAPage from "./pages/CareerDNAPage";
import CareerMatcherPage from "./pages/CareerMatcherPage";
import RoadmapPage from "./pages/RoadmapPage";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import NetworkPage from "./pages/NetworkPage";
import CopilotPage from "./pages/CopilotPage";
import VideoInterviewPage from "./pages/VideoInterviewPage";
import ProfilePage from "./pages/ProfilePage";
export default function App() {
  const [page, setPage] = useState("home");
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
