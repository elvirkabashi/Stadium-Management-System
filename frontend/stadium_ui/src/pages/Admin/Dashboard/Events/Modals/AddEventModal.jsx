import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../../../../components/LoadingSpinner";

Modal.setAppElement("#root");

function AddEventModal({ isOpen, onRequestClose }) {
  const [saveLoading, setSaveLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  const [titulli, setTitulli] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [eventType, setEventType] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [eventCategories, setEventCategories] = useState([]);
  const [eventCategoryId, setEventCategoryId] = useState("");

  useEffect(() => {
    const fetchEventCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/EventsCategory`);
        setEventCategories(response.data);
      } catch (error) {
        console.error("Error fetching event categories:", error);
      }
    };

    fetchEventCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setAddLoading(true);
      const newEvent = {
        titulli,
        date,
        location,
        eventType,
        description,
        status,
        eventCategoryId
      };

      await axios.post(`${import.meta.env.VITE_BASE_URL}api/Events`, newEvent);
      toast.success("Event added successfully!");
      onRequestClose();
      window.location.reload();
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("Failed to add event");
    } finally {
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
      <h2 className="modal-title">Add Event</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titulli">Title:</label>
            <input
              type="text"
              id="titulli"
              value={titulli}
              onChange={(e) => setTitulli(e.target.value)}
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
            <label htmlFor="eventType">Event Type:</label>
            <input
              type="text"
              id="eventType"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
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
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="InProgress">InProgress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="eventCategoryId">Category:</label>
            <select
              id="eventCategoryId"
              value={eventCategoryId}
              onChange={(e) => setEventCategoryId(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {eventCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.emri}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary" disabled={addLoading}>
            {addLoading ? <LoadingSpinner color={'text-primary'} /> : 'Add Event'}
          </button>
        </form>
      </div>
      <Toaster />
    </Modal>
  );
}

AddEventModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default AddEventModal;
