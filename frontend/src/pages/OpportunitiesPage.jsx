import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Header, Card, Button } from "../components/ui";
export default function OpportunitiesPage({ go }) {
  const [careers, setCareers] = useState([]);
  useEffect(() => {
    api.get("/careers").then(setCareers);
  }, []);
  return (
    <>
      <Header
        title="Opportunities For You"
        sub={`${careers.length} matched opportunities`}
      />
      {careers.map((c) => (
        <Card key={c.id} className="mb-4 p-6">
          <div className="flex justify-between">
            <b>{c.name}</b>
            <b className="text-violet-600">{c.match_percentage}%</b>
          </div>
          <p className="text-sm text-slate-500">{c.skills}</p>
          <Button onClick={() => go("interview")} secondary className="mt-4">
            Practice Job Interview
          </Button>
        </Card>
      ))}
    </>
  );
}
