import React from "react";
import { Header, Card, Progress } from "../components/ui";
export default function ProfilePage() {
  return (
    <>
      <Header
        title="Profile"
        sub="Profilmu membantu JALUR memberi rekomendasi yang tepat."
      />
      <Card className="p-7">
        <h2 className="text-2xl font-black">Jeremia</h2>
        <p>Finance · Universitas Airlangga</p>
        <div className="mt-5">
          <Progress value={78} />
        </div>
        <p className="mt-2 font-bold">Career Score: 78</p>
      </Card>
    </>
  );
}
