import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Video, Users, ArrowRight, TrendingUp, Target } from "lucide-react";
import api from "../services/api";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from "../components/ui";

export default function DashboardPage() {
  const navigate = useNavigate();
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
      <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Good morning, {firstName} 👋
          </h1>
          <p className="mt-1 text-muted-foreground">
            Ini posisi kamu sekarang dalam perjalanan kariermu.
          </p>
        </div>
      </header>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Career Readiness
            </CardTitle>
            <CardDescription className="text-4xl font-semibold">
              <span className="bg-linear-to-r from-primary to-peach bg-clip-text text-transparent">
                {data.career_readiness}
              </span>
              <span className="ml-1 text-base font-normal text-muted-foreground">
                / 100
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto flex flex-col gap-4">
            <Progress value={data.career_readiness} />
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <TrendingUp className="size-4 text-primary" />
              {data.career_readiness >= 70
                ? "Great momentum — keep it up!"
                : data.career_readiness >= 40
                  ? "Solid progress — keep building."
                  : "Let's get you moving forward."}
            </p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-ink text-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <Video className="size-4" />
              Interview Readiness
            </CardTitle>
            <CardDescription className="text-4xl font-semibold">
              <span className="bg-linear-to-r from-primary to-peach bg-clip-text text-transparent">
                {data.interview_readiness}
              </span>
              <span className="ml-1 text-base font-normal text-background/60">
                / 100
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto flex flex-col gap-4">
            <Badge
              variant="secondary"
              className="w-fit bg-white/10 text-background/90 hover:bg-white/10"
            >
              Weakest area: Behavioral
            </Badge>
            <Button
              variant="brand"
              onClick={() => navigate("/app/interview")}
              className="w-fit"
            >
              Practice Interview
              <ArrowRight className="size-4" />
            </Button>
          </CardContent>
        </Card>

        {data.top_career && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Target className="size-4" />
                Top Career
              </CardTitle>
              <CardDescription className="pt-1 text-xl font-semibold text-foreground">
                {data.top_career.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto flex flex-col gap-4">
              <Progress value={data.top_career.match} className="bg-primary/15" />
              <p className="text-sm font-semibold text-primary-dark">
                {data.top_career.match}% Career Fit
              </p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Users className="size-4" />
              Network
            </CardTitle>
            <CardDescription className="pt-1 text-xl font-semibold text-foreground">
              {data.network_count} people in your network this week
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Button
              variant="outline"
              onClick={() => navigate("/app/network")}
              className="text-foreground"
            >
              View Network
              <ArrowRight className="size-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}