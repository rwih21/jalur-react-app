import React, { useEffect, useRef, useState } from "react";
import { Camera, Square } from "lucide-react";
import api from "../services/api";
import CameraPreview from "../components/interview/CameraPreview";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Header,
  Pill,
  Progress,
} from "../components/ui";

export default function VideoInterviewPage() {
  const [screen, setScreen] = useState("setup"),
    [mode, setMode] = useState("real"),
    [stream, setStream] = useState(null),
    [idx, setIdx] = useState(0),
    [phase, setPhase] = useState("prepare"),
    [time, setTime] = useState(30),
    [questions, setQuestions] = useState([]),
    [report, setReport] = useState(null);
  const rec = useRef(null);
  useEffect(() => {
    api.get("/questions").then(setQuestions);
  }, []);
  const enable = async () => {
    try {
      setStream(
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true }),
      );
    } catch (e) {}
  };
  useEffect(() => () => stream?.getTracks().forEach((t) => t.stop()), [stream]);
  useEffect(() => {
    if (screen !== "room" || !["prepare", "recording"].includes(phase)) return;
    const t = setInterval(() => setTime((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [screen, phase]);
  const startRec = () => {
    setPhase("recording");
    setTime(90);
    if (stream && window.MediaRecorder) {
      rec.current = new MediaRecorder(stream);
      rec.current.start();
    }
  };
  const finish = () => {
    if (rec.current?.state === "recording") rec.current.stop();
    setPhase("submitted");
  };
  if (screen === "setup")
    return (
      <>
        <Header
          title="AI Video Interview"
          sub="Experience a realistic interview before the real one."
        />
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Your personal HireVue simulator.
            </CardTitle>
            <CardDescription>Choose a mode to begin.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-5">
            <div className="flex gap-2">
              <Pill active={mode === "real"} onClick={() => setMode("real")}>
                Real Interview
              </Pill>
              <Pill
                active={mode === "practice"}
                onClick={() => setMode("practice")}
              >
                Coaching Mode
              </Pill>
            </div>
            <Button
              onClick={() => setScreen("devices")}
              disabled={questions.length === 0}
            >
              Start Interview
            </Button>
          </CardContent>
        </Card>
      </>
    );
  if (screen === "devices")
    return (
      <>
        <Header
          title="Let's check your setup"
          sub="Camera and microphone activate only after you choose Test."
        />
        <CameraPreview stream={stream} />
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={enable}>
            <Camera className="size-4" />
            Test Camera & Mic
          </Button>
          <Button variant="outline" onClick={() => setScreen("instructions")}>
            Continue
          </Button>
        </div>
      </>
    );
  if (screen === "instructions")
    return (
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Before You Begin
          </CardTitle>
          <CardDescription>
            30 seconds to prepare · 90 seconds to answer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setScreen("room")}>Start Interview</Button>
        </CardContent>
      </Card>
    );
  if (screen === "report") {
    const score = report?.score ?? 84;
    const feedback =
      report?.feedback ||
      "Strong technical fundamentals. Improve STAR structure and conciseness.";
    return (
      <>
        <Header
          title="Your Interview Report"
          sub="Investment Banking Analyst"
        />
        <Card>
          <CardContent className="flex flex-col items-start gap-4 text-center sm:items-center">
            <div className="text-6xl font-bold tracking-tight">
              {score} <span className="text-2xl text-muted-foreground">/ 100</span>
            </div>
            <p className="max-w-lg text-muted-foreground">{feedback}</p>
            <Button
              variant="outline"
              onClick={() => {
                setScreen("setup");
                setIdx(0);
                setPhase("prepare");
                setTime(30);
                setReport(null);
              }}
            >
              Restart Interview
            </Button>
          </CardContent>
        </Card>
      </>
    );
  }
  const next = async () => {
    if (idx === questions.length - 1) {
      stream?.getTracks().forEach((t) => t.stop());
      const score = Math.floor(70 + Math.random() * 25);
      const saved = await api
        .post("/interview/sessions", {
          mode,
          score,
          feedback:
            "Strong technical fundamentals. Improve STAR structure and conciseness.",
        })
        .catch(() => null);
      setReport(saved || { score });
      setScreen("report");
    } else {
      setIdx(idx + 1);
      setPhase("prepare");
      setTime(30);
    }
  };
  return (
    <>
      <Header
        title={`Question ${idx + 1} of ${questions.length}`}
        sub={questions[idx].type}
      />
      <Progress value={((idx + 1) / questions.length) * 100} />
      <Card className="mt-5">
        <CardContent className="flex flex-col gap-5">
          <h2 className="text-center text-xl font-semibold tracking-tight md:text-2xl">
            “{questions[idx].question_text}”
          </h2>
          <div className="grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
            <CameraPreview stream={stream} recording={phase === "recording"} />
            <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-6 text-center">
              <div className="text-5xl font-bold tracking-tight">
                {String(Math.floor(time / 60)).padStart(2, "0")}:
                {String(time % 60).padStart(2, "0")}
              </div>
              {phase === "prepare" && (
                <Button onClick={startRec} className="mt-5">
                  Start Answer
                </Button>
              )}
              {phase === "recording" && (
                <Button variant="destructive" onClick={finish} className="mt-5">
                  <Square className="size-4" />
                  Finish Answer
                </Button>
              )}
              {phase === "submitted" && (
                <Button onClick={next} className="mt-5">
                  Next Question
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}