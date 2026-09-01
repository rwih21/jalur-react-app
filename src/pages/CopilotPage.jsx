import React, { useState } from "react";
import { Header, Card, Button } from "../components/ui";
export default function CopilotPage({ go }) {
  const [s, setS] = useState(false);
  return (
    <>
      <Header
        title="Career Copilot"
        sub="Your Copilot understands your career and interview history."
      />
      <Card className="p-6">
        <div className="rounded-xl bg-slate-100 p-4">
          Hey Jeremia 👋 What do you want to work on?
        </div>
        <button
          onClick={() => setS(true)}
          className="mt-4 rounded-xl border p-3 font-bold"
        >
          Why am I struggling with behavioral interviews?
        </button>
        {s && (
          <div className="mt-4 rounded-xl bg-violet-50 p-4">
            You often skip the Result portion of STAR answers.
            <br />
            <Button onClick={() => go("interview")} className="mt-3">
              Start Practice
            </Button>
          </div>
        )}
      </Card>
    </>
  );
}
