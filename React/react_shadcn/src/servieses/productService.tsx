import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "./api";
import { Product } from "../type/product";

export const useGetProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await API.get<Product[]>("/products");
      return response.data;
    },
  });
};
