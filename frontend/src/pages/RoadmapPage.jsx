import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { cn } from "@/lib/utils";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Header,
} from "../components/ui";

export default function RoadmapPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.get("/roadmap").then(setItems);
  }, []);
  const toggle = async (id) => {
    const target = items.find((x) => x.id === id);
    const updated = await api.put(`/roadmap/${id}`, {
      completed: !target.completed,
    });
    setItems(items.map((x) => (x.id === id ? updated : x)));
  };
  const done = items.filter((x) => x.completed).length;
  return (
    <>
      <Header
        title="Your Roadmap"
        sub={`${done} of ${items.length} complete`}
      />
      <div className="space-y-3">
        {items.map((x) => (
          <Card key={x.id}>
            <CardContent className="flex items-center justify-between gap-4 py-4">
              <label className="flex flex-1 cursor-pointer items-start gap-3 text-left">
                <Checkbox
                  checked={x.completed}
                  onCheckedChange={() => toggle(x.id)}
                  className="mt-0.5"
                />
                <span
                  className={cn(
                    "text-sm font-medium",
                    x.completed && "text-muted-foreground line-through",
                  )}
                >
                  {x.title}
                </span>
              </label>
              {x.title.includes("network") && (
                <Button size="sm" onClick={() => navigate("/app/network")}>
                  View People
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}