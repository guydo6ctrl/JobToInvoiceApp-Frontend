

export const searchTemplates = async (searchText: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/templates/?search=${searchText}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch templates");
  }

  return response.json();
};
