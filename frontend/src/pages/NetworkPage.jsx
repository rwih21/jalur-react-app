import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Header, Card, Pill, Button } from "../components/ui";
export default function NetworkPage() {
  const [pros, setPros] = useState([]);
  const [f, setF] = useState("All");
  useEffect(() => {
    api
      .get(f === "All" ? "/professionals" : `/professionals?industry=${encodeURIComponent(f)}`)
      .then(setPros);
  }, [f]);
  const cats = ["All", ...new Set(pros.map((x) => x.industry))];
  return (
    <>
      <Header
        title="JALUR Network"
        sub="Meet the people who can move your career forward."
      />
      <div className="flex gap-2 overflow-auto">
        {cats.map((x) => (
          <Pill key={x} active={f === x} onClick={() => setF(x)}>
            {x}
          </Pill>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pros.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex justify-between">
              <b>{p.name}</b>
              <b className="text-violet-600">{p.match_percentage}%</b>
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
