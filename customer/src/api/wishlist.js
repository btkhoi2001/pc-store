import express from "express";
import {
    getWishlistAPI,
    addItemToWishlistAPI,
    deleteItemFromWishlistAPI,
} from "../controllers/wishlist.js";

const api = express.Router({ mergeParams: true });

api.use((req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.status(401).json({});
});

api.get("/", getWishlistAPI);
api.post("/", addItemToWishlistAPI);
api.delete("/", deleteItemFromWishlistAPI);

export default api;
