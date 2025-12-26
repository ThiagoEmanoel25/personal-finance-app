import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login, Register, Dashboard } from "./views";

// Componente simples para proteger rotas
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rota Privada: Dashboard */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Fallback para qualquer outra url -> Login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
