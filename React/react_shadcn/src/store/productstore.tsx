import { create } from "zustand";
import { Product } from "../type/product";
import { useGetProducts } from "../servieses/productService"; // Ensure this is correctly imported
import { useEffect } from "react";

type ProductStore = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  deleteProduct: (id: number) => void;
  addProduct: (product: Product) => void;
  setProducts: (products: Product[]) => void;
  fetchProducts: () => void;
};

export const useGetProductsStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  deleteProduct: (id: number) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    }));
  },

  addProduct: (product: Product) => {
    set((state) => ({
      products: [...state.products, product],
    }));
  },

  setProducts: (products: Product[]) => {
    set(() => ({
      products,
      isLoading: false,
      error: null,
    }));
  },

  fetchProducts: async () => {
    const { data: products, isLoading, error } = getProducts();
    if (isLoading) set(() => ({ isLoading: true }));
    if (error) set(() => ({ error: "Failed to load products." }));
    if (products) set(() => ({ products }));
  },
}));

// Hook to fetch products when the component mounts
export const useFetchProducts = () => {
  const fetchProducts = useGetProductsStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
};
