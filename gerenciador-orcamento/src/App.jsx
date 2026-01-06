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
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
            className: 'dark:bg-gray-800 dark:text-white',
            // Default styling for light mode is usually fine, but let's make it neutral to work on both or rely on className if supported by library properly.
            // React Hot Toast 'style' prop overrides deeply, so let's stick to a neutral dark/light safe style or just use the defaults which are white/black.
            // A better approach is often letting the library handle it or forcing a specific look.
            // Let's use a conditional style or just 'class' if the library supports it well (it accepts className).
          }}
        />
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
