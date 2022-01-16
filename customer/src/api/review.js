import express from "express";
import { getReviewsAPI, createReviewAPI } from "../controllers/review.js";

const api = express.Router({ mergeParams: true });

api.get("/", getReviewsAPI);

api.use((req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.status(401).json({});
});

api.post("/", createReviewAPI);

export default api;
