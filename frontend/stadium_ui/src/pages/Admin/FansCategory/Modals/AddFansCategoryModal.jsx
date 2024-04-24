import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import axios from "axios";
import "./AddFansCategoryModal.css";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from '../../../../components/LoadingSpinner';

Modal.setAppElement("#root");

function AddFansCategoryModal({ isOpen, onRequestClose }) {

  const [saveLoading,setSaveLoading] = useState(false)
  const [addLoading,setAddLoading] = useState(false)

  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setAddLoading(true);
      const newFans = {
        name
      };


        await axios.post("http://localhost:5163/api/FansCategory", newFans);
        onRequestClose();
        window.location.reload();

    } catch (error) {
      console.error("Error creating fans category:", error);
      toast.error("Failed to add fans category");
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
      <h2 className="modal-title">Add Fans Category</h2>
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

AddFansCategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default AddFansCategoryModal;
