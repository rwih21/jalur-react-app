import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Compass, Sparkles } from "lucide-react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui";

export default function StartPage() {
  const navigate = useNavigate();

  const paths = [
    {
      icon: Compass,
      title: "Belum tahu mau jadi apa?",
      description:
        "Mulai tes Career DNA. Kami bacakan kecocokanmu dan rekomendasikan karier yang paling pas.",
      cta: "Mulai tes Career DNA",
      action: () => navigate("/assessment"),
      values: "Discover your fit",
    },
    {
      icon: Sparkles,
      title: "Sudah tahu tujuan kariermu",
      description:
        "Pilih karier yang kamu incar, lalu kami bantu lihat posisimu sekarang dan langkah berikutnya.",
      cta: "Pilih karier",
      action: () => navigate("/careers"),
      values: "Map your path",
    },
  ];

  return (
    <div className="min-h-svh bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--color-primary)_16%,transparent),transparent_60%)]" />
      <div className="relative mx-auto flex min-h-svh w-full max-w-3xl flex-col px-4 py-8">
        <header className="flex items-center justify-between">
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
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-1.5 text-muted-foreground"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
        </header>

        <main className="flex flex-1 flex-col justify-center py-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
              Apa yang ingin kamu lakukan?
            </h1>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Dua cara untuk menemukan kariermu. Pilih yang paling sesuai —
              keduanya mengarah ke rencana aksi yang terpersonalisasi.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {paths.map((p) => (
              <Card
                key={p.cta}
                className="group flex flex-col transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15">
                    <p.icon className="size-5 text-primary" />
                  </div>
                  <CardTitle className="mt-3 text-xl">{p.title}</CardTitle>
                  <CardDescription>{p.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex flex-col gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {p.values}
                  </span>
                  <Button variant="brand" onClick={p.action} className="w-full gap-2">
                    {p.cta}
                    <ArrowRight className="size-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Hasilnya sama-sama berujung pada satu hal: <b>langkah berikutnya.</b>
          </p>
        </main>
      </div>
    </div>
  );
}