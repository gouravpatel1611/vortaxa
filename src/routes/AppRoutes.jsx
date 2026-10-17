import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import Login from "../pages/Login";
import Vortaxa from "../pages/vortaxa/Vortaxa";
import AddVortaxa from "../pages/vortaxa/AddVortaxa";
import VortaxaDetails from "../pages/vortaxa/VortaxaDetails";
import VortaxaRates from "../pages/vortaxa/VortaxaRates";
import VortaxaTransactions from "../pages/vortaxa/VortaxaTransactions";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/" element={<Navigate to="/vortaxa" replace />} />
            <Route path="/vortaxa" element={<Vortaxa />} />
            <Route path="/vortaxa/add" element={<AddVortaxa />} />
            <Route path="/vortaxa/:investorId/transactions" element={<VortaxaTransactions />} />
            <Route path="/vortaxa/:investorId/rates" element={<VortaxaRates />} />
            <Route path="/vortaxa/:investorId" element={<VortaxaDetails />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
