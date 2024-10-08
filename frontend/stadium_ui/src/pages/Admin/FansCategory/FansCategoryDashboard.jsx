import { useState, useEffect } from "react";
import axios from "axios";
import AddFansCategoryModal from "./Modals/AddFansCategoryModal";
import EditFansCategoryModal from "./Modals/EditFansCategoryModal";
import "./FansCategoryDashboard.css";
import { Link } from "react-router-dom";


function FansCategoryDashboard() {
  const [fansCategory, setFansCategory] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFansCategory, setSelectedFansCategory] = useState(null);
  const [, setIsEditing] = useState(false);

  useEffect(() => {
    loadFansCategory();
  }, []);


  const loadFansCategory = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/FansCategory`);
      setFansCategory(response.data);
    } catch (error) {
      console.error("Error loading fans categories:", error);
    }
  };

  const handleAddFansCategory = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleEditFansCategory = (fansCategory) => {
    setSelectedFansCategory(fansCategory);
    setIsEditing(true);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedFansCategory(null);
    setIsEditing(false);
    setShowEditModal(false);
  };

  const handleDeleteFansCategory = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}api/FansCategory/${id}`);
      await loadFansCategory();
    } catch (error) {
      console.error("Error deleting Fans Category:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">FANS CATEGORY</h1>
      <div className="title-line"></div>
      <div className="action-container">
        <button onClick={handleAddFansCategory} className="btn btn-primary">
          Add Fans Category
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fansCategory.map((fansCategory) => (
            <tr key={fansCategory.id}>
              <td>{fansCategory.name}</td>
              <td>
                <button onClick={() => handleEditFansCategory(fansCategory)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDeleteFansCategory(fansCategory.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddFansCategoryModal
        isOpen={showAddModal}
        onRequestClose={handleCloseAddModal}
        loadFansCategory={loadFansCategory}
      />
      {selectedFansCategory && (
        <EditFansCategoryModal
          isOpen={showEditModal}
          onRequestClose={handleCloseEditModal}
          fansCategory={selectedFansCategory}
          loadFansCategory={loadFansCategory}
        />
      )}

      <div className="action-container">
        <Link to="/fansDashboard" className="btn btn-secondary">
          Return
        </Link>
      </div>
    </div>
  );
}

export default FansCategoryDashboard;
