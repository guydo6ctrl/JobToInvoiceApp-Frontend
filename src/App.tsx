import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/General/ProtectedRoute";
import Layout from "./components/Global/Layout";
import ClientsPage from "./pages/ClientsPage";
import JobsPage from "./pages/JobsPage";
import InvoicePage from "./pages/InvoicePages/InvoicePage";
import QuotesPage from "./pages/QuotesPage";
import InvoiceDetailPage from "./pages/InvoicePages/InvoiceDetailPage";
import InvoiceListPage from "./pages/InvoicePages/InvoiceListPage";

// Quote/Job/Invoice status workflow — Draft → Sent → Accepted → Complete
// Basic reporting/dashboard — Show totals (revenue, pending invoices, etc.)
// PDF export — Generate PDF quotes/invoices

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
          <Route path="/quotes" element={<QuotesPage />} />

          <Route path="/invoices">
            <Route index element={<InvoicePage />} /> {/* /invoices */}
            <Route path="all" element={<InvoiceListPage />} />{" "}
            {/* /invoices/all */}
            <Route path=":id" element={<InvoiceDetailPage />} />{" "}
            {/* /invoices/:id */}
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
