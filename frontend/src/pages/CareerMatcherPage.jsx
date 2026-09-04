import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Header, Card, Pill, Button } from "../components/ui";
export default function CareerMatcherPage() {
  const [careers, setCareers] = useState([]);
  const [f, setF] = useState("All");
  useEffect(() => {
    api
      .get(f === "All" ? "/careers" : `/careers?category=${encodeURIComponent(f)}`)
      .then(setCareers);
  }, [f]);
  const cats = ["All", ...new Set(careers.map((x) => x.category))];
  return (
    <>
      <Header
        title="Find Your Jalur"
        sub="Eksplor career path yang sesuai dengan profilmu."
      />
      <div className="flex gap-2">
        {cats.map((x) => (
          <Pill key={x} active={f === x} onClick={() => setF(x)}>
            {x}
          </Pill>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {careers.map((c) => (
          <Card key={c.id} className="p-5">
            <div className="flex justify-between">
              <b>{c.name}</b>
              <b className="text-violet-600">{c.match_percentage}%</b>
            </div>
            <p className="mt-4 text-sm">{c.salary_range}</p>
            <p className="text-sm text-slate-500">{c.skills}</p>
            <Button secondary className="mt-4">
              Explore Career
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
}
