import React from "react";
import { Video, Users } from "lucide-react";
import { Header, Card, Progress, Button } from "../components/ui";
export default function DashboardPage({ go }) {
  return (
    <>
      <Header
        title="Good morning, Jeremia 👋"
        sub="Ini posisi kamu sekarang dalam perjalanan kariermu."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="p-6">
          <p className="text-xs font-black text-slate-400">CAREER READINESS</p>
          <div className="text-5xl font-black">21 / 100</div>
          <Progress value={21} />
        </Card>
        <Card className="bg-slate-950 p-6 text-white">
          <Video className="text-violet-400" />
          <p className="mt-6 text-xs font-black text-violet-400">
            INTERVIEW READINESS
          </p>
          <div className="text-4xl font-black">84 / 100</div>
          <p className="text-sm text-slate-400">Weakest area: Behavioral</p>
          <Button onClick={() => go("interview")} className="mt-5">
            Practice Interview
          </Button>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-black">Investment Banking</h2>
          <p className="font-black text-violet-600">94% Career Fit</p>
        </Card>
        <Card className="p-6">
          <Users />
          <h2 className="mt-4 text-xl font-black">
            3 people to meet this week
          </h2>
          <Button onClick={() => go("network")} secondary className="mt-4">
            View Network
          </Button>
        </Card>
      </div>
    </>
  );
}
