import React, { useState, useEffect} from "react";
import './events.css'
import axios from 'axios';
import { add, endOfToday, set, setDate } from "date-fns";
import AddEventModal from "./Modals/AddEventModal";
import EditEventModal from "./Modals/EditEventModal";


function EventCrud(){
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEventId,  setSelectedEventId] = useState(null);
    const [editEvents, setEditEvents] = useState(null);
    const [eventsCategories, setEventsCategories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        loadEvents();
        loadEventsCateogries();
    }, [])

    async function loadEventsCateogries(){
        try{
            const response = await axios.get("http://localhost:5163/api/EventsCategory");
            setEventsCategories(response.data);
        }catch(error){
            console.error("Error loading categories of events", error);
        }
    }

    async function loadEvents(){
        try{
            const response = await axios.get("");
            setEvents(response.data);
        }catch(error){
            console.log("Error loading events", error)
        }
    }

    async function addEvent(event){
        event.preventDefault();
        try{
            const newEvent = {titulli, date, location, eventType, description, eventCategoryId};
            await axios.post("http://localhost:5163/api/Events", newEvent);

            await loadEvents();
            setShowModal(false);
            clearFormFields();
        }catch(error){
            console.log("Error while trying to add an Event", error);
        }
    }

    async function updateEvent(selectedEventId){
        try{
            await axios.put("http://localhost:5163/api/Events/{selectedEventId}", editEvents);

            await loadEvents();
            await loadEvents();
            setShowModal(false);
            clearFormFields();
        }catch(error){
            console.log("Error updating the event", error);
        }
    }

    async function deleteEvent(selectedEventId){
        try{
            await axios.delete("http://localhost:5163/api/Events/{selectedEventId}")

            await loadEvents();
        }catch(error){
            console.log("Error while trying to delete an Event", error)
        }
    }

    function handleUpdate(id){
        const selectedEvent = events.find((events) => events.id === id);
        setEditEvents(selectedEvent);
        setSelectedEventId(id);
        setIsEditing(true);
        setShowModal(true);
    }


    function handleUpdateCancel(){
        setEditEvents(null);
        setIsEditing(false);
        setSelectedEventId(null);
        setShowModal(false);
    }

    const openModal = () => {
      setIsEditing(false);
      setShowModal(true);
    };

    const clearFormFields = () => {
        setTitulli("");
        setDate("");
        setLocation("");
        setEventType("");
        setDescription("");
        setSelectedEventId(null);
    }


    return(
        <div className="container">
        <div className="action-container">
          <button className="btn btn-primary">
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>{event.location}</td>
                <td>{event.eventType}</td>
                <td>{event.description}</td>
                <td>{event.eventCategoryId}</td>
                <td>
                  <button onClick={() => handleUpdate(event.id)} className="edit-button">
                    Edit
                  </button>
                  <button onClick={() => deleteEvent(event.id)} className="delete-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && !isEditing && (
        <AddEventModal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          eventsCategories={eventsCategories}
          addEvent={addEvent}
        />
      )}
      {showModal && isEditing && (
        <EditEventModal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          event={updateEvent}
          eventsCategories={eventsCategories}
          updateEvent={updateEvent}
          handleCancel={handleEditCancel}
        />
      )}
    </div>
    );
}

export default  EventCrud;