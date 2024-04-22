// AddProductModal.jsx
import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./AddEventModal.css";

Modal.setAppElement("#root"); 

function AddProductModal({ isOpen, onRequestClose }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventCategory, setEventCategory] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newEvent = { title, date, description, eventType, location, eventCategory };
      await axios.post("http://localhost:5163/api/Events", newEvent);
      onRequestClose(); 
    } catch (error) {
      console.error("Error creating event:", error);
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

      <h2 className="modal-title">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="title">Date:</label>
          <input type="text" id="date" value={date} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="title">Location:</label>
          <input type="text" id="location" value={location} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="company">Event Type:</label>
          <input type="text" id="eventType" value={eventType} onChange={(e) => setCompany(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="category">Event Category:</label>
          <input type="text" id="eventCategory" value={eventCategory} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
      </form>
    </Modal>
  );
}

export default AddProductModal;
