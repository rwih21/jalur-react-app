import React, { useState } from "react";
import { Header, Card, Button } from "../components/ui";
export default function RoadmapPage({ go }) {
  const items = [
    "Financial Modeling",
    "Build a DCF",
    "Trading Comps",
    "Build your IB network",
    "Apply to internships",
    "Technical interviews",
  ];
  const [d, setD] = useState([]);
  return (
    <>
      <Header
        title="Your Roadmap"
        sub={`${d.length} of ${items.length} complete`}
      />
      {items.map((x, i) => (
        <Card className="mb-3 p-5">
          <button
            onClick={() =>
              setD(d.includes(i) ? d.filter((v) => v !== i) : [...d, i])
            }
            className="text-left"
          >
            <b>
              {d.includes(i) ? "✓ " : ""}
              {x}
            </b>
            {i === 3 && (
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
