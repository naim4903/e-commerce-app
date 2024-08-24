import express from "express";

import { register, updateUser, getAllUsers, deleteUser, getUserById, login, logout } from "../Controllers/users.controllers.js"


let router = express.Router();

router
    .post("/signup", register)
    .post("/login", login)
    .post("logout", logout)
    .patch("/user", updateUser)
    .get("/user", getAllUsers)
    .get("/user/:id", getUserById)
    .delete("/user/:id", deleteUser)

export default router;