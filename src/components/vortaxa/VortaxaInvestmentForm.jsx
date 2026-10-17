import { useState } from "react";
import { CalendarDays, CircleUserRound, Save, X, WalletCards } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useVortaxa } from "../../context/VortaxaContext";

function today() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function VortaxaInvestmentForm({ onCancel }) {
  const navigate = useNavigate();
  const { addInvestor } = useVortaxa();
  const [investorName, setInvestorName] = useState("");
  const [startDate, setStartDate] = useState(today());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const name = investorName.trim();
    if (!name) {
      setError("Please enter an investment name.");
      return;
    }

    try {
      setSaving(true);
      const standaloneId = `vortaxa_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      await addInvestor({
        investorId: standaloneId,
        investorName: name,
        startDate: startDate || today(),
        liquidity: 0,
        fule: 0,
        piFule: 0,
      });
      navigate("/vortaxa", { replace: true });
    } catch (saveError) {
      console.error("Vortaxa save error:", saveError);
      setError(saveError?.message || "Could not create this investment. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-5 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#121d2d] via-[#101827] to-[#0e1723]">
        <div className="flex items-start gap-4 p-5 sm:p-7">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-emerald-300/15 bg-emerald-300/10 text-emerald-300">
            <WalletCards size={23} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">New record</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">Add Vortaxa investment</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">Create a separate investment record to track its FULE, PI FULE, daily earnings and withdrawals.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-white/[0.08] bg-[#0e1625] p-4 sm:p-7">
        {error && <div role="alert" className="mb-5 rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm font-semibold text-rose-200">{error}</div>}
        <div className="mb-6 flex items-center gap-3 border-b border-white/[0.07] pb-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.05] text-slate-300"><CircleUserRound size={19} /></div>
          <div>
            <h2 className="text-sm font-bold text-white">Investment details</h2>
            <p className="mt-1 text-xs text-slate-500">You can add transactions and rates after creating the record.</p>
          </div>
        </div>

        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400" htmlFor="investment-name">Investor / record name</label>
        <input id="investment-name" autoFocus value={investorName} onChange={(event) => setInvestorName(event.target.value)} placeholder="e.g. Personal Vortaxa" maxLength={80} className="w-full rounded-xl border border-white/10 bg-[#080d18] px-4 py-3.5 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300/50 focus:ring-4 focus:ring-emerald-300/10" />

        <label className="mb-2 mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400" htmlFor="start-date"><CalendarDays size={14} /> Start date</label>
        <input id="start-date" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#080d18] px-4 py-3.5 text-sm font-semibold text-white outline-none transition focus:border-emerald-300/50 focus:ring-4 focus:ring-emerald-300/10" />

        <div className="mt-5 rounded-xl border border-sky-300/10 bg-sky-300/[0.045] p-4">
          <p className="text-xs font-bold text-sky-200">Good to know</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">Creating this record does not change your earnings rules. Add FULE / PI FULE transactions and daily rates as usual after setup.</p>
        </div>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => onCancel ? onCancel() : navigate("/vortaxa")} disabled={saving} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 px-5 text-sm font-bold text-slate-300 transition hover:bg-white/[0.04] disabled:opacity-50"><X size={17} />Cancel</button>
          <button type="submit" disabled={saving || !investorName.trim()} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 text-sm font-extrabold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"><Save size={17} />{saving ? "Creating…" : "Create investment"}</button>
        </div>
      </form>
    </div>
  );
}
