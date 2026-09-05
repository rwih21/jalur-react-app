import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Compass,
  Dna,
  Baby,
  Network,
  Video,
  Map,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui";

const features = [
  {
    icon: Dna,
    title: "Career DNA",
    desc: "Tes singkat yang memetakan kekuatanmu jadi profil karier yang unik.",
  },
  {
    icon: Compass,
    title: "Career Matching",
    desc: "Dapatkan daftar karier yang paling cocok, lengkap dengan tingkat kecocokan.",
  },
  {
    icon: Map,
    title: "Personal Roadmap",
    desc: "Langkah demi langkah yang spesifik untuk sampai ke karier impianmu.",
  },
  {
    icon: Network,
    title: "JALUR Network",
    desc: "Terhubung dengan profesional yang bisa menggerakkan kariermu.",
  },
  {
    icon: Video,
    title: "AI Video Interview",
    desc: "Latihan wawancara realistis dengan simulasi langsung dan umpan balik.",
  },
  {
    icon: Baby,
    title: "Career Copilot",
    desc: "Asisten karier yang memahami riwayat dan kesenjanganmu.",
  },
];

const steps = [
  {
    step: "01",
    title: "Jawab beberapa pertanyaan",
    desc: "Kenali cara kamu berpikir, memimpin, dan mengambil keputusan.",
  },
  {
    step: "02",
    title: "Temukan Career DNA-mu",
    desc: "Kami menghitung kepribadian kerjamu menjadi profil yang jelas.",
  },
  {
    step: "03",
    title: "Lihat karier yang cocok",
    desc: "Daftar karier tersusun berdasarkan tingkat kecocokan dengan DNA-mu.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-8">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-2"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Compass className="size-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-primary">
              JALUR
            </span>
          </a>
          <Button variant="outline" onClick={() => navigate("/login")}>
            Sign in
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--color-primary)_12%,transparent),transparent_60%)]" />
          <div className="relative mx-auto w-full max-w-6xl px-4 py-20 text-center md:px-8 md:py-28">
            <div className="mx-auto w-fit">
              <span className="inline-flex items-center gap-2 rounded-full border bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                <Dna className="size-3.5" />
                Discover your career DNA
              </span>
            </div>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-balance md:text-6xl">
              Temukan jalur karier yang{" "}
              <span className="text-primary">benar-benar cocok</span> untukmu.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              JALUR mengenali cara kamu berpikir dan bekerja lewat tes singkat,
              lalu mencocokkannya dengan peluang karier yang nyata.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={() => navigate("/assessment")}
                className="w-full gap-2 sm:w-auto"
              >
                Get Started
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/login")}
                className="w-full sm:w-auto"
              >
                Already have an account?
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-muted/40 py-20">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Apa itu JALUR?
              </h2>
              <p className="mt-4 text-muted-foreground">
                JALUR adalah platform perkembangan karier yang mengubah cara
                kamu mempersiapkan masa depan — dari mengetahui kekuatanmu hingga
                membangun langkah nyata menuju pekerjaan impian.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <Card key={f.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                        <f.icon className="size-4 text-primary" />
                      </div>
                      {f.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">
                      {f.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Cara kerjanya
              </h2>
              <p className="mt-4 text-muted-foreground">
                Mulai dari pertanyaan pertama sampai daftar karier, butuh kurang
                dari 5 menit.
              </p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {steps.map((s) => (
                <div key={s.step} className="relative rounded-xl border bg-card p-6">
                  <span className="text-sm font-bold text-primary">{s.step}</span>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button size="lg" onClick={() => navigate("/assessment")} className="gap-2">
                Start my assessment
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-muted-foreground sm:flex-row md:px-8">
          <span className="font-bold tracking-tight text-primary">JALUR</span>
          <span>Built to help you find your way.</span>
        </div>
      </footer>
    </div>
  );
}