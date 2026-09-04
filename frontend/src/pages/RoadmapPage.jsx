import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Header, Card, Button } from "../components/ui";
export default function RoadmapPage({ go }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.get("/roadmap").then(setItems);
  }, []);
  const toggle = async (id) => {
    const target = items.find((x) => x.id === id);
    const updated = await api.put(`/roadmap/${id}`, { completed: !target.completed });
    setItems(items.map((x) => (x.id === id ? updated : x)));
  };
  const done = items.filter((x) => x.completed).length;
  return (
    <>
      <Header
        title="Your Roadmap"
        sub={`${done} of ${items.length} complete`}
      />
      {items.map((x) => (
        <Card key={x.id} className="mb-3 p-5">
          <button
            onClick={() => toggle(x.id)}
            className="text-left"
          >
            <b>
              {x.completed ? "✓ " : ""}
              {x.title}
            </b>
            {x.title.includes("network") && (
              <div>
                <Button onClick={() => go("network")} className="mt-3">
                  View People
                </Button>
              </div>
            )}
          </button>
        </Card>
      ))}
    </>
  );
}
