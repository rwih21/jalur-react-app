import React, { useEffect, useState } from "react";
import { Video, Users } from "lucide-react";
import api from "../services/api";
import { Header, Card, Progress, Button } from "../components/ui";
export default function DashboardPage({ go }) {
  const [data, setData] = useState(null);
  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    api.get("/dashboard").then((d) => {
      setData(d);
      setFirstName(d.user.name?.split(" ")[0] || d.user.name || "");
    });
  }, []);
  if (!data) return null;
  return (
    <>
      <Header
        title={`Good morning, ${firstName} 👋`}
        sub="Ini posisi kamu sekarang dalam perjalanan kariermu."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="p-6">
          <p className="text-xs font-black text-slate-400">CAREER READINESS</p>
          <div className="text-5xl font-black">{data.career_readiness} / 100</div>
          <Progress value={data.career_readiness} />
        </Card>
        <Card className="bg-slate-950 p-6 text-white">
          <Video className="text-violet-400" />
          <p className="mt-6 text-xs font-black text-violet-400">
            INTERVIEW READINESS
          </p>
          <div className="text-4xl font-black">{data.interview_readiness} / 100</div>
          <p className="text-sm text-slate-400">Weakest area: Behavioral</p>
          <Button onClick={() => go("interview")} className="mt-5">
            Practice Interview
          </Button>
        </Card>
        {data.top_career && (
          <Card className="p-6">
            <h2 className="text-xl font-black">{data.top_career.name}</h2>
            <p className="font-black text-violet-600">{data.top_career.match}% Career Fit</p>
          </Card>
        )}
        <Card className="p-6">
          <Users />
          <h2 className="mt-4 text-xl font-black">
            {data.network_count} people in your network this week
          </h2>
          <Button onClick={() => go("network")} secondary className="mt-4">
            View Network
          </Button>
        </Card>
      </div>
    </>
  );
}
