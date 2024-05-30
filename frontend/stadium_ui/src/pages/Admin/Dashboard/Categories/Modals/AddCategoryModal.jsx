import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

Modal.setAppElement("#root");

function AddCategoryModal({ isOpen, onRequestClose, loadCategories }) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await axios.post(`${import.meta.env.VITE_BASE_URL}api/Categories`, { name });
      onRequestClose();
      loadCategories();
      toast.success("Category added successfully");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
    } finally {
      setIsLoading(false);
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
        },
      }}
    >
      <h2 className="modal-title">Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
      <Toaster />
    </Modal>
  );
}

AddCategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
};

export default AddCategoryModal;
