export interface DashboardStats {
  outstanding_amount: number;
  overdue_amount: number;
  overdue_count: number;
  open_quotes: number;
  active_jobs: number;
  total_invoiced_month: number;
}

export interface RecentInvoice {
  id: number;
  number: string;
  client_name: string;
  total_due: number;
  status: string;
  status_display: string;
  due_date: string;
}

export interface RecentQuote {
  id: number;
  number: string;
  client_name: string;
  quote_total: number;
  status: string;
  status_display: string;
  expiry_date: string;
}

export interface AlertInterface {
  type: "overdue" | "expiring" | "unbilled";
  message: string;
  id: number;
  link: string;
}