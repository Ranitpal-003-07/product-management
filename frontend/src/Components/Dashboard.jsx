/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Dashboard.css";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    rating: "",
    description: "", // ✅ Added description field
    img: "placeholder.jpg",
  });
  

  // 🔹 Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // 🔹 Add a new product
  const handleAddProduct = async () => {
    if (!newProduct.description.trim()) {
      alert("Description is required!");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/products", newProduct, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts([...products, response.data]);
      setIsAddFormOpen(false);
      setNewProduct({ name: "", category: "", price: "", rating: "", description: "", img: "placeholder.jpg" });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  

  // 🔹 Edit a product
  const handleEditClick = (product) => {
    setEditProduct({ ...product });
  };

  // 🔹 Update an existing product
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/products/${editProduct._id}`, editProduct, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(products.map((prod) => (prod._id === editProduct._id ? response.data : prod)));
      setEditProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // 🔹 Delete a product
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(products.filter((prod) => prod._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // 🔹 Handle Input Changes
  const handleInputChange = (e, setter) => {
    setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 🔹 Filter & Sorting Logic
  const filteredProducts = products
    .filter((product) =>
      searchTerm
        ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    )
    .filter((product) => (category ? product.category.toLowerCase().includes(category.toLowerCase()) : true))
    .filter((product) => (minPrice ? product.price >= parseFloat(minPrice) : true))
    .filter((product) => (maxPrice ? product.price <= parseFloat(maxPrice) : true))
    .filter((product) => (minRating ? product.rating >= parseFloat(minRating) : true));

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-high") return b.price - a.price;
    if (sortOption === "price-low") return a.price - b.price;
    if (sortOption === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="products-container">
      {/* Top Section */}
      <div className="products-header">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <button className="filter-btn" onClick={() => setIsFilterOpen(true)}>
          <i className="fas fa-sliders-h"></i> Filter
        </button>

        {/* Filter Popup */}
        {isFilterOpen && (
          <div className="filter-popup-overlay">
            <div className="filter-popup">
              <h3>Filter Products</h3>

              <label>Category:</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter category" />

              <label>Min Price:</label>
              <div className="price-inputs">
                <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min price" />
                <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max price" />
              </div>

              <label>Min Rating:</label>
              <input type="number" value={minRating} onChange={(e) => setMinRating(e.target.value)} placeholder="Min rating" />

              <div className="filter-actions">
                <button className="apply-btn" onClick={() => setIsFilterOpen(false)}>✅ Apply</button>
                <button className="close-btn" onClick={() => setIsFilterOpen(false)}>❌ Close</button>
              </div>
            </div>
          </div>
        )}

        <div className="sort-dropdown">
          <button className="sort-btn">Sort By ▼</button>
          <div className="dropdown-content">
            <p onClick={() => setSortOption("price-high")}>💰 Price: High to Low</p>
            <p onClick={() => setSortOption("price-low")}>💲 Price: Low to High</p>
            <p onClick={() => setSortOption("rating")}>⭐ Rating</p>
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <button className="add-btn" onClick={() => setIsAddFormOpen(true)}>Add Item</button>

      {/* Product Cards */}
      <div className="product-grid">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <div className="product-card" key={product._id}>
              <img src={product.img} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <p className="price">$ {product.price}</p>
              <p className="rating">⭐ {product.rating}</p>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleEditClick(product)}>✏️ Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteProduct(product._id)}>🗑️ Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No products match your criteria.</p>
        )}
      </div>

      {/* Edit Product Form */}
      {editProduct && (
        <div className="edit-form-container">
          <div className="edit-form">
            <h3>Edit Product</h3>
            <input type="text" name="name" value={editProduct.name} onChange={(e) => handleInputChange(e, setEditProduct)} />
<input type="text" name="category" value={editProduct.category} onChange={(e) => handleInputChange(e, setEditProduct)} />
<input type="number" name="price" value={editProduct.price} onChange={(e) => handleInputChange(e, setEditProduct)} />
<input type="number" name="rating" value={editProduct.rating} onChange={(e) => handleInputChange(e, setEditProduct)} />
<input
  type="text"
  name="description"
  value={editProduct.description}
  onChange={(e) => handleInputChange(e, setEditProduct)}
/>
            <button className="save-btn" onClick={handleSaveEdit}>💾 Save</button>
            <button className="cancel-btn" onClick={() => setEditProduct(null)}>❌ Cancel</button>
          </div>
        </div>
      )}

      {/* Add Product Form */}
      {isAddFormOpen && (
        <div className="add-form-container">
          <div className="add-form">
            <h3>Add New Product</h3>
            <input type="text" name="name" value={newProduct.name} onChange={(e) => handleInputChange(e, setNewProduct)} placeholder="Name" />
<input type="text" name="category" value={newProduct.category} onChange={(e) => handleInputChange(e, setNewProduct)} placeholder="Category" />
<input type="number" name="price" value={newProduct.price} onChange={(e) => handleInputChange(e, setNewProduct)} placeholder="Price" />
<input type="number" name="rating" value={newProduct.rating} onChange={(e) => handleInputChange(e, setNewProduct)} placeholder="Rating" />
<input
  type="text"
  name="description"
  value={newProduct.description}
  onChange={(e) => handleInputChange(e, setNewProduct)}
  placeholder="Description"
/>

            <button className="save-btn" onClick={handleAddProduct}>✅ Add</button>
            <button className="cancel-btn" onClick={() => setIsAddFormOpen(false)}>❌ Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
