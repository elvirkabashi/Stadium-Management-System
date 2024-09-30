import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function GroupDashboard() {
  const [group, setGroup] = useState([]);
  const [newGroup, setNewGroup] = useState({ groupName: "", description: ""});
  const [editingGroup, setEditingGroup] = useState(null); // Track the group being edited

  useEffect(() => {
    loadGroup();
  }, []);


  const loadGroup = async () => {
    try {
      const response = await axios.get(`http://localhost:50473/api/Group`);
      setGroup(response.data);
    } catch (error) {
      console.error("Error loading groups:", error);
    }
  };

  const handleAddGroup = async () => {
    try {
      await axios.post(`http://localhost:50473/api/Group`, newGroup);
      setNewGroup({ groupName: "", description: "" }); // Reset form
      loadGroup(); // Reload group
    } catch (error) {
      console.error("Error adding group:", error);
    }
  };

  const handleUpdateGroup = async (updatedGroup) => {
    try {
      await axios.put(`http://localhost:50473/api/Group/${updatedGroup.id}`, updatedGroup);
      setEditingGroup(null); // Exit edit mode
      loadGroup(); // Reload group
    } catch (error) {
      console.error("Error updating group:", error);
    }
  };

  const handleDeleteGroup = async (id) => {
    try {
      await axios.delete(`http://localhost:50473/api/Group/${id}`);
      loadGroup(); // Reload group
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  const handleEditChange = (e, field) => {
    setEditingGroup({ ...editingGroup, [field]: e.target.value });
  };

  const handleNewGroupChange = (e, field) => {
    setNewGroup({ ...newGroup, [field]: e.target.value });
  };

  return (
    <div className="container">
      <h1 className="title">MEMBER</h1>
      <div className="title-line"></div>

      {/* Add New Group */}
      <div className="add-group">
        <input
          type="text"
          placeholder="Name"
          value={newGroup.groupName}
          onChange={(e) => handleNewGroupChange(e, "groupName")}
          className="form-control"
        />
        <input
          type="text"
          placeholder="Description"
          value={newGroup.description}
          onChange={(e) => handleNewGroupChange(e, "description")}
          className="form-control"
        />
        <button onClick={handleAddGroup} className="btn btn-primary">
          Add Group
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nr.</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {group.map((group, index) => (
            <tr key={group.id}>
              <td>{index + 1}</td>
              <td>
                {editingGroup && editingGroup.id === group.id ? (
                  <input
                    type="text"
                    value={editingGroup.groupName}
                    onChange={(e) => handleEditChange(e, "groupName")}
                    className="form-control"
                  />
                ) : (
                  group.groupName
                )}
              </td>
              <td>
                {editingGroup && editingGroup.id === group.id ? (
                  <input
                    type="text"
                    value={editingGroup.description}
                    onChange={(e) => handleEditChange(e, "description")}
                    className="form-control"
                  />
                ) : (
                  group.description
                )}
              </td>
              <td>
                {editingGroup && editingGroup.id === group.id ? (
                  <>
                    <button
                      onClick={() => handleUpdateGroup(editingGroup)}
                      className="btn btn-success"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingGroup(null)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditingGroup(group)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteGroup(group.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GroupDashboard;
