import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  RefreshCw,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import api from "../services/api";
import { cn } from "@/lib/utils";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from "../components/ui";
import logo from "../assets/logo/jalur-logo-dark.png";

const ANSWERS_KEY = "jalur_assessment_answers";
const RESULT_KEY = "jalur_assessment_result";

function loadAnswers() {
  try {
    return JSON.parse(localStorage.getItem(ANSWERS_KEY)) || [];
  } catch {
    return [];
  }
}

export default function QuestionnairePage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(loadAnswers);
  const [submitting, setSubmitting] = useState(false);
  const [mode, setMode] = useState(null);

  const loadQuestions = () => {
    setLoading(true);
    setError("");
    api
      .get("/assessment/questions")
      .then((q) => {
        setQuestions(q);
        setLoading(false);
        const answered = q.filter((question) =>
          answers.some((a) => a.question_id === question.id),
        );
        if (answered.length) setIndex(answered.length - 1);
        const hasResult = (() => {
          try {
            return !!JSON.parse(localStorage.getItem(RESULT_KEY));
          } catch {
            return false;
          }
        })();
        if (hasResult && answered.length === q.length) setMode("done");
        else if (answered.length > 0) setMode("resume");
        else setMode("quiz");
      })
      .catch(() => {
        setLoading(false);
        setError("Pertanyaan gagal dimuat. Pastikan koneksi internet dan server aktif.");
      });
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const current = questions[index];
  const total = questions.length;
  const answeredCount = useMemo(
    () => answers.filter((a) => questions.some((q) => q.id === a.question_id)).length,
    [answers, questions],
  );
  const progress = total ? Math.round((answeredCount / total) * 100) : 0;

  const currentAnswer = current
    ? answers.find((a) => a.question_id === current.id)?.option_index ?? null
    : null;

  const persist = (next) => {
    setAnswers(next);
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(next));
  };

  const choose = (optionIndex) => {
    const next = answers.filter((a) => a.question_id !== current.id);
    next.push({ question_id: current.id, option_index: optionIndex });
    persist(next);
  };

  const goBack = () => {
    if (index > 0) setIndex(index - 1);
  };

  const resume = () => setMode("quiz");

  const startOver = () => {
    localStorage.removeItem(ANSWERS_KEY);
    localStorage.removeItem(RESULT_KEY);
    setAnswers([]);
    setIndex(0);
    setMode("quiz");
  };

  const goToResults = () => navigate("/results");

  const goNext = () => {
    if (index < total - 1) setIndex(index + 1);
  };

  const finish = async () => {
    setSubmitting(true);
    try {
      const result = await api.post("/assessment/score", {
        answers: answers.filter((a) =>
          questions.some((q) => q.id === a.question_id),
        ),
      });
      localStorage.setItem(RESULT_KEY, JSON.stringify(result));
      if (result.persisted) {
        localStorage.removeItem(ANSWERS_KEY);
      }
      navigate("/results");
    } catch {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="size-6 animate-spin text-primary" />
          <span className="text-sm font-medium">Loading questions...</span>
        </div>
      </div>
    );
  }

  if (error || !questions.length) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background px-4">
        <Card className="max-w-md text-center">
          <CardHeader className="items-center">
            <div className="flex size-12 items-center justify-center rounded-xl bg-destructive/10">
              <TriangleAlert className="size-6 text-destructive" />
            </div>
            <CardTitle className="text-xl">Gagal memuat pertanyaan</CardTitle>
            <CardDescription>
              {error || "Belum ada pertanyaan yang tersedia. Coba lagi sebentar ya."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={loadQuestions} className="gap-2">
              <RefreshCw className="size-4" />
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="border-b">
        <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="flex items-center gap-2"
          >
            <div className="flex size-20 items-center justify-center text-primary-foreground">
              <img src={logo} alt="Logo" className="" />
            </div>
          </a>
          <span className="text-sm font-medium text-muted-foreground">
            {progress}% completed
          </span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8">
        {mode === "done" ? (
          <div className="flex flex-1 flex-col items-center justify-center py-12">
            <Card className="w-full max-w-md text-center">
              <CardHeader className="items-center">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <Sparkles className="size-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Tes sudah kamu selesaikan</CardTitle>
                <CardDescription>
                  Career DNA-mu sudah tersimpan. Lihat hasil atau ulangi tes dari
                  awal.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button variant="brand" onClick={goToResults} className="gap-2">
                  Lihat Hasil
                  <ArrowRight className="size-4" />
                </Button>
                <Button variant="outline" onClick={startOver} className="gap-2">
                  <RefreshCw className="size-4" />
                  Ulangi Tes
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {mode === "resume" && (
              <div className="mb-6 flex flex-col gap-3 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-primary-dark">
                    Belum selesai — lanjutkan?
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Kamu sudah menjawab {answeredCount} dari {total} pertanyaan.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="brand" onClick={resume}>
                    Lanjutkan
                  </Button>
                  <Button size="sm" variant="outline" onClick={startOver}>
                    Mulai Ulang
                  </Button>
                </div>
              </div>
            )}

            <div className="mb-8 flex items-center gap-4">
              <Progress value={progress} className="flex-1" />
              <span className="shrink-0 text-sm font-medium text-muted-foreground">
                {index + 1} / {total}
              </span>
            </div>

            {current && (
              <div className="flex flex-1 flex-col">
                <h1 className="text-2xl font-bold tracking-tight text-balance md:text-3xl">
                  {current.question_text}
                </h1>
                <div className="mt-8 grid gap-3">
                  {current.options.map((option, optionIndex) => {
                    const selected = currentAnswer === optionIndex;
                    return (
                      <button
                        key={optionIndex}
                        onClick={() => choose(optionIndex)}
                        className={cn(
                          "rounded-xl border px-5 py-4 text-left text-sm transition-colors",
                          selected
                            ? "border-primary bg-primary/10 font-medium text-primary-dark shadow-sm"
                            : "bg-card text-foreground hover:border-primary/40 hover:bg-accent",
                        )}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-10 flex items-center justify-between gap-3">
              <Button variant="outline" onClick={goBack} disabled={index === 0}>
                <ArrowLeft className="size-4" />
                Back
              </Button>
              {index < total - 1 ? (
                <Button onClick={goNext} disabled={currentAnswer === null}>
                  Next
                  <ArrowRight className="size-4" />
                </Button>
              ) : (
                <Button onClick={finish} disabled={currentAnswer === null}>
                  {submitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Sparkles className="size-4" />
                  )}
                  See My Results
                </Button>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}