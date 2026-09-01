import React, { useState } from "react";
import careers from "../data/careers";
import { Header, Card, Pill, Button } from "../components/ui";
export default function CareerMatcherPage() {
  const [f, setF] = useState("All");
  const cats = ["All", ...new Set(careers.map((x) => x.category))];
  const list = f === "All" ? careers : careers.filter((x) => x.category === f);
  return (
    <>
      <Header
        title="Find Your Jalur"
        sub="Eksplor career path yang sesuai dengan profilmu."
      />
      <div className="flex gap-2">
        {cats.map((x) => (
          <Pill active={f === x} onClick={() => setF(x)}>
            {x}
          </Pill>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {list.map((c) => (
          <Card className="p-5">
            <div className="flex justify-between">
              <b>{c.name}</b>
              <b className="text-violet-600">{c.match}%</b>
            </div>
            <p className="mt-4 text-sm">{c.salary}</p>
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
