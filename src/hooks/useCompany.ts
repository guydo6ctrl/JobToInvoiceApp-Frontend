import useData from "./Generic/useData";

export interface Company {
  id: number;
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

const useCompany = () => {
  return useData<Company>('company/details', {}, [])
}

export default useCompany