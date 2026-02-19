import useData from "./Generic/useData";

export interface Client{
    id: number;
    name: string; 
    email: string;
    phone: string;
    address: string;
}

const useClients = () => {
  return useData<Client>('/clients/', {}, [])
}

export default useClients