import express from "express";
import 'dotenv/config'

import dbConnect from "./database.js";

let server = express();

let port = process.env.PORT || 3000;

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
