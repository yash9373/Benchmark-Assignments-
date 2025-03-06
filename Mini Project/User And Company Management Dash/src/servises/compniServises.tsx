import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../servises/api";
import useCompanyStore from "../stores/companieStore";

const fetchAll = async () => {
  const response = await api.get("/companies");
  return response;
};

export const useCompanies = () => {
  const { companies, setCompanies } = useCompanyStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["usersWithRoles"],
    queryFn: fetchAll,
  });

  useEffect(() => {
    if (data?.data && companies.length === 0) {
      setCompanies(data.data);
    }
  }, [data, setCompanies]);
  console.log("this is the data " + data);
  console.log("this is the como" + companies);
  return { companies, isLoading, error };
};
