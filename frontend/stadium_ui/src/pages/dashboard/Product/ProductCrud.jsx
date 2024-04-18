import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductCrud.css";
import AddProductModal from "./Modals/AddProductModal";
import EditProductModal from "./Modals/EditProductModal";

function ProductCrud() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false); 

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const response = await axios.get("http://localhost:5163/api/Categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  }

  async function loadProducts() {
    try {
      const response = await axios.get("http://localhost:5163/api/Products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const newProduct = { title, description, company, price, categoryId };
      if (isEditing && selectedProductId) {
        await axios.put(`http://localhost:5163/api/Products/${selectedProductId}`, newProduct);
      } else {
        await axios.post("http://localhost:5163/api/Products", newProduct);
      }
      await loadProducts();
      setShowModal(false);
      clearFormFields();
    } catch (error) {
      console.error("Error creating or updating product:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:5163/api/Products/${id}`);
      await loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  function handleEdit(id) {
    const selectedProduct = products.find((product) => product.id === id);
    setEditProduct(selectedProduct);
    setSelectedProductId(id);
    setIsEditing(true); 
    setShowModal(true); 
  }

  function handleEditCancel() {
    setEditProduct(null);
    setIsEditing(false); 
    setSelectedProductId(null);
    setShowModal(false); 
  }

  const openModal = () => {
    setIsEditing(false);
    setShowModal(true);
  };

  const clearFormFields = () => {
    setTitle("");
    setDescription("");
    setCompany("");
    setPrice("");
    setCategoryId("");
    setSelectedProductId(null);
  };

  return (
    <div className="container">
      <div className="action-container">
        <button onClick={openModal} className="btn btn-primary">
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
              <td>{product.categoryId}</td>
              <td>
                <button onClick={() => handleEdit(product.id)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDelete(product.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && !isEditing && (
        <AddProductModal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          categories={categories}
          handleSubmit={handleSubmit}
        />
      )}
      {showModal && isEditing && (
        <EditProductModal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          product={editProduct}
          categories={categories}
          handleSubmit={handleSubmit}
          handleCancel={handleEditCancel}
        />
      )}
    </div>
  );
}

export default ProductCrud;
