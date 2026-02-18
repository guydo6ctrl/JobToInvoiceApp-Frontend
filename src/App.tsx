import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/General/ProtectedRoute";
import Layout from "./components/Global/Layout";
import ClientsPage from "./pages/ClientsPage";
import JobsPage from "./pages/JobsPage";
import InvoicePage from "./pages/InvoicePage";
import QuotesPage from "./pages/QuotesPage";

function Logout(): JSX.Element {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout(): JSX.Element {
  localStorage.clear();
  return <Register />;
}

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes (no navbar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes (with navbar) */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/invoices" element={<InvoicePage />} />
          <Route path="/quotes" element={<QuotesPage />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
