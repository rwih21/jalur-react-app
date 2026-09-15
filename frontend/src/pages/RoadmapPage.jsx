import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, RefreshCw, Target } from "lucide-react";
import api from "../services/api";
import { cn } from "@/lib/utils";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Header,
  Progress,
} from "../components/ui";

export default function RoadmapPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [labels, setLabels] = useState({});
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api
      .get("/roadmap")
      .then(setData)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!data?.career) return;
    api
      .get("/plan")
      .then((d) => {
        if (d.plan) {
          const map = {};
          d.plan.requirements.forEach((r) => {
            map[r.key] = r.label;
          });
          setLabels(map);
        }
      })
      .catch(() => {});
  }, [data?.career?.id]);

  const toggle = async (id) => {
    const target = data.items.find((x) => x.id === id);
    const updated = await api.put(`/roadmap/${id}`, {
      completed: !target.completed,
    });
    setData((prev) => ({
      ...prev,
      items: prev.items.map((x) => (x.id === id ? updated : x)),
    }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-muted-foreground">
        <Loader2 className="size-6 animate-spin text-primary" />
        <span className="text-sm font-medium">Loading your roadmap...</span>
      </div>
    );
  }

  if (!data?.items?.length) {
    return (
      <Card className="mx-auto max-w-md overflow-hidden">
        <div className="h-3 bg-linear-to-r from-primary to-peach" />
        <CardHeader className="items-center text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
            <Target className="size-6 text-primary" />
          </div>
          <CardTitle className="text-xl">Belum ada roadmap karier</CardTitle>
          <CardDescription>
            Pilih karier target dan nilai posisimu sekarang untuk membuat
            rencana aksi terprioritas darimu menuju karier itu.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Button
            variant="brand"
            onClick={() => navigate("/assessment")}
            className="gap-2"
          >
            Mulai assessment
            <ArrowRight className="size-4" />
          </Button>
          <Button variant="outline" onClick={() => navigate("/careers")}>
            Pilih karier dulu
          </Button>
        </CardContent>
      </Card>
    );
  }

  const items = data.items;
  const done = items.filter((x) => x.completed).length;
  const groups = items.reduce((acc, item) => {
    const key = item.requirement_key || "others";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <>
      <Header
        title="Your Roadmap"
        sub={`${done} of ${items.length} action atas prioritas`}
        action={
          data.career && (
            <Button
              variant="outline"
              onClick={() =>
                navigate(`/assessment/current-state?career=${data.career.id}`)
              }
              className="gap-2"
            >
              <RefreshCw className="size-4" />
              Reassess
            </Button>
          )
        }
      />

      {data.readiness !== null && data.readiness !== undefined && (
        <Card className="mb-8">
          <CardContent className="flex items-center gap-6 py-4">
            <div className="shrink-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Career Readiness
              </p>
              <p className="bg-linear-to-r from-primary to-peach bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                {data.readiness}
                <span className="ml-1 text-base font-normal text-muted-foreground">
                  / 100
                </span>
              </p>
            </div>
            <Progress value={data.readiness} className="flex-1" />
            <p className="hidden max-w-xs text-xs text-muted-foreground sm:block">
              Kesiapan menuju {data.career?.name}. Refresh dengan Reassess setelah
              kamu menyelesaikan langkah-langkah di bawah.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {Object.entries(groups).map(([key, groupItems]) => (
          <section key={key}>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              {labels[key] || `Area: ${key}`}
            </h2>
            <div className="space-y-3">
              {groupItems.map((x) => (
                <Card key={x.id}>
                  <CardContent className="flex items-center justify-between gap-4 py-4">
                    <label className="flex flex-1 cursor-pointer items-start gap-3 text-left">
                      <Checkbox
                        checked={x.completed}
                        onCheckedChange={() => toggle(x.id)}
                        className="mt-0.5"
                      />
                      <span
                        className={cn(
                          "text-sm font-medium",
                          x.completed && "text-muted-foreground line-through",
                        )}
                      >
                        {x.title}
                      </span>
                    </label>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}