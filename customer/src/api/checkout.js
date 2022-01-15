import express from "express";
import { createOrderAPI } from "../controllers/checkout.js";

const api = express.Router({ mergeParams: true });

api.use((req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.status(401).json({});
});

api.post("/", createOrderAPI);

export default api;
