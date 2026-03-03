import useData from "./Generic/useData";

export interface BankDetail {
    id: number;
  bank_name: string;
  account_number: string;
  sort_code: string;
  is_default: boolean;
}

const useBanks = () => {
  return useData<BankDetail>('company/bank', {}, [])
}

export default useBanks