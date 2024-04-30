import { useState, useEffect } from "react";
import axios from "axios";
import AddEventModal from "./Modals/AddEventModal";
import EditEventModal from "./Modals/EditEventModal";
import "./events.css";

function EventCrud() {
  const [events, setEvents] = useState([]);
  const [eventCategories, setEventCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadEvents();
    loadEventCategories();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5163/api/Events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error loading events:", error);
    }
  };

  const loadEventCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5163/api/EventsCategory");
      setEventCategories(response.data);
    } catch (error) {
      console.error("Error loading event categories:", error);
    }
  };

  const handleAddEvent = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsEditing(true);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedEvent(null);
    setIsEditing(false);
    setShowEditModal(false);
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5163/api/Events/${id}`);
      await loadEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="container">
      <div className="action-container">
        <button onClick={handleAddEvent} className="btn btn-primary">
          Add Event
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Location</th>
            <th>Event Type</th>
            <th>Description</th>
            <th>Status</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.titulli}</td>
              <td>{event.date}</td>
              <td>{event.location}</td>
              <td>{event.eventType}</td>
              <td>{event.description}</td>
              <td>{event.status}</td>
              <td>{event.eventCategory}</td>
              <td>
                <button onClick={() => handleEditEvent(event)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDeleteEvent(event.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddEventModal
        isOpen={showAddModal}
        onRequestClose={handleCloseAddModal}
        eventCategories={eventCategories}
        loadEvents={loadEvents}
      />
      {selectedEvent && (
        <EditEventModal
          isOpen={showEditModal}
          onRequestClose={handleCloseEditModal}
          event={selectedEvent}
          eventCategories={eventCategories}
          loadEvents={loadEvents}
        />
      )}
    </div>
  );
}

export default EventCrud;
