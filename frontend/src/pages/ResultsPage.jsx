import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Dna,
  LayoutDashboard,
  Loader2,
  Lock,
  RefreshCw,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import api from "../services/api";
import { cn } from "@/lib/utils";
import { useAuth } from "../context/AuthContext";
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

const ANSWERS_KEY = "jalur_assessment_answers";
const RESULT_KEY = "jalur_assessment_result";

const traitLabels = {
  analytical: "Analytical Thinking",
  leadership: "Leadership",
  communication: "Communication",
  commercial: "Commercial Orientation",
  technical: "Technical",
  creative: "Creativity",
  execution: "Execution",
};

function loadJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

export default function ResultsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [result, setResult] = useState(() => loadJson(RESULT_KEY));
  const [answers] = useState(() => loadJson(ANSWERS_KEY));
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    let mounted = true;
    const shouldUnlock = user && result && result.persisted === false && answers;
    if (!shouldUnlock) return;

    setUnlocking(true);
    api
      .post("/assessment/score", { answers })
      .then((fresh) => {
        if (!mounted) return;
        setResult(fresh);
        localStorage.setItem(RESULT_KEY, JSON.stringify(fresh));
      })
      .catch(() => {})
      .finally(() => mounted && setUnlocking(false));

    return () => {
      mounted = false;
    };
  }, [user, result, answers]);

  const retake = () => {
    localStorage.removeItem(RESULT_KEY);
    localStorage.removeItem(ANSWERS_KEY);
    navigate("/assessment");
  };

  if (!result) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background px-4">
        <Card className="max-w-md text-center">
          <CardHeader className="items-center">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <Dna className="size-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Belum ada hasil</CardTitle>
            <CardDescription>
              Selesaikan assessment Career DNA-mu dulu untuk melihat karier yang
              cocok.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/assessment")} className="gap-2">
              Start the assessment
              <ArrowRight className="size-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const dna = result.career_dna;
  const traits = result.traits
    ? Object.entries(result.traits)
        .map(([key, value]) => ({ key, value }))
        .sort((a, b) => b.value - a.value)
    : [];
  const hasLocked = result.careers?.some((c) => c.locked);

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="flex items-center gap-2"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Dna className="size-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-primary">
              JALUR
            </span>
          </a>
          <Button variant="ghost" onClick={retake}>
            <RefreshCw className="size-4" />
            Retake
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-10 md:py-14">
        {unlocking && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border bg-primary/5 px-4 py-3 text-sm font-medium text-primary">
            <Loader2 className="size-4 animate-spin" />
            Unlocking your full career matches...
          </div>
        )}

        {dna && (
          <Card className="overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-primary via-primary/60 to-primary/20" />
            <CardHeader>
              <Badge className="w-fit gap-1 border-transparent bg-primary/10 text-primary">
                <TrendingUp className="size-3.5" />
                Career DNA Result
              </Badge>
              <CardTitle className="text-3xl font-bold tracking-tight">
                {dna.name}
              </CardTitle>
              <CardDescription className="text-base">
                {dna.tagline}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8 md:grid-cols-[1.3fr_1fr]">
              <div>
                <p className="text-muted-foreground">{dna.description}</p>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
                  {traits.slice(0, 6).map((t) => (
                    <div key={t.key} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {traitLabels[t.key] || t.key}
                        </span>
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
                <div className="mt-1 text-5xl font-bold tracking-tight text-primary">
                  {result.career_score}
                  <span className="ml-1 text-lg text-muted-foreground">/ 100</span>
                </div>
                {!user ? (
                  <Button
                    onClick={() => navigate("/login", { state: { returnTo: "/results" } })}
                    className="mt-5 w-full gap-2"
                  >
                    <Dna className="size-4" />
                    Sign in to save your DNA
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => navigate("/app")}
                    className="mt-5 w-full gap-2"
                  >
                    <LayoutDashboard className="size-4" />
                    Open my dashboard
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-12">
          <h2 className="text-xl font-bold tracking-tight">
            Karier yang cocok untukmu
          </h2>
          <p className="mt-1 text-muted-foreground">
            {user
              ? "Semua kecocokan sudah terbuka. Akunmu sudah menyimpan profil career DNA ini."
              : hasLocked
                ? "Berikut 3 kecocokan terbaikmu. Masuk untuk membuka sisanya."
                : "Berdasarkan jawabanmu, ini kecocokan terbaikmu."}
          </p>

          {result.careers?.length ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {result.careers.map((c) => (
                <div key={c.id} className="relative">
                  <Card
                    className={cn(
                      "h-full",
                      c.locked && "select-none blur-[6px]",
                    )}
                    aria-hidden={c.locked}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3">
                        <CardTitle className="text-lg">{c.name}</CardTitle>
                        <Badge className="border-transparent bg-primary/10 text-primary">
                          {c.match_percentage}%
                        </Badge>
                      </div>
                      <CardDescription>{c.salary_range}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        {c.skills}
                      </span>
                      <Badge variant="secondary" className="w-fit">
                        {c.category}
                      </Badge>
                    </CardContent>
                  </Card>
                  {c.locked && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background/40 text-center">
                      <div className="flex size-11 items-center justify-center rounded-full border bg-background shadow-sm">
                        <Lock className="size-5 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">
                          {c.match_percentage}% match — terkunci
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Masuk untuk melihat detail karier ini.
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => navigate("/login", { state: { returnTo: "/results" } })}
                        className="gap-1.5"
                      >
                        Login to unlock
                        <Sparkles className="size-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <Card className="mt-6">
              <CardHeader className="items-center">
                <CardDescription>
                  Belum ada karier yang bisa ditampilkan. Coba jalankan assessment ulang.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" onClick={retake} className="gap-2">
                  <RefreshCw className="size-4" />
                  Rerun the assessment
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="mt-10 text-center">
            <Button variant="outline" onClick={retake} className="gap-2">
              <RefreshCw className="size-4" />
              Rerun the assessment
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}