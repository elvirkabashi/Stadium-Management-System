import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import axios from "axios";
import "./EditProductModal.css";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../../../components/LoadingSpinner";

Modal.setAppElement("#root");

function EditProductModal({ isOpen, onRequestClose, product, categories }) {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [company, setCompany] = useState(product.company);
  const [price, setPrice] = useState(product.price);
  const [categoryId, setCategoryId] = useState(product.categoryId);
  const [image, setImage] = useState(null);
  const [imageUrll, setImageUrl] = useState(product.imageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [saveLoading,setSaveLoading] = useState(false)

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleImageUpload = async () => {
    try {
      if (!image) {
        toast.error("Please upload an image");
        return;
      }

      setSaveLoading(true);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "StadiumIMG");
      formData.append("cloud_name", "dga5qoqvf");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dga5qoqvf/image/upload",
          formData
        );
        setImageUrl(response.data.url);

      toast.success("Image saved successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Image upload failed");
    }finally{
      setSaveLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const updatedProduct = {
        id: product.id,
        title,
        description,
        company,
        price: price,
        categoryId: categoryId,
        imageUrl: imageUrll
      };

      await axios.put(`http://localhost:5163/api/Products/${product.id}`, updatedProduct);
      toast.success(`Product updated successfully`);
      location.href = "/"
      setIsLoading(false);  
    } catch (error) {
      console.error("Error updating product:", error);
      setIsLoading(false);
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
          maxWidth: "500px",
          height: "700px",
        },
      }}
    >
      <h2 className="modal-title">Edit Product</h2>
      <div>
        <div className="d-flex gap-3">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company:</label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
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
        <div className="d-flex gap-3">
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{width:'50%'}}>
            <label htmlFor="categoryId" className="mt-1">Category:</label>
            <select
              style={{height:'45px'}}
              className="form-select"
              id="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="d-flex gap3">
          <div>
            <div className="form-group">
              <label htmlFor="image">Product Photo:</label>
              <input type="file" id="image" onChange={handleImageChange} accept="image/*" />
            </div>
           {image != null && 
           <button type="submit" className="btn btn-outline-success" onClick={handleImageUpload}>
            {saveLoading ? <LoadingSpinner/> : 'Save new image'}
            </button>}
          </div>
          {imageUrll && (
            <div className="form-group">
              <img src={imageUrll} alt="Product" style={{ maxWidth: "100%", marginBottom: "10px" }} />
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary" disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
        <Toaster/>
      </div>
    </Modal>
  );
}

EditProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    categoryId: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EditProductModal;
