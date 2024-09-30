import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import axios from "axios";
import "./AddGroupModal.css";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from '../../../../components/LoadingSpinner';

Modal.setAppElement("#root");

function AddGroupModal({ isOpen, onRequestClose }) {

  const [saveLoading,setSaveLoading] = useState(false)
  const [addLoading,setAddLoading] = useState(false)

  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setAddLoading(true);
      const newGroup = {
        groupName,
        description
      };


      await axios.post(`http://localhost:50473/api/Group`, newGroup);
        onRequestClose();
        window.location.reload();

    } catch (error) {
      console.error("Error creating group:", error);
      toast.error("Failed to add group");
    }finally{
      setAddLoading(false);
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
          maxWidth: "550px",
          height: "700px",
        },
      }}
    >
      <h2 className="modal-title">Add Group</h2>
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
            <input
              type="text"
              id="title"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
         
          </div>
          <Toaster />
        <div className="modal-footer mt-4">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              {addLoading ? <LoadingSpinner color={'text-primary'}/> : 'Add'}
            </button>
        </div>
      </div>
    </Modal>
  );
}

AddGroupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default AddGroupModal;
