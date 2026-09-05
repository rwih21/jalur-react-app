import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button, Card, CardContent, Header } from "../components/ui";

export default function CopilotPage({ go }) {
  const [s, setS] = useState(false);
  return (
    <>
      <Header
        title="Career Copilot"
        sub="Your Copilot understands your career and interview history."
      />
      <Card>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted px-4 py-3 text-sm">
            Hey Jeremia 👋 What do you want to work on?
          </div>
          <Button
            variant="outline"
            className="w-full justify-start whitespace-normal h-auto min-h-9 py-2.5"
            onClick={() => setS(true)}
          >
            Why am I struggling with behavioral interviews?
          </Button>
          {s && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
              You often skip the Result portion of STAR answers.
              <br />
              <Button onClick={() => go("interview")} className="mt-3">
                Start Practice
                <ArrowRight className="size-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}