import useData from "./Generic/useData";

export interface Client{
    id: number;
    name: string; 
    email: string;
    phone: string;
    address: string;
    archived: boolean;
}

const useClients = (showArchived: boolean) => {
  return useData<Client>('clients/', {params: {archived: showArchived}}, [showArchived])
}

export default useClients