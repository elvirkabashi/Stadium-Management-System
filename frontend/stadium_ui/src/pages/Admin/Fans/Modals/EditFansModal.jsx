import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import axios from "axios";
import "./EditFansModal.css";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from '../../../../components/LoadingSpinner';

Modal.setAppElement("#root");

function EditFansModal({ isOpen, onRequestClose, fans, fansCategory }) {
  const [title, setTitle] = useState(fans.title);
  const [titleDescription, setTitleDescription] = useState(fans.titleDescription);
  const [priceDescription, setPriceDescription] = useState(fans.priceDescription);
  const [price, setPrice] = useState(fans.price);
  const [description, setDescription] = useState(fans.description);
  const [image, setImage] = useState(null);
  const [imageUrll, setImageUrl] = useState(fans.imageUrl);
  const [fansCategoryId, setFansCategoryId] = useState(fans.fansCategoryId);
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

      const updatedFans = {
        id: fans.id,
        title,
        titleDescription,
        priceDescription,
        price: price,
        description: description,
        imageUrl: imageUrll,
        fansCategoryId: fansCategoryId,
      };

      await axios.put(`http://localhost:5163/api/Fans/${fans.id}`, updatedFans);
      toast.success(`Fans updated successfully`);
      location.href = "/"
      setIsLoading(false);  
    } catch (error) {
      console.error("Error updating fans:", error);
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
      <h2 className="modal-title">Edit Fans</h2>
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
            <label htmlFor="company">Title Description:</label>
            <input
              type="text"
              id="company"
              value={titleDescription}
              onChange={(e) => setTitleDescription(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Price:</label>
          <textarea
            id="description"
            value={priceDescription}
            onChange={(e) => setPriceDescription(e.target.value)}
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
        <div className="form-group" style={{width:'50%'}}>
              <label htmlFor="categoryId" className="mt-1">Fans Category:</label>
              <select
                style={{height:'45px'}}
                className="form-select"
                id="categoryId"
                value={fansCategoryId}
                onChange={(e) => setFansCategoryId(e.target.value)}
                required
              >
                <option value="">Fans Category</option>
                {fansCategory.map((fansCategory) => (
                  <option key={fansCategory.id} value={fansCategory.id}>
                    {fansCategory.name}
                  </option>
                ))}
              </select>
            </div>
        <div className="d-flex gap3">
          <div>
            <div className="form-group">
              <label htmlFor="image">Fans Photo:</label>
              <input type="file" id="image" onChange={handleImageChange} accept="image/*" />
            </div>
           {image != null && 
           <button type="submit" className="btn btn-outline-success" onClick={handleImageUpload}>
            {saveLoading ? <LoadingSpinner/> : 'Save new image'}
            </button>}
          </div>
          {imageUrll && (
            <div className="form-group">
              <img src={imageUrll} alt="Fans" style={{ maxWidth: "100%", marginBottom: "10px" }} />
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

EditFansModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  fans: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    titleDescription: PropTypes.string.isRequired,
    priceDescription: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    fansCategoryId: PropTypes.number.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  fansCategory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EditFansModal;
