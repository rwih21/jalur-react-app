import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Compass, Dna, Loader2, RefreshCw, Sparkles, TrendingUp } from "lucide-react";
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

export default function CareerDNAPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    setError("");
    api
      .get("/assessment/result")
      .then(setResult)
      .catch(() =>
        setError("Gagal memuat hasil assessment. Pastikan server aktif."),
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-muted-foreground">
        <Loader2 className="size-6 animate-spin text-primary" />
        <span className="text-sm font-medium">Loading your Career DNA...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader className="items-center text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-destructive/10">
            <RefreshCw className="size-6 text-destructive" />
          </div>
          <CardTitle className="text-xl">Gagal memuat hasil</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={load} className="w-full gap-2">
            <RefreshCw className="size-4" />
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!result?.career_dna) {
    return (
      <Card className="mx-auto max-w-md overflow-hidden">
        <div className="h-3 bg-linear-to-r from-primary to-peach" />
        <CardHeader className="items-center text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
            <Dna className="size-6 text-primary" />
          </div>
          <CardTitle className="text-xl">Belum ada Career DNA</CardTitle>
          <CardDescription>
            Ikuti assessment singkat untuk tahu karier yang cocok dengan caramu
            berpikir dan bekerja.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Button variant="brand" onClick={() => navigate("/assessment")} className="gap-2">
            <Sparkles className="size-4" />
            Take the assessment
          </Button>
        </CardContent>
      </Card>
    );
  }

  const dna = result.career_dna;
  const traits = result.traits
    ? Object.entries(result.traits)
        .map(([key, value]) => ({ key, value }))
        .sort((a, b) => b.value - a.value)
    : [];
  const drivers = result.drivers || [];

  return (
    <>
      <Card className="overflow-hidden">
        <div className="h-3 bg-linear-to-r from-primary to-peach" />
        <CardHeader>
          <Badge className="w-fit gap-1 border-transparent bg-primary/15 text-primary-dark">
            <TrendingUp className="size-3.5" />
            Career DNA Result
          </Badge>
          <CardTitle className="text-3xl font-bold tracking-tight">
            {dna.name}
          </CardTitle>
          <CardDescription className="text-base">{dna.tagline}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-muted-foreground">{dna.description}</p>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
              {traits.slice(0, 6).map((t) => (
                <div key={t.key} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t.key}</span>
                    <span className="font-semibold">{t.value}%</span>
                  </div>
                  <Progress value={t.value} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start justify-center rounded-xl bg-muted/60 p-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Overall career fit
            </span>
            <div className="mt-1 bg-linear-to-r from-primary to-peach bg-clip-text text-5xl font-bold tracking-tight text-transparent">
              {result.career_score}
              <span className="ml-1 text-lg font-normal text-muted-foreground">/ 100</span>
            </div>
            <Button
              variant="brand"
              onClick={() => navigate("/app/careers")}
              className="mt-5 w-full gap-2"
            >
              <Compass className="size-4" />
              Find your careers
            </Button>
          </div>
        </CardContent>
      </Card>

      {drivers.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold tracking-tight">
              Kenapa DNA ini cocok untukmu
            </CardTitle>
            <CardDescription>
              Faktor yang paling berpengaruh dalam mencocokkan profilmu.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {drivers.map((driver, i) => (
              <div key={driver.key} className="flex items-start gap-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary-dark">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold">{driver.label}</span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {driver.share}%
                    </span>
                  </div>
                  <Progress
                    value={driver.share}
                    className="mt-1.5 bg-primary/10"
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {driver.note}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="mt-8 flex justify-center">
        <Button variant="outline" onClick={() => navigate("/app/roadmap")} className="gap-2">
          Jump to your roadmap
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </>
  );
}