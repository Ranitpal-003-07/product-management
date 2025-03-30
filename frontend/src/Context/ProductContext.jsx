/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Add Product
  const addProduct = async (productData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/products", productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts([...products, res.data]);
    } catch (err) {
      console.error("Failed to add product", err);
    }
  };

  // Update Product
  const updateProduct = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`http://localhost:5000/api/products/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(products.map((p) => (p._id === id ? res.data : p)));
    } catch (err) {
      console.error("Failed to update product", err);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
