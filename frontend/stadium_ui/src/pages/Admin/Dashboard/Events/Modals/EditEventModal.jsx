import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../../../../components/LoadingSpinner";

Modal.setAppElement("#root");

function EditEventModal({ isOpen, onRequestClose, event, categories }) {
  const [saveLoading, setSaveLoading] = useState(false);
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [date, setDate] = useState(event.date);
  const [location, setLocation] = useState(event.location);
  const [categoryId, setCategoryId] = useState(event.categoryId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaveLoading(true);
      const updatedEvent = { ...event, title, description, date, location, categoryId };
      await axios.put(`${import.meta.env.VITE_BASE_URL}api/Events/${event.id}`, updatedEvent);
      toast.success("Event updated successfully!");
      onRequestClose();
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event");
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          padding: "30px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "500px",
          height: "500px",
        },
      }}
    >
      <h2 className="modal-title">Edit Event</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary">
              {saveLoading ? <LoadingSpinner color="text-primary" /> : "Update"}
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </Modal>
  );
}

export default EditEventModal;
