import useClients from "../hooks/useClients";

const ClientsList = () => {
  const { data, isLoading, error } = useClients();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading clients</p>;
  if (!data || data.length === 0) return <p>No clients found</p>;

  return (
    <ul>
      {data.map(client => (
        <li key={client.id}>
          {client.name} - {client.email}
        </li>
      ))}
    </ul>
  );
};

export default ClientsList;
