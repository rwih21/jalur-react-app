import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  Avatar,
  AvatarFallback,
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

export default function NetworkPage() {
  const [pros, setPros] = useState([]);
  const [f, setF] = useState("All");
  useEffect(() => {
    api
      .get(
        f === "All"
          ? "/professionals"
          : `/professionals?industry=${encodeURIComponent(f)}`,
      )
      .then(setPros);
  }, [f]);
  const cats = ["All", ...new Set(pros.map((x) => x.industry))];
  return (
    <>
      <Header
        title="JALUR Network"
        sub="Meet the people who can move your career forward."
      />
      <div className="flex gap-2 overflow-auto pb-1">
        {cats.map((x) => (
          <Pill key={x} active={f === x} onClick={() => setF(x)}>
            {x}
          </Pill>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pros.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-primary/10 font-semibold text-primary-dark">
                    {p.name
                      ?.split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() || "P"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <CardTitle className="text-base">{p.name}</CardTitle>
                  <CardDescription className="truncate">{p.title}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="border-transparent bg-primary/15 text-primary-dark">
                  {p.match_percentage}% match
                </Badge>
                <Badge variant="secondary">{p.company}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{p.warmth}</p>
              <Button className="w-full">Prepare Message</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}