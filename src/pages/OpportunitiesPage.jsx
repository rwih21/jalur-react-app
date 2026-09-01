import React from "react";
import { Header, Card, Button } from "../components/ui";
export default function OpportunitiesPage({ go }) {
  return (
    <>
      <Header
        title="Opportunities For You"
        sub="127 matched opportunities · demo data"
      />
      {[
        "Investment Banking Analyst · Mandiri Sekuritas",
        "Business Analyst Intern · McKinsey",
        "Corporate Finance Intern · Astra",
      ].map((x, i) => (
        <Card className="mb-4 p-6">
          <div className="flex justify-between">
            <b>{x}</b>
            <b className="text-violet-600">{94 - i * 3}%</b>
          </div>
          <Button onClick={() => go("interview")} secondary className="mt-4">
            Practice Job Interview
          </Button>
        </Card>
      ))}
    </>
  );
}
