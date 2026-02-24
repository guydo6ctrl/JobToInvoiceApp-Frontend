import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/General/ProtectedRoute";
import Layout from "./components/Global/Layout";
import ClientsPage from "./pages/ClientsPage";
import QuotesPage from "./pages/QuotesPage";
import JobsDetailPage from "./pages/JobsPages/JobsDetailPage";
import InvoicesPage from "./pages/InvoicesPages/InvoicesPage";
import InvoicesListPage from "./pages/InvoicesPages/InvoicesListPage";
import InvoicesDetailPage from "./pages/InvoicesPages/InvoicesDetailPage";
import JobsPage from "./pages/JobsPages/JobsPage";
import JobsListPage from "./pages/JobsPages/JobsListPage";

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

          <Route path="/jobs">
            <Route index element={<JobsPage />} />
            <Route path="all" element={<JobsListPage />} />{" "}
            <Route path=":id" element={<JobsDetailPage />} />{" "}
          </Route>

          <Route path="/invoices">
            <Route index element={<InvoicesPage />} />
            <Route path="all" element={<InvoicesListPage />} />{" "}
            <Route path=":id" element={<InvoicesDetailPage />} />{" "}
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
