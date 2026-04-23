import React, { useState } from 'react'
import axios from 'axios';
import {ToastContainer, toast} from "react-toastify"
function Form() {
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
  })
  const notify = (message) => toast(message);
  const [backendImage, setBackendImage] = useState(null);

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value, files } = event.target
    if (name === 'image') {
      setFormValues((prev) => ({ ...prev, image: files[0] || null }))
      return;
    }
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formdata = new FormData();
    formdata.append("name", formValues.name);
    formdata.append("description", formValues.description);
    formdata.append("price", formValues.price);
    formdata.append("category", formValues.category);
    formdata.append("image", backendImage || formValues.image);

    
  if(formValues.image && !backendImage) {
    setBackendImage(formValues.image);
  }

  try {
    const result = await axios.post("http://localhost:8080/api/products/add", formdata, {withCredentials:true});
    console.log(result.data);
    notify("Product added successfully!");
    
    // Reset form after successful submission
    setFormValues({
      name: '',
      description: '',
      price: '',
      category: '',
      image: null,
    });
    setBackendImage(null);

  } catch (error) {
    console.log(error);
    notify("Failed to add product");

  }

}


  return (
    <div className="product-form-wrapper">
      <style>{`
        .product-form-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          background: #f5f7fb;
          box-sizing: border-box;
        }

        .product-form {
          width: min(100%, 740px);
          background: #ffffff;
          border-radius: 24px;
          box-shadow: 0 18px 50px rgba(30, 45, 90, 0.08);
          padding: 36px;
          box-sizing: border-box;
          margin: 0 auto;
        }

        .product-form h2 {
          margin: 0 0 18px;
          font-size: clamp(1.7rem, 3vw, 2.25rem);
          color: #111827;
        }

        .product-form p {
          margin: 0 0 28px;
          color: #4b5563;
          line-height: 1.75;
          font-size: 1rem;
        }

        .form-row {
          display: grid;
          gap: 18px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .form-row-single {
          display: grid;
          gap: 18px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .form-group label {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 10px;
          color: #374151;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #d1d5db;
          border-radius: 16px;
          padding: 15px 16px;
          font-size: 1rem;
          color: #111827;
          background: #f9fafb;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 5px rgba(37, 99, 235, 0.12);
          background: #ffffff;
        }

        .form-group textarea {
          min-height: 140px;
          resize: vertical;
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-top: 32px;
          flex-wrap: wrap;
        }

        .submit-button {
          border: none;
          background: linear-gradient(135deg, #2563eb, #4338ca);
          color: #ffffff;
          padding: 14px 24px;
          border-radius: 16px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          min-width: 160px;
        }

        .submit-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 30px rgba(37, 99, 235, 0.18);
        }

        .note {
          color: #6b7280;
          font-size: 0.95rem;
          flex: 1 1 100%;
          margin-bottom: 0;
        }

        .success-message {
          margin-top: 20px;
          padding: 16px 18px;
          border-radius: 16px;
          background: #ecfdf5;
          color: #065f46;
          border: 1px solid #d1fae5;
        }

        @media (max-width: 900px) {
          .product-form {
            padding: 30px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .product-form-wrapper {
            padding: 16px 12px;
          }

          .product-form {
            padding: 22px;
          }

          .product-form h2 {
            font-size: 1.75rem;
          }

          .form-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .submit-button {
            width: 100%;
            min-width: auto;
          }

          .form-group input,
          .form-group textarea,
          .form-group select {
            padding: 12px 14px;
          }
        }
      `}</style>

      <form className="product-form" onSubmit={handleSubmit} noValidate>
        <h2>Add New Product</h2>
        <p>Enter product details below. All fields are required before submission.</p>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formValues.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formValues.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="beauty">Beauty</option>
              <option value="sports">Sports</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              value={formValues.price}
              onChange={handleChange}
              placeholder="Enter product price"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Product Image</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row-single">
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              placeholder="Enter a brief description"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <span className="note">Please attach a product image before submitting.</span>
          <button disabled={!formValues.image} className="submit-button" type="submit">
            Save Product
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Form