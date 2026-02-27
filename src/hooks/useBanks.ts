import useData from "./Generic/useData";

interface Bank {
    id: number;
  bank_name: string;
  account_number: string;
  sort_code: string;
  payment_instructions: string;
  is_default: boolean;
}

const useBanks = () => {
  return useData<Bank>('company/bank', {}, [])
}

export default useBanks