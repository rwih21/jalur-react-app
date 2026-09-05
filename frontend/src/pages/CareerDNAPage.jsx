import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  Header,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
} from "../components/ui";

export default function CareerDNAPage() {
  const { user } = useAuth();
  return (
    <>
      <Header
        title="Your Career DNA"
        sub="Begini cara JALUR memahami dirimu."
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-semibold tracking-tight">
            Analytical Strategist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {[
              ["Analytical Thinking", 92],
              ["Leadership", 84],
              ["Communication", 78],
              ["Commercial Orientation", user?.career_score || 88],
            ].map(([x, v]) => (
              <div key={x} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{x}</span>
                  <span className="font-semibold">{v}</span>
                </div>
                <Progress value={v} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}