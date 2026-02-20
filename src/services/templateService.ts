import api from "./api";

export const searchTemplates = async (searchText: string) => {
  const { data } = await api.get("/templates/", {
    params: { search: searchText },
  });

  return data;
};