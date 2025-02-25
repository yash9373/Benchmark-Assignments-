import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// ✅ Define Product Type
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

// ✅ Define Context Type
type ProductContextType = {
  products: Product[];
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  editProduct: (updatedProduct: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
};

// ✅ Create Context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  // ✅ Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch when the component mounts
  }, []);

  // ✅ Add a product
  const addProduct = async (product: Product) => {
    try {
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        product
      );
      const newProduct = { ...product, id: response.data.id };

      setProducts((prev) => [...prev, newProduct]); // Update state
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // ✅ Edit a product
  const editProduct = async (updatedProduct: Product) => {
    try {
      await axios.put(
        `https://fakestoreapi.com/products/${updatedProduct.id}`,
        updatedProduct
      );

      setProducts((prev) =>
        prev.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // ✅ Delete a product
  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        fetchProducts,
        addProduct,
        editProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// ✅ Custom Hook for using ProductContext
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
