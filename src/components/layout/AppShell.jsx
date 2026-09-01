import React from "react";
import {
  Home,
  Sparkles,
  Compass,
  Target,
  Briefcase,
  Users,
  Send,
  Video,
  CircleUser,
} from "lucide-react";
const nav = [
  ["home", "Home", Home],
  ["dna", "Career DNA", Sparkles],
  ["careers", "Find Your Jalur", Compass],
  ["roadmap", "Roadmap", Target],
  ["jobs", "Opportunities", Briefcase],
  ["network", "JALUR Network", Users],
  ["copilot", "Career Copilot", Send],
  ["interview", "AI Video Interview", Video],
  ["profile", "Profile", CircleUser],
];
export default function AppShell({ page, setPage, children }) {
  const mobile = nav.filter((x) =>
    ["home", "jobs", "network", "interview", "copilot"].includes(x[0]),
  );
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-white p-5 lg:block">
        <div className="text-xl font-black text-violet-600">JALUR</div>
        <nav className="mt-8 space-y-1">
          {nav.map(([id, l, I]) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${page === id ? "bg-violet-50 text-violet-700" : "text-slate-500"}`}
            >
              <I size={18} />
              {l}
            </button>
          ))}
        </nav>
      </aside>
      <main className="pb-24 lg:ml-64 lg:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-7 md:px-8">{children}</div>
      </main>
      <nav className="fixed inset-x-0 bottom-0 grid grid-cols-5 border-t bg-white lg:hidden">
        {mobile.map(([id, l, I]) => (
          <button
            key={id}
            onClick={() => setPage(id)}
            className={`flex min-h-16 flex-col items-center justify-center text-[10px] font-bold ${page === id ? "text-violet-700" : "text-slate-400"}`}
          >
            <I size={20} />
            {id === "interview" ? "Interview" : l}
          </button>
        ))}
      </nav>
    </div>
  );
}
