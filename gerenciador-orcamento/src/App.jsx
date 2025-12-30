import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { Login, Register, Dashboard, Profile, Badges } from "./views";
import Layout from "./components/Layout";

// Componente simples para proteger rotas
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" />;
};

import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rota Privada: Layout Principal */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            {/* Sub-rotas */}
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="badges" element={<Badges />} />
          </Route>

          {/* Fallback para qualquer outra url -> Login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
