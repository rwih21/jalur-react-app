import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Compass,
  LayoutDashboard,
  Loader2,
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
  Separator,
} from "../components/ui";

const PLAN_KEY = "jalur_plan";
const CURRENT_STATE_KEY = "jalur_current_state";

const BUCKET_LABELS = {
  this_week: "Minggu ini — dampak tertinggi",
  this_month: "Bulan ini",
  later: "Nanti",
};

function loadJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

function reqProgress(r) {
  return Math.min(100, Math.round((r.current / r.target_level) * 100));
}

export default function PlanPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [plan, setPlan] = useState(() => loadJson(PLAN_KEY));
  const [committing, setCommitting] = useState(false);

  useEffect(() => {
    if (!user || !plan || plan.persisted || committing) return;

    const currentState = loadJson(CURRENT_STATE_KEY) || {};
    setCommitting(true);
    api
      .post("/plan/commit", {
        career_id: plan.career.id,
        current_state: currentState,
      })
      .then((fresh) => {
        localStorage.setItem(PLAN_KEY, JSON.stringify(fresh));
        setPlan(fresh);
      })
      .catch(() => {})
      .finally(() => setCommitting(false));
  }, [user, plan, committing]);

  useEffect(() => {
    if (plan || !user) return;
    api
      .get("/plan")
      .then((d) => {
        if (d.plan) {
          localStorage.setItem(PLAN_KEY, JSON.stringify(d.plan));
          setPlan(d.plan);
        }
      })
      .catch(() => {});
  }, [user]);

  if (!plan) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background px-4">
        <Card className="max-w-md text-center">
          <CardHeader className="items-center">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <Compass className="size-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Belum ada rencana karier</CardTitle>
            <CardDescription>
              Pilih karier dan isi penilaian posisimu dulu untuk melihat gap dan
              langkah berikutnya.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button variant="brand" onClick={() => navigate("/start")} className="gap-2">
              Mulai sekarang
              <ArrowRight className="size-4" />
            </Button>
            <Button variant="outline" onClick={() => navigate("/careers")}>
              Pilih karier
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const criticalGaps = plan.gaps.filter((g) => g.severity === "critical");
  const openGaps = plan.gaps.filter((g) => g.severity === "open");

  const buckets = ["this_week", "this_month", "later"].map((key) => ({
    key,
    label: BUCKET_LABELS[key],
    items: plan.actions.filter((a) => a.bucket === key),
  }));

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
              <Sparkles className="size-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-primary">JALUR</span>
          </a>
          <span className="text-sm font-medium text-muted-foreground">
            Rencana aksi kamu
          </span>
        </div>
      </header>

      {committing && (
        <div className="mx-auto w-full max-w-5xl px-4 pt-4">
          <div className="flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/10 px-4 py-3 text-sm font-medium text-primary-dark">
            <Loader2 className="size-4 animate-spin" />
            Menyimpan rencana ke akunmu...
          </div>
        </div>
      )}

      <main className="mx-auto w-full max-w-5xl px-4 py-10 md:py-12">
        <Card className="overflow-hidden">
          <div className="h-3 bg-linear-to-r from-primary to-peach" />
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <Badge className="w-fit gap-1 border-transparent bg-primary/15 text-primary-dark">
                  <TrendingUp className="size-3.5" />
                  Career Plan
                </Badge>
                <CardTitle className="mt-2 text-3xl font-bold tracking-tight">
                  {plan.career.name}
                </CardTitle>
                <CardDescription className="mt-1">
                  {plan.career.salary_range} · {plan.career.category}
                </CardDescription>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Career Readiness
                </span>
                <div className="bg-linear-to-r from-primary to-peach bg-clip-text text-5xl font-bold tracking-tight text-transparent">
                  {plan.career_readiness}
                  <span className="ml-1 text-lg font-normal text-muted-foreground">
                    / 100
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="mt-10">
          <h2 className="text-xl font-bold tracking-tight">Requirements & posisimu</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Target untuk masuk {plan.career.name} dibanding posisimu sekarang.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {plan.requirements.map((r) => (
              <Card key={r.key}>
                <CardContent className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold">{r.label}</span>
                    <span
                      className={cn(
                        "shrink-0 text-xs font-medium",
                        r.severity === "critical" && "text-destructive",
                        r.severity === "open" && "text-warning",
                        r.severity === "covered" && "text-success",
                      )}
                    >
                      {r.current} / {r.target_level}
                    </span>
                  </div>
                  <div className="relative">
                    <Progress value={reqProgress(r)} />
                    <span
                      className="absolute top-0 h-full w-px bg-foreground/40"
                      style={{ left: `${(r.target_level / 5) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold tracking-tight">Gap analysis</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Yang paling penting untuk disiapkan dari sekarang.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {criticalGaps.map((g) => (
              <Card
                key={g.key}
                className="border-destructive/40 bg-destructive/5"
              >
                <CardContent className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-destructive/15">
                    <span className="text-base">🔴</span>
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{g.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Kurang {g.gap} level dari target {g.target_level} · prioritas{" "}
                      {g.importance === "high" ? "tinggi" : "sedang"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
            {openGaps.map((g) => (
              <Card key={g.key}>
                <CardContent className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-warning/15">
                    <span className="text-base">🟡</span>
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{g.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Kurang {g.gap} level dari target {g.target_level} · prioritas{" "}
                      {g.importance === "high" ? "tinggi" : "sedang"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold tracking-tight">Rencana aksi terprioritas</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tidak semua sekaligus — mulai dari yang paling berdampak.
          </p>

          <div className="mt-5 space-y-6">
            {buckets.map(
              (bucket) =>
                bucket.items.length > 0 && (
                  <section
                    key={bucket.key}
                    className={cn(
                      bucket.key === "this_week" &&
                        "rounded-2xl border border-primary/25 bg-primary/5 p-5",
                    )}
                  >
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary-dark">
                      {bucket.label}
                    </h3>
                    <div className="mt-3 space-y-4">
                      {bucket.items.map((item) => (
                        <div key={item.key}>
                          <p className="text-sm font-semibold">
                            <span className="mr-2 inline-flex size-5 items-center justify-center rounded-full bg-primary/15 text-xs text-primary-dark">
                              <Check className="size-3" />
                            </span>
                            {item.label}
                          </p>
                          <ul className="mt-1.5 space-y-1 pl-7 text-sm text-muted-foreground">
                            {item.actions.map((action) => (
                              <li key={action} className="list-disc marker:text-primary/50">
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                ),
            )}
          </div>
        </div>

        <div className="mt-12">
          <Separator />
          <div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-lg font-bold tracking-tight">
                {user && plan.persisted
                  ? "Rencana tersimpan. Mulai tandai progresmu."
                  : "Simpan rencana ini dan lacak progresmu."}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {user && plan.persisted
                  ? "Akses roadmap kariermu dari dashboard."
                  : "Masuk untuk menyimpan rencana, gap, dan langkahmu di akun JALUR."}
              </p>
            </div>
            {user && plan.persisted ? (
              <div className="flex gap-2">
                <Button
                  variant="brand"
                  onClick={() => navigate("/app/roadmap")}
                  className="gap-2"
                >
                  Buka Roadmap
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    navigate(`/assessment/current-state?career=${plan.career.id}`)
                  }
                  className="gap-2"
                >
                  <RefreshCw className="size-4" />
                  Reassess
                </Button>
                <Button variant="outline" onClick={() => navigate("/app")} className="gap-2">
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Button>
              </div>
            ) : (
              <Button
                variant="brand"
                onClick={() => navigate("/login", { state: { returnTo: "/plan" } })}
                className="w-full gap-2 md:w-auto"
              >
                Simpan & mulai lacak progres
                <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}