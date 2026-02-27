import useData from "./Generic/useData";

export interface Company {
  name: string;
  email: string;
  phone: string;
  address_line: string;
  town_or_city: string;
  postcode: string;
  country: string;
}

const useCompany = () => {
  return useData<Company>('clients/', {}, [])
}

export default useCompany