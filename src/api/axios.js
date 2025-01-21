// src/api/axios.js
import axios from "axios";

// Create an axios instance with the base URL of your Spring Boot server
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/products", // Your Spring Boot backend URL for products
  timeout: 10000, // Optional: request timeout in milliseconds
  headers: { "Content-Type": "application/json" },
});

export { axiosInstance };

// Function to get all products
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/");
    return response.data; // Return the response data (array of products)
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Handle error appropriately
  }
};

// Function to add a new product
export const addProduct = async (product) => {
  try {
    const response = await axiosInstance.post("/", product);
    return response.data; // Return the created product
  } catch (error) {
    console.error("Error adding product:", error);
    throw error; // Handle error appropriately
  }
};

// Function to update an existing product
export const updateProduct = async (id, product) => {
  try {
    const response = await axiosInstance.put(`/${id}`, product);
    return response.data; // Return the updated product
  } catch (error) {
    console.error("Error updating product:", error);
    throw error; // Handle error appropriately
  }
};

// Function to delete a product
export const deleteProduct = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
    return id; // Return the ID of the deleted product
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error; // Handle error appropriately
  }
};

export default axiosInstance;
