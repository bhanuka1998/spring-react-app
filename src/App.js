import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Typography variant="h3" align="center" gutterBottom>
            Welcome to Product Management App
          </Typography>
          <Typography variant="h6" align="center" paragraph>
            This is a simple app built using React for the frontend and Spring
            Boot for the backend. Manage your products, view the product list,
            and add new products.
          </Typography>

          <div
            style={{ display: "flex", justifyContent: "center", gap: "20px" }}
          >
            <Link to="/products">
              <Button variant="contained" color="primary">
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
      </header>
    </div>
  );
}

export default App;
