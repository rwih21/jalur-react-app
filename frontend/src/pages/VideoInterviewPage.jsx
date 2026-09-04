import React, { useEffect, useRef, useState } from "react";
import { Camera, Mic, Square } from "lucide-react";
import api from "../services/api";
import CameraPreview from "../components/interview/CameraPreview";
import { Header, Card, Button, Progress, Pill } from "../components/ui";
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
        <Card className="p-7">
          <h2 className="text-3xl font-black">
            Your personal HireVue simulator.
          </h2>
          <div className="mt-5 flex gap-2">
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
            className="mt-6"
            disabled={questions.length === 0}
          >
            Start Interview
          </Button>
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
        <div className="mt-4 flex gap-2">
          <Button onClick={enable}>
            <Camera className="mr-2 inline" />
            Test Camera & Mic
          </Button>
          <Button secondary onClick={() => setScreen("instructions")}>
            Continue
          </Button>
        </div>
      </>
    );
  if (screen === "instructions")
    return (
      <Card className="mx-auto max-w-3xl p-7">
        <h2 className="text-3xl font-black">Before You Begin</h2>
        <p className="mt-4">30 seconds to prepare · 90 seconds to answer</p>
        <Button onClick={() => setScreen("room")} className="mt-6">
          Start Interview
        </Button>
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
        <Card className="p-7">
          <div className="text-6xl font-black">{score} / 100</div>
          <p className="mt-4">{feedback}</p>
          <div className="mt-6 flex gap-2">
            <Button
              secondary
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
          </div>
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
      <Card className="mt-5 p-6">
        <h2 className="text-center text-2xl font-black">
          “{questions[idx].question_text}”
        </h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
          <CameraPreview stream={stream} recording={phase === "recording"} />
          <div className="rounded-xl bg-slate-50 p-6 text-center">
            <div className="text-5xl font-black">
              {String(Math.floor(time / 60)).padStart(2, "0")}:
              {String(time % 60).padStart(2, "0")}
            </div>
            {phase === "prepare" && (
              <Button onClick={startRec} className="mt-5">
                Start Answer
              </Button>
            )}
            {phase === "recording" && (
              <Button danger onClick={finish} className="mt-5">
                <Square className="mr-2 inline" />
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
      </Card>
    </>
  );
}
