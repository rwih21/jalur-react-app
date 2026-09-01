import React from "react";
export const cx = (...x) => x.filter(Boolean).join(" ");
export function Button({
  children,
  secondary = false,
  danger = false,
  className = "",
  ...p
}) {
  return (
    <button
      {...p}
      className={cx(
        "min-h-11 rounded-xl px-4 text-sm font-bold transition active:scale-[.98]",
        danger
          ? "bg-red-600 text-white"
          : secondary
            ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            : "bg-violet-600 text-white hover:bg-violet-700",
        className,
      )}
    >
      {children}
    </button>
  );
}
export function Card({ children, className = "" }) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
export function Progress({ value, dark = false }) {
  return (
    <div
      className={cx(
        "h-2 overflow-hidden rounded-full",
        dark ? "bg-white/10" : "bg-slate-100",
      )}
    >
      <div
        className="h-full rounded-full bg-violet-500 transition-all"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
export function Pill({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "min-h-10 shrink-0 rounded-full border px-3 text-xs font-bold",
        active
          ? "border-violet-600 bg-violet-50 text-violet-700"
          : "border-slate-200 bg-white text-slate-600",
      )}
    >
      {children}
    </button>
  );
}
export function Header({ title, sub, action }) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row">
      <div>
        <h1 className="text-2xl font-black md:text-3xl">{title}</h1>
        <p className="mt-1 text-slate-500">{sub}</p>
      </div>
      {action}
    </div>
  );
}
