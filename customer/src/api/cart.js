import express from "express";
import {
    getCartAPI,
    addItemToCartAPI,
    deleteItemFromCartAPI,
} from "../controllers/cart.js";

const api = express.Router({ mergeParams: true });

api.get("/", getCartAPI);
api.post("/", addItemToCartAPI);
api.delete("/", deleteItemFromCartAPI);

export default api;
