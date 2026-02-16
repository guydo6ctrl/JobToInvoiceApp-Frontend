import useQuotes from "../hooks/useQuotes";

const QuotesList = () => {
  const { data, isLoading, error } = useQuotes();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading quotes</p>;
  if (!data || data.length === 0) return <p>No quotes found</p>;

  return (
    <ul>
      {data.map((quote) => (
        <li key={quote.id}>{quote.job_id}</li>
      ))}
    </ul>
  );
};

export default QuotesList;
