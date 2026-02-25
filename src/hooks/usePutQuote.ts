import React from 'react'
import usePutData from './Generic/usePutData'
import { LineItem } from '../components/QuotesPageComponents/LineItemsInput';

export interface EditQuotePayload {
  client_id: number;
  description: string;
  issue_date: string;
  expiry_date: string;
  line_items: LineItem[];
  status: "draft" | "sent" | "accepted" | "rejected"; 
}

function usePutQuote(onSuccess?: () => void) {
    return usePutData<EditQuotePayload>({ endpoint: "quotes", ...(onSuccess && { onSuccess }) });
}

export default usePutQuote