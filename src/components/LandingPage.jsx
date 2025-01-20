// src/components/LandingPage.jsx
import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to the Product Management App
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        This application allows you to manage products with ease. You can view
        all the products, add new ones, or edit them.
      </Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/products">
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: 20 }}
          >
            View Products
          </Button>
        </Link>
        <Link to="/add">
          <Button variant="contained" color="secondary">
            Add New Product
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default LandingPage;
