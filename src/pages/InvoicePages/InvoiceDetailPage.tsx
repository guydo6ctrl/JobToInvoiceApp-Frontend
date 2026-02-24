import { useParams } from "react-router-dom";
import useInvoice from "../../hooks/useInvoice";

const InvoiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: invoices, isLoading, error } = useInvoice();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading invoice</p>;

  const invoice = invoices?.find((inv) => inv.id === Number(id));
  if (!invoice) return <p>Invoice not found</p>;

  return (
    <div>
      <h2>Invoice #{invoice.id}</h2>
      <p>Client: {invoice.client.name}</p>
      <p>Job: {invoice.job_id}</p>
      <p>Status: {invoice.status}</p>
      <p>Issue Date: {invoice.issue_date}</p>
      <p>Due Date: {invoice.due_date}</p>
      {/* Add line items, buttons, etc. */}
    </div>
  );
};

export default InvoiceDetailPage;
