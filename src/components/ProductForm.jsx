// src/components/ProductForm.jsx
import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addProduct, axiosInstance, updateProduct } from "../api/axios";

const ProductForm = () => {
  const [product, setProduct] = useState({ name: "", price: "" }); // Ensure price is a string
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch product details for editing
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      axiosInstance
        .get(`/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, [id]);

  // Handle form submission (add or update product)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateProduct(id, product);
      } else {
        await addProduct(product);
      }
      navigate("/products");
    } catch (error) {
      console.error(
        isEditMode ? "Error updating product" : "Error adding product",
        error
      );
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        {isEditMode ? "Edit Product" : "Add New Product"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Product Price"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          type="text" // Keep it as a text field to align with string handling
          required
        />
        <Button type="submit" variant="contained" color="primary">
          {isEditMode ? "Update Product" : "Add Product"}
        </Button>
      </form>
    </Container>
  );
};

export default ProductForm;
