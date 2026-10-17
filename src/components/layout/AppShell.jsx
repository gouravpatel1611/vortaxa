import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Activity, ArrowUpRight, CircleDollarSign, LayoutDashboard, LogOut, Menu, Plus, ShieldCheck, X } from "lucide-react";
import { logoutUser } from "../../services/firebase/authService";
import { useAuth } from "../../context/AuthContext";

const navClass = ({ isActive }) =>
  `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition ${
    isActive
      ? "bg-emerald-400/10 text-emerald-300 ring-1 ring-inset ring-emerald-400/15"
      : "text-slate-400 hover:bg-white/[0.045] hover:text-white"
  }`;

export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === "/vortaxa";

  async function handleLogout() {
    try {
      setSigningOut(true);
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      window.alert("Unable to sign out. Please try again.");
    } finally {
      setSigningOut(false);
    }
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-[76px] items-center gap-3 border-b border-white/[0.07] px-5">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-300 to-teal-500 text-slate-950 shadow-lg shadow-emerald-950/30">
          <Activity size={21} strokeWidth={2.7} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[15px] font-black tracking-tight text-white">VORTAXA</p>
          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.19em] text-slate-500">Earnings workspace</p>
        </div>
        <button onClick={() => setMobileOpen(false)} className="ml-auto rounded-lg p-2 text-slate-400 hover:bg-white/10 lg:hidden" aria-label="Close menu">
          <X size={18} />
        </button>
      </div>

      <div className="px-4 pt-6">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">Workspace</p>
        <nav className="space-y-1">
          <NavLink to="/vortaxa" end className={navClass} onClick={() => setMobileOpen(false)}>
            <LayoutDashboard size={18} />
            <span className="flex-1">Overview</span>
            <ArrowUpRight size={14} className="opacity-50" />
          </NavLink>
          <NavLink to="/vortaxa/add" className={navClass} onClick={() => setMobileOpen(false)}>
            <Plus size={18} />
            <span>Add investment</span>
          </NavLink>
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div className="rounded-2xl border border-emerald-400/10 bg-gradient-to-br from-emerald-400/[0.09] to-teal-400/[0.025] p-4">
          <div className="mb-2 flex items-center gap-2 text-emerald-300">
            <ShieldCheck size={16} />
            <span className="text-xs font-bold">Private workspace</span>
          </div>
          <p className="text-xs leading-5 text-slate-500">Your Vortaxa records are saved to your secured account.</p>
        </div>
        <button onClick={handleLogout} disabled={signingOut} className="mt-4 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-400 transition hover:bg-rose-400/10 hover:text-rose-300 disabled:opacity-50">
          <LogOut size={17} />
          {signingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080d18] text-slate-100">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[258px] border-r border-white/[0.07] bg-[#0b1120] lg:block">
        {sidebar}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />
          <aside className="absolute inset-y-0 left-0 w-[min(84vw,300px)] border-r border-white/10 bg-[#0b1120] shadow-2xl">{sidebar}</aside>
        </div>
      )}

      <div className="min-h-screen lg:pl-[258px]">
        <header className="sticky top-0 z-20 border-b border-white/[0.07] bg-[#080d18]/90 backdrop-blur-xl">
          <div className="mx-auto flex h-[68px] max-w-[1500px] items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button onClick={() => setMobileOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.035] text-slate-300 lg:hidden" aria-label="Open navigation">
              <Menu size={19} />
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white">{isDashboard ? "Overview" : location.pathname.includes("/transactions") ? "Transaction history" : location.pathname.includes("/rates") ? "Daily rates" : location.pathname.endsWith("/add") ? "Add investment" : "Investment details"}</p>
              <p className="mt-0.5 hidden text-[11px] text-slate-500 sm:block">Track balances, earnings and withdrawals</p>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-2 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.08)]" />
              <span className="max-w-[190px] truncate text-xs font-medium text-slate-400">{user?.email || "Account connected"}</span>
            </div>
            <button onClick={() => navigate("/vortaxa/add")} className="flex h-10 items-center gap-2 rounded-xl bg-emerald-400 px-3.5 text-xs font-extrabold text-slate-950 transition hover:bg-emerald-300 sm:px-4 sm:text-sm">
              <Plus size={17} />
              <span className="hidden sm:inline">Add investment</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1500px] px-3 pb-28 pt-5 sm:px-6 sm:pt-7 lg:px-8 lg:pb-10">
          <Outlet />
        </main>

        <nav className="safe-bottom fixed inset-x-0 bottom-0 z-20 grid grid-cols-3 border-t border-white/[0.08] bg-[#0b1120]/95 px-3 pb-1 pt-2 backdrop-blur-xl lg:hidden">
          <NavLink to="/vortaxa" end className={({ isActive }) => `flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-bold ${isActive ? "text-emerald-300" : "text-slate-500"}`}>
            <LayoutDashboard size={19} />Overview
          </NavLink>
          <NavLink to="/vortaxa/add" className={({ isActive }) => `flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-bold ${isActive ? "text-emerald-300" : "text-slate-500"}`}>
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-400 text-slate-950"><Plus size={19} /></span>Add
          </NavLink>
          <button onClick={handleLogout} disabled={signingOut} className="flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-bold text-slate-500">
            <LogOut size={19} />Account
          </button>
        </nav>
      </div>
    </div>
  );
}
