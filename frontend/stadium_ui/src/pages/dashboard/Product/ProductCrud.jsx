import { useState, useEffect } from "react";
import axios from "axios";
import AddProductModal from "./Modals/AddProductModal";
import EditProductModal from "./Modals/EditProductModal";
import "./ProductCrud.css";

function ProductCrud() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [, setIsEditing] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5163/api/Products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5163/api/Categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const handleAddProduct = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedProduct(null);
    setIsEditing(false);
    setShowEditModal(false);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5163/api/Products/${id}`);
      await loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container">
      <div className="action-container">
        <button onClick={handleAddProduct} className="btn btn-primary">
          Add Product
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Company</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.company}</td>
              <td>{product.price}</td>
              <td>{product.category.name}</td>
              <td>
                <button onClick={() => handleEditProduct(product)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDeleteProduct(product.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddProductModal
        isOpen={showAddModal}
        onRequestClose={handleCloseAddModal}
        categories={categories}
        loadProducts={loadProducts}
      />
      {selectedProduct && (
        <EditProductModal
          isOpen={showEditModal}
          onRequestClose={handleCloseEditModal}
          product={selectedProduct}
          categories={categories}
          loadProducts={loadProducts}
        />
      )}
    </div>
  );
}

export default ProductCrud;
