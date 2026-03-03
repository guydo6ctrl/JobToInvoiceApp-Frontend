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

// types/company.ts

export interface CompanyFormData {
  name: string;
  email: string;
  phone: string;
  payment_instructions: string;
  quote_terms: string;
  is_vat_registered: boolean;
  address_line: string;
  town_or_city: string;
  postcode: string;
  country: string;
}

export interface CompanyFormStep {
  label: string;
  fields: (keyof CompanyFormData)[];
}

export const defaultCompanyFormData: CompanyFormData = {
  name: "",
  email: "",
  phone: "",
  payment_instructions: "",
  quote_terms: "",
  is_vat_registered: true,
  address_line: "",
  town_or_city: "",
  postcode: "",
  country: "United Kingdom",
};

export const onboardingSteps: CompanyFormStep[] = [
  {
    label: "Business Info",
    fields: ["name", "payment_instructions", "quote_terms", "is_vat_registered"],
  },
  {
    label: "Contact",
    fields: ["email", "phone"],
  },
  {
    label: "Address",
    fields: ["address_line", "town_or_city", "postcode", "country"],
  },
];

