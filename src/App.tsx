import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/General/ProtectedRoute";
import Layout from "./components/Global/Layout";
import InvoicesPage from "./pages/InvoicesPages/InvoicesPage";
import InvoicesListPage from "./pages/InvoicesPages/InvoicesListPage";
import InvoicesDetailPage from "./pages/InvoicesPages/InvoicesDetailPage";
import JobsPage from "./pages/JobsPages/JobsPage";
import JobsListPage from "./pages/JobsPages/JobsListPage";
import JobsDetailPage from "./pages/JobsPages/JobsDetailPage";
import QuotesPage from "./pages/QuotesPages/QuotesPage";
import QuotesListPage from "./pages/QuotesPages/QuotesListPage";
import QuotesDetailPage from "./pages/QuotesPages/QuotesDetailPage";
import ClientsPage from "./pages/ClientsPages/ClientsPage";
import ClientsListPage from "./pages/ClientsPages/ClientsListPage";
import ClientsDetailPage from "./pages/ClientsPages/ClientsDetailPage";
import CompanyPage from "./pages/CompanyPage";
import BankPage from "./pages/BankPage";

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

          <Route path="/company">
            <Route index element={<CompanyPage />} />
            <Route path="bank/all" element={<BankPage />} />
          </Route>

          <Route path="/clients">
            <Route index element={<ClientsPage />} />
            <Route path="all" element={<ClientsListPage />} />
            <Route path=":id" element={<ClientsDetailPage />} />
          </Route>

          <Route path="/quotes">
            <Route index element={<QuotesPage />} />
            <Route path="all" element={<QuotesListPage />} />{" "}
            <Route path=":id" element={<QuotesDetailPage />} />{" "}
          </Route>

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
