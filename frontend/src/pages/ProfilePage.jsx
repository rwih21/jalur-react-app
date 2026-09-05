import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  Avatar,
  AvatarFallback,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Header,
  Progress,
} from "../components/ui";

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <>
      <Header
        title="Profile"
        sub="Profilmu membantu JALUR memberi rekomendasi yang tepat."
      />
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="size-14">
              <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                {user?.name
                  ?.split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-semibold tracking-tight">
                {user?.name}
              </CardTitle>
              <CardDescription>
                {user?.field_of_study} · {user?.university}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Career Score</span>
            <span className="font-semibold">{user?.career_score || 0}</span>
          </div>
          <Progress value={user?.career_score || 0} />
        </CardContent>
      </Card>
    </>
  );
}