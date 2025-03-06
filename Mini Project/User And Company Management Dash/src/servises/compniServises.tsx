import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../servises/api";
import useCompanyStore from "../stores/companieStore";
const fetchAll = async () => {
  const response = await api.get("/companies");
  return response.data;
};

export const useCompanies = () => {
  const { companies, setCompanies } = useCompanyStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["usersWithRoles"],
    queryFn: fetchAll,
  });

  useEffect(() => {
    if (data) {
      setCompanies(data);
    }
  }, [data, setCompanies]);
  console.log(data);

  return { companies, isLoading, error };
};
