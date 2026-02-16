import useData from "./useData"

interface Client{
    id: number;
    name: string; 
    email: string;
    phone: string;
    address: string;
    user_id: number;
}

const useClients = () => {
  return useData<Client>('/clients/', {}, [])
}

export default useClients