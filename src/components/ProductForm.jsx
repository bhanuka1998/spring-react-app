// src/components/ProductForm.jsx
import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axios";

const ProductForm = () => {
  const [product, setProduct] = useState({ name: "", price: 0 });
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch product details for editing
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      axiosInstance
        .get(`/api/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, [id]);

  // Handle form submission (add or update product)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      axiosInstance
        .put(`/api/products/${id}`, product)
        .then(() => {
          navigate("/products");
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    } else {
      axiosInstance
        .post("/api/products", product)
        .then(() => {
          navigate("/products");
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        {isEditMode ? "Edit Product" : "Add New Product"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Product Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          fullWidth
          margin="normal"
          type="number"
        />
        <Button type="submit" variant="contained" color="primary">
          {isEditMode ? "Update Product" : "Add Product"}
        </Button>
      </form>
    </Container>
  );
};

export default ProductForm;
