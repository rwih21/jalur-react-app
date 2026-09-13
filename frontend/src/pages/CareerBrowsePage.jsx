import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, Search, Sparkles, TriangleAlert } from "lucide-react";
import api from "../services/api";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Pill,
} from "../components/ui";

export default function CareerBrowsePage() {
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [f, setF] = useState("All");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    const params = new URLSearchParams();
    if (f !== "All") params.set("category", f);
    if (query) params.set("search", query);

    api
      .get(`/careers${params.size ? `?${params}` : ""}`)
      .then((data) => {
        setCareers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Karier gagal dimuat. Pastikan koneksi dan server aktif.");
        setLoading(false);
      });
  }, [f, query]);

  const cats = ["All", ...new Set(careers.map((x) => x.category))];
  const profileReady = careers.filter((c) => c.has_requirements);

  return (
    <div className="min-h-svh bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--color-primary)_12%,transparent),transparent_60%)]" />
      <div className="relative mx-auto min-h-svh w-full max-w-4xl px-4 py-8">
        <header className="flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/start");
            }}
            className="flex items-center gap-2"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-primary">JALUR</span>
          </a>
        </header>

        <main className="py-10">
          <h1 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Kamu sudah tahu mau jadi apa
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Pilih karier incaranmu. Kamu tidak perlu mengikuti tes — kita langsung hitung
            posisimu dan langkah yang perlu diambil.
          </p>

          <div className="relative mt-8 max-w-md">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setQuery(search.trim())}
              placeholder="Cari karier..."
              className="pl-9"
            />
          </div>

          <div className="mt-4 flex gap-2 overflow-auto pb-1">
            {cats.map((c) => (
              <Pill key={c} active={f === c} onClick={() => setF(c)}>
                {c}
              </Pill>
            ))}
          </div>

          {error && (
            <div className="mt-8 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <TriangleAlert className="size-4" />
              {error}
            </div>
          )}

          {loading ? (
            <div className="mt-16 flex flex-col items-center gap-3 text-muted-foreground">
              <Loader2 className="size-6 animate-spin text-primary" />
              <span className="text-sm font-medium">Loading careers...</span>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {careers.map((c) => {
                const ready = c.has_requirements;
                return (
                  <Card key={c.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3">
                        <CardTitle className="text-lg">{c.name}</CardTitle>
                        <Badge variant="secondary" className="shrink-0">
                          {c.category}
                        </Badge>
                      </div>
                      <CardDescription>{c.salary_range}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <span className="text-sm font-medium text-muted-foreground">
                        {c.skills}
                      </span>
                      {ready ? (
                        <Button
                          variant="brand"
                          onClick={() =>
                            navigate(`/assessment/current-state?career=${c.id}`)
                          }
                          className="gap-2"
                        >
                          Pilih karier ini
                          <ArrowRight className="size-4" />
                        </Button>
                      ) : (
                        <Button variant="outline" disabled className="cursor-not-allowed">
                          Profil karier segera hadir
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {!loading && !error && careers.length === 0 && (
            <div className="mt-16 text-center text-muted-foreground">
              Tidak ada karier yang cocok dengan pencarianmu.
            </div>
          )}

          {!loading && !error && profileReady.length === 0 && careers.length > 0 && (
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Belum ada karier dengan jalur lengkap.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}