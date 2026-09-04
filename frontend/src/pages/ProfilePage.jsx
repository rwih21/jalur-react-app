import React from "react";
import { useAuth } from "../context/AuthContext";
import { Header, Card, Progress } from "../components/ui";
export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <>
      <Header
        title="Profile"
        sub="Profilmu membantu JALUR memberi rekomendasi yang tepat."
      />
      <Card className="p-7">
        <h2 className="text-2xl font-black">{user?.name}</h2>
        <p>
          {user?.field_of_study} · {user?.university}
        </p>
        <div className="mt-5">
          <Progress value={user?.career_score || 0} />
        </div>
        <p className="mt-2 font-bold">Career Score: {user?.career_score || 0}</p>
      </Card>
    </>
  );
}
