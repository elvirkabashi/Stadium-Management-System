// EditProductModal.jsx
import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./EditEventModal.css";

Modal.setAppElement("#root"); 

function EditProductModal({ isOpen, onRequestClose, event, onSubmit, eventCategory }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventCategoryId, setEventCategoryId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedEvent = { id: event.id, title, date, eventType, description, location, eventCategoryId };
      await axios.put(`http://localhost:5163/api/Events/${event.id}`, updatedEvent);
      onSubmit(updatedEvent); 
      onRequestClose(); 
    } catch (error) {
      console.error("Error updating event:", error);
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
          <label htmlFor="title">Date:</label>
          <input type="text" id="date" value={date} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="title">Location:</label>
          <input type="text" id="location" value={location} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="title">Event Type:</label>
          <input type="text" id="eventType" value={eventType} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="eventCategoryId">Event Category:</label>
          <select id="eventCategoryId" value={eventCategoryId} onChange={(e) => setCategoryId(e.target.value)} required>
            <option value="">Select Category</option>
            {eventCategory.map((eventCategory) => (
              <option key={eventCategory.id} value={eventCategory.id}>
                {eventCategory.name}
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
