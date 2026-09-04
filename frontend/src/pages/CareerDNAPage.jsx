import React from "react";
import { useAuth } from "../context/AuthContext";
import { Header, Card, Progress } from "../components/ui";
export default function CareerDNAPage() {
  const { user } = useAuth();
  return (
    <>
      <Header
        title="Your Career DNA"
        sub="Begini cara JALUR memahami dirimu."
      />
      <Card className="p-7">
        <h2 className="text-3xl font-black">Analytical Strategist</h2>
        {[
          ["Analytical Thinking", 92],
          ["Leadership", 84],
          ["Communication", 78],
          ["Commercial Orientation", user?.career_score || 88],
        ].map(([x, v]) => (
          <div key={x} className="mt-5">
            <div className="flex justify-between text-sm">
              <span>{x}</span>
              <b>{v}</b>
            </div>
            <Progress value={v} />
          </div>
        ))}
      </Card>
    </>
  );
}
