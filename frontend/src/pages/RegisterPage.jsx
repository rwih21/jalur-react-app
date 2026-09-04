import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Card, Button } from "../components/ui";

export default function RegisterPage({ onSwitch }) {
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    university: "",
    field_of_study: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(form);
    } catch (err) {
      const firstError = Object.values(err.errors || {})[0];
      setError(firstError?.[0] || err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const field = "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <div className="text-3xl font-black text-violet-600">JALUR</div>
          <p className="mt-2 text-slate-500">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</div>
          )}

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Full Name</label>
            <input type="text" value={form.name} onChange={update("name")} required className={field} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Email</label>
            <input type="email" value={form.email} onChange={update("email")} required className={field} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">University</label>
            <input type="text" value={form.university} onChange={update("university")} className={field} placeholder="Universitas Airlangga" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Field of Study</label>
            <input type="text" value={form.field_of_study} onChange={update("field_of_study")} className={field} placeholder="Finance" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Password</label>
            <input type="password" value={form.password} onChange={update("password")} required className={field} placeholder="••••••••" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Confirm Password</label>
            <input type="password" value={form.password_confirmation} onChange={update("password_confirmation")} required className={field} placeholder="••••••••" />
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <button onClick={onSwitch} className="font-semibold text-violet-600 hover:underline">
            Sign in
          </button>
        </p>
      </Card>
    </div>
  );
}
