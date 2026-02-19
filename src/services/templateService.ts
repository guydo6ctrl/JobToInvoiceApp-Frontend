const API_BASE = "http://localhost:8000";

export const searchTemplates = async (searchText: string) => {
  const response = await fetch(
    `${API_BASE}/templates/?search=${searchText}`,
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
