import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "../components/ui";

export default function OpportunitiesPage() {
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  useEffect(() => {
    api.get("/careers").then(setCareers);
  }, []);
  return (
    <>
      <Header
        title="Opportunities For You"
        sub={`${careers.length} matched opportunities`}
      />
      <div className="space-y-4">
        {careers.map((c) => (
          <Card key={c.id}>
            <CardHeader>
              <CardTitle>{c.name}</CardTitle>
              <CardDescription className="text-base font-semibold text-primary-dark">
                {c.match_percentage}% match
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-4">
              <Badge variant="outline">{c.skills}</Badge>
              <Button variant="outline" onClick={() => navigate("/app/interview")}>
                Practice Job Interview
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}