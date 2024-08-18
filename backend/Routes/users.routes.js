import express from "express";

import { createUser, updateUser, getAllUsers, deleteUser, getUserById } from "../Controllers/users.controllers.js"


let router = express.Router();

router
    .post("/user", createUser)
    .patch("/user", updateUser)
    .get("/user", getAllUsers)
    .get("/user/:id", getUserById)
    .delete("/user/:id", deleteUser)

router.get('/test', (req, res) => {
    res.send('Test route is working');
});


export default router;