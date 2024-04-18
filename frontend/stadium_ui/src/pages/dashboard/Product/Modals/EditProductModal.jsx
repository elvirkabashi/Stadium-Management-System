// EditProductModal.jsx
import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./EditProductModal.css";

Modal.setAppElement("#root"); 

function EditProductModal({ isOpen, onRequestClose, product, onSubmit, categories }) {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [company, setCompany] = useState(product.company);
  const [price, setPrice] = useState(product.price);
  const [categoryId, setCategoryId] = useState(product.categoryId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedProduct = { id: product.id, title, description, company, price, categoryId };
      await axios.put(`http://localhost:5163/api/Products/${product.id}`, updatedProduct);
      onSubmit(updatedProduct); 
      onRequestClose(); 
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={{
      content: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '30px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '500px',
        height:'700px'
      }
    }}
  >
      <h2 className="modal-title">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company:</label>
          <input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="categoryId">Category:</label>
          <select id="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary">Update</button>
        </div>
      </form>
    </Modal>
  );
}

export default EditProductModal;
