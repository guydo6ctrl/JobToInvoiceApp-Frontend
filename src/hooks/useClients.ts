import useData from "./useData"

interface Client{
    
    name: string; 
    email: string;
    phone: string;
    address: string;
    
}

const useClients = () => {
  return useData<Client>('/clients/', {}, [])
}

export default useClients