import React, { useState } from "react";
import pros from "../data/professionals";
import { Header, Card, Pill, Button } from "../components/ui";
export default function NetworkPage() {
  const [f, setF] = useState("All");
  const cats = ["All", ...new Set(pros.map((x) => x.industry))];
  const list = f === "All" ? pros : pros.filter((x) => x.industry === f);
  return (
    <>
      <Header
        title="JALUR Network"
        sub="Meet the people who can move your career forward."
      />
      <div className="flex gap-2 overflow-auto">
        {cats.map((x) => (
          <Pill active={f === x} onClick={() => setF(x)}>
            {x}
          </Pill>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (
          <Card className="p-5">
            <div className="flex justify-between">
              <b>{p.name}</b>
              <b className="text-violet-600">{p.match}%</b>
            </div>
            <p className="text-sm">{p.title}</p>
            <p className="text-sm font-semibold">{p.company}</p>
            <p className="mt-3 text-xs">{p.warmth}</p>
            <Button className="mt-4">Prepare Message</Button>
          </Card>
        ))}
      </div>
    </>
  );
}
