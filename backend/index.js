// Importing necessary modules
import express from "express";
import 'dotenv/config';
import dbConnect from "./database.js";
import userRouter from "./Routes/users.routes.js";
import cors from 'cors';

// Initialize Express server
let server = express();
let port = process.env.PORT || 3000;

// Middleware setup
server.use(cors());
server.use(express.json()); // To parse JSON bodies

// Use the router for routes related to users
server.use('/', userRouter); // Adjust the base path as needed

// Database connection and server start
dbConnect()
  .then(() => {
    console.log("Database is connected");

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Database error ", err);
  });
