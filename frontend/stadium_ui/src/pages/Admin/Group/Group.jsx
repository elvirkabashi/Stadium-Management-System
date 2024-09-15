import { useState, useEffect } from "react";
import axios from "axios";
import AddGroupModal from "./Modals/AddGroupModal";
import EditGroupModal from "./Modals/EditGroupModal";
import "./Group.css";
import { Link } from "react-router-dom";


function Group() {
  const [group, setGroup] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [, setIsEditing] = useState(false);

  useEffect(() => {
    loadGroup();
  }, []);


  const loadGroup = async () => {
    try {
      const response = await axios.get(`http://localhost:60311/api/Group`);
      setGroup(response.data);
    } catch (error) {
      console.error("Error loading fans groups:", error);
    }
  };

  const handleAddGroup = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleEditGroup = (group) => {
    setSelectedGroup(group);
    setIsEditing(true);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedGroup(null);
    setIsEditing(false);
    setShowEditModal(false);
  };

  const handleDeleteGroup = async (id) => {
    try {
      await axios.delete(`http://localhost:60311/api/Group/${id}`);
      await loadGroup();
    } catch (error) {
      console.error("Error deleting Fans Category:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Groups</h1>
      <div className="title-line"></div>
      <div className="action-container">
        <button onClick={handleAddGroup} className="btn btn-primary">
          Add group
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {group.map((group) => (
            <tr key={group.id}>
              <td>{group.groupName}</td>
              <td>{group.description}</td>
              <td>
                <button onClick={() => handleEditGroup(group)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDeleteGroup(group.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddGroupModal
        isOpen={showAddModal}
        onRequestClose={handleCloseAddModal}
        loadGroup={loadGroup}
      />
      {selectedGroup && (
        <EditGroupModal
          isOpen={showEditModal}
          onRequestClose={handleCloseEditModal}
          group={selectedGroup}
          loadGroup={loadGroup}
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

export default Group;
