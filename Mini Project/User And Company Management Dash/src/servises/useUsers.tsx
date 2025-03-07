import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../servises/api";
import useUserStore from "../stores/userStore";

const fetchAll = async () => {
  const [rolesRes, usersRes] = await Promise.all([
    api.get("/roles"),
    api.get("/users"),
  ]);

  const roles = rolesRes.data;
  let roleIndex = 0;

  const users = usersRes.data.map((user: any) => {
    const assignedRole = roles[roleIndex];
    roleIndex = (roleIndex + 1) % roles.length;

    return { ...user, role: assignedRole };
  });

  return { users };
};

export const useUsers = () => {
  const { users, setUsers } = useUserStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ["usersWithRoles"],
    queryFn: fetchAll,
  });

  useEffect(() => {
    if (data?.users && users.length === 0) {
      setUsers(data.users);
    }
  }, [data, setUsers]);

  return { users, isLoading, error };
};
