// src/components/ProductList.jsx
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Fetch products from the backend
  useEffect(() => {
    axiosInstance
      .get("/api/products") // Your Spring Boot API endpoint for fetching products
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleDelete = () => {
    if (productToDelete) {
      axiosInstance
        .delete(`/api/products/${productToDelete.id}`) // Spring Boot endpoint for deleting a product
        .then(() => {
          setProducts(
            products.filter((product) => product.id !== productToDelete.id)
          );
          setOpen(false);
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setProductToDelete(null);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Products
      </Typography>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body1">Price: ${product.price}</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteClick(product)}
              style={{ margin: "10px" }}
            >
              Delete
            </Button>
            <Link to={`/edit/${product.id}`}>
              <Button variant="contained" color="primary">
                Edit
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* Confirmation dialog for deletion */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Link to="/add">
        <Button variant="contained" color="primary">
          Add New Product
        </Button>
      </Link>
    </Container>
  );
};

export default ProductList;
