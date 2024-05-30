import { useState, useEffect } from "react";
import axios from "axios";
import AddCategoryModal from "./Modals/AddCategoryModal";
import EditCategoryModal from "./Modals/EditCategoryModal";

function CategoryCrud() {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [, setIsEditing] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/Categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const handleAddCategory = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsEditing(true);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedCategory(null);
    setIsEditing(false);
    setShowEditModal(false);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}api/Categories/${id}`);
      await loadCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="container">
      <div className="action-container">
        <button onClick={handleAddCategory} className="btn btn-primary">
          Add Category
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{new Date(category.createdDateTime).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEditCategory(category)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDeleteCategory(category.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddCategoryModal
        isOpen={showAddModal}
        onRequestClose={handleCloseAddModal}
        loadCategories={loadCategories}
      />
      {selectedCategory && (
        <EditCategoryModal
          isOpen={showEditModal}
          onRequestClose={handleCloseEditModal}
          category={selectedCategory}
          loadCategories={loadCategories}
        />
      )}
    </div>
  );
}

export default CategoryCrud;
