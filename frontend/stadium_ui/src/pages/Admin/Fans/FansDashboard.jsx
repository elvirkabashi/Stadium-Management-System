import React, { useState, useEffect } from "react";
import axios from "axios";
import AddFansModal from "./Modals/AddFansModal";
import EditFansModal from "./Modals/EditFansModal";
import "./FansDashboard.css";

function FansDashboard() {
  const [fans, setFans] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFans, setSelectedFans] = useState(null);
  const [, setIsEditing] = useState(false);

  useEffect(() => {
    loadFans();
  }, []);

  const loadFans = async () => {
    try {
      const response = await axios.get("http://localhost:5163/api/Fans");
      setFans(response.data);
    } catch (error) {
      console.error("Error loading fans:", error);
    }
  };

  const handleAddFans = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleEditFans = (fans) => {
    setSelectedFans(fans);
    setIsEditing(true);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedFans(null);
    setIsEditing(false);
    setShowEditModal(false);
  };

  const handleDeleteFans = async (id) => {
    try {
      await axios.delete(`http://localhost:5163/api/Fans/${id}`);
      await loadFans();
    } catch (error) {
      console.error("Error deleting fans:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">FANS</h1>
      <div className="title-line"></div>
      <div className="action-container">
        <button onClick={handleAddFans} className="btn btn-primary">
          Add Fans
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Nr.</th> {/* Numri i rreshtave */}
            <th>Title</th>
            <th>Title Description</th>
            <th>Price Description</th>
            <th>Price €</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fans.map((fans, index) => (
            <tr key={fans.id}>
              <td>{index + 1}</td> {/* Numri i rreshtit */}
              <td>{fans.title}</td>
              <td>{fans.titleDescription}</td>
              <td>{fans.priceDescription}</td>
              <td>{fans.price}€</td>
              <td>{fans.description}</td>
              <td style={{ padding: "0", textAlign: "center" }}>
              <img src={fans.imageUrl} style={{ height: "60px", width: "auto" }}/>
              </td>
              <td>
                <button onClick={() => handleEditFans(fans)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDeleteFans(fans.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddFansModal isOpen={showAddModal} onRequestClose={handleCloseAddModal} loadFans={loadFans} />
      {selectedFans && (
        <EditFansModal isOpen={showEditModal} onRequestClose={handleCloseEditModal} fans={selectedFans} loadFans={loadFans} />
      )}
    </div>
  );
}

export default FansDashboard;
