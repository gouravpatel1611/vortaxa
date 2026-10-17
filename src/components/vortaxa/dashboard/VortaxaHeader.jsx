import { ArrowUpRight, Plus, Sparkles } from "lucide-react";

export default function VortaxaHeader({ onAdd }) {
  return (
    <section className="relative mb-5 overflow-hidden rounded-3xl border border-emerald-300/10 bg-gradient-to-br from-[#102b2b] via-[#10202b] to-[#111827] p-5 sm:p-7">
      <div className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full bg-emerald-300/[0.08] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-80px] right-[20%] h-40 w-40 rounded-full bg-cyan-300/[0.06] blur-3xl" />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.17em] text-emerald-200">
            <Sparkles size={13} /> Vortaxa workspace
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">Your earnings, at a glance.</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Manage investments, monitor daily earnings and keep your transactions organized in one place.</p>
        </div>
        <button type="button" onClick={onAdd} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 text-sm font-extrabold text-slate-950 transition hover:bg-emerald-300">
          <Plus size={18} /> Add investment <ArrowUpRight size={15} />
        </button>
      </div>
    </section>
  );
}
