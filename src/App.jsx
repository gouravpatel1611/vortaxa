import { AuthProvider } from "./context/AuthContext";
import { VortaxaProvider } from "./context/VortaxaContext";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <VortaxaProvider>
        <AppRoutes />
      </VortaxaProvider>
    </AuthProvider>
  );
}
