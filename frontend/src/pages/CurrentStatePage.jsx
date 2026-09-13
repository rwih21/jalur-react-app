import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2, Sparkles, TriangleAlert } from "lucide-react";
import api from "../services/api";
import { cn } from "@/lib/utils";
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

const CAREER_KEY = "jalur_career";
const CURRENT_STATE_KEY = "jalur_current_state";
const PLAN_KEY = "jalur_plan";

const LEVELS = [
  { value: 1, label: "Belum" },
  { value: 2, label: "Dasar" },
  { value: 3, label: "Menengah" },
  { value: 4, label: "Mahir" },
  { value: 5, label: "Expert" },
];

function loadJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

export default function CurrentStatePage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const careerId = params.get("career");

  const [career, setCareer] = useState(null);
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [state, setState] = useState(() => loadJson(CURRENT_STATE_KEY) || {});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!careerId) {
      setError("Pilih karier dulu sebelum melanjutkan.");
      setLoading(false);
      return;
    }

    api
      .get(`/careers/${careerId}`)
      .then((data) => {
        if (!data.requirements.length) {
          setError(
            "Profil karier ini belum tersedia untuk rencana aksi. Pilih karier lain dulu ya.",
          );
          setLoading(false);
          return;
        }
        setCareer(data.career);
        setRequirements(data.requirements);
        setLoading(false);
      })
      .catch(() => {
        setError("Profil karier gagal dimuat. Pastikan koneksi dan server aktif.");
        setLoading(false);
      });
  }, [careerId]);

  const answeredCount = requirements.filter((r) => state[r.key]).length;
  const progress = requirements.length ? Math.round((answeredCount / requirements.length) * 100) : 0;
  const allAnswered = requirements.length > 0 && answeredCount === requirements.length;

  const choose = (key, level) => {
    setState((prev) => ({ ...prev, [key]: level }));
  };

  const finish = async () => {
    if (!allAnswered) return;
    setSubmitting(true);
    try {
      const result = await api.post("/assessment/current-state", {
        career_id: Number(careerId),
        current_state: state,
      });
      localStorage.setItem(CAREER_KEY, JSON.stringify(result.career));
      localStorage.setItem(CURRENT_STATE_KEY, JSON.stringify(state));
      localStorage.setItem(PLAN_KEY, JSON.stringify(result));
      navigate("/plan");
    } catch {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="size-6 animate-spin text-primary" />
          <span className="text-sm font-medium">Loading career profile...</span>
        </div>
      </div>
    );
  }

  if (error || !career) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background px-4">
        <Card className="max-w-md text-center">
          <CardHeader className="items-center">
            <div className="flex size-12 items-center justify-center rounded-xl bg-destructive/10">
              <TriangleAlert className="size-6 text-destructive" />
            </div>
            <CardTitle className="text-xl">Gagal memuat karier</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button onClick={() => navigate("/careers")} className="gap-2">
              <ArrowLeft className="size-4" />
              Pilih karier lain
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b">
        <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-4">
          <Link to="/careers" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-primary">JALUR</span>
          </Link>
          <span className="text-sm font-medium text-muted-foreground">{progress}% selesai</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <div className="mb-6 flex items-center gap-4">
          <Progress value={progress} className="flex-1" />
          <span className="shrink-0 text-sm font-medium text-muted-foreground">
            {answeredCount} / {requirements.length}
          </span>
        </div>

        <div className="mb-8">
          <Badge variant="secondary" className="w-fit">
            {career.category}
          </Badge>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-balance md:text-3xl">
            Di mana kamu sekarang menuju {career.name}?
          </h1>
          <p className="mt-2 text-muted-foreground">
            Nilai 1–5 sejujurnya untuk setiap bidang. Makin jujur, makin akurat
            kesenjangan dan langkah yang kami buatkan untukmu.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {LEVELS.map((l) => (
              <span key={l.value} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                {l.value} = {l.label}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {requirements.map((r) => {
            const selected = state[r.key];
            return (
              <Card key={r.key} className="gap-0">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-base">{r.label}</CardTitle>
                    <Badge
                      variant={r.importance === "high" ? "secondary" : "outline"}
                      className="shrink-0 text-xs"
                    >
                      Target {r.target_level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-1.5">
                    {LEVELS.map((l) => (
                      <button
                        key={l.value}
                        onClick={() => choose(r.key, l.value)}
                        className={cn(
                          "flex-1 rounded-lg border px-2 py-2 text-sm font-semibold transition-colors",
                          selected === l.value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "bg-card text-muted-foreground hover:border-primary/40 hover:bg-accent",
                        )}
                      >
                        {l.value}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-between gap-3">
          <Button variant="outline" onClick={() => navigate("/careers")} className="gap-2">
            <ArrowLeft className="size-4" />
            Ganti karier
          </Button>
          <Button onClick={finish} disabled={!allAnswered || submitting} className="gap-2">
            {submitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            Lihat rencana aksiku
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}