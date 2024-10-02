import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import axios from "axios";
import "./EditGroupModal.css";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from '../../../../components/LoadingSpinner';

Modal.setAppElement("#root");

function EditGroupModal({ isOpen, onRequestClose, group }) {
  const [groupName, setGroupName] = useState(group.groupName);
  const [description, setDescription] = useState(group.description);

  const [isLoading, setIsLoading] = useState(false);
  const [saveLoading,setSaveLoading] = useState(false)


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const updatedGroup = {
        id: group.id,
        groupName,
        description
      };

      await axios.put(`${import.meta.env.VITE_BASE_URL}api/Group/${group.id}`, updatedGroup);
      toast.success(`Group updated successfully`);
      location.href = "/"
      setIsLoading(false);  
    } catch (error) {
      console.error("Error updating group:", error);
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
      <h2 className="modal-title">Edit Group</h2>
      <div>
        <div className="d-flex gap-3">
          <div className="form-group">
            <label htmlFor="title">Group name:</label>
            <input
              type="text"
              id="title"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
            <label htmlFor="title">Description:</label>
            <input
              type="text"
              id="title"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

EditGroupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  group: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default EditGroupModal;
