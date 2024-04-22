import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../../../../components/LoadingSpinner";

Modal.setAppElement("#root");

function AddProductModal({ isOpen, onRequestClose }) {

  const [saveLoading,setSaveLoading] = useState(false)
  const [addLoading,setAddLoading] = useState(false)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5163/api/Categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


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
      setAddLoading(true);
      const newProduct = {
        title,
        description,
        company,
        price: parseFloat(price),
        categoryId,
        imageUrl
      };


        await axios.post("http://localhost:5163/api/Products", newProduct);
        onRequestClose();
        window.location.reload();

    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to add product");
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
      <h2 className="modal-title">Add Product</h2>
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
              <label htmlFor="category" className="mt-1">Category:</label>
              <select
                style={{height:'45px'}}
                className="form-select"
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <option value="">Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="d-flex gap-3">
            <div>
                <div className="form-group">
                  <label htmlFor="image">Image:</label>
                  <input
                    className="form-control"
                    type="file"
                    id="image"
                    ref={inputRef}
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                </div>
                {image && <button type="submit" className="btn btn-outline-success" onClick={handleImageUpload}>
                  {saveLoading ? <LoadingSpinner color={'text-primary'}/> : 'Save Image'}
                  
                </button>}
            </div>
          {image ? <img src={URL.createObjectURL(image)} style={{width:'200px'}}/> : <img src="./noimg.png" style={{width:'200px'}}/>}
        
          </div>
          <Toaster />
        <div className="modal-footer mt-4">
          {imageUrl.length > 0 ? 
          <>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              {addLoading ? <LoadingSpinner color={'text-primary'}/> : 'Add'}
            </button>
          </> 
          : 
          <>
            <p>Choose image first!</p>
          </>}
        </div>
      </div>
    </Modal>
  );
}

AddProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default AddProductModal;
