import express from "express";

import { createUser } from "../Controllers/users.controllers.js"


let router = express.Router();

router.post("/user", createUser);

router.get('/test', (req, res) => {
    res.send('Test route is working');
});


export default router;