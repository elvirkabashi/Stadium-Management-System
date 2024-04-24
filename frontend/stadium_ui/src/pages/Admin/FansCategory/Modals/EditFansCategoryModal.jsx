import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import axios from "axios";
import "./EditFansCategoryModal.css";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from '../../../../components/LoadingSpinner';

Modal.setAppElement("#root");

function EditFansCategoryModal({ isOpen, onRequestClose, fansCategory }) {
  const [name, setName] = useState(fansCategory.name);

  const [isLoading, setIsLoading] = useState(false);
  const [saveLoading,setSaveLoading] = useState(false)


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const updatedFansCategory = {
        id: fansCategory.id,
        name
      };

      await axios.put(`http://localhost:5163/api/FansCategory/${fansCategory.id}`, updatedFansCategory);
      toast.success(`Fans Category updated successfully`);
      location.href = "/"
      setIsLoading(false);  
    } catch (error) {
      console.error("Error updating fans category:", error);
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
          height: "700px",
        },
      }}
    >
      <h2 className="modal-title">Edit Fans Category</h2>
      <div>
        <div className="d-flex gap-3">
          <div className="form-group">
            <label htmlFor="title">Name:</label>
            <input
              type="text"
              id="title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary" disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
        <Toaster/>
      </div>
    </Modal>
  );
}

EditFansCategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  fansCategory: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default EditFansCategoryModal;
