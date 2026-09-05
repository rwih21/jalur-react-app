import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Header,
  Pill,
} from "../components/ui";

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
      <div className="flex gap-2 overflow-auto pb-1">
        {cats.map((x) => (
          <Pill key={x} active={f === x} onClick={() => setF(x)}>
            {x}
          </Pill>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {careers.map((c) => (
          <Card key={c.id}>
            <CardHeader>
              <CardTitle>{c.name}</CardTitle>
              <CardDescription className="text-base font-semibold text-primary">
                {c.match_percentage}% match
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{c.salary_range}</Badge>
                <Badge variant="outline">{c.skills}</Badge>
              </div>
              <Button variant="outline">Explore Career</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}