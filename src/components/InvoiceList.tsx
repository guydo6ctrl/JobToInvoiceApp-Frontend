import React from "react";
import useInvoice from "../hooks/useInvoice";

const InvoiceList = () => {
  const { data, isLoading, error } = useInvoice();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading invoices</p>;
  if (!data || data.length === 0) return <p>No invoices found</p>;

  return (
    <ul>
      {data.map((invoice) => (
        <li key={invoice.id}>{invoice.job_id}</li>
      ))}
    </ul>
  );
};

export default InvoiceList;
