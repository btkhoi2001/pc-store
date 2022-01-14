import express from "express";
import { getCartAPI, addItemToCartAPI } from "../controllers/cart.js";

const api = express.Router({ mergeParams: true });

api.get("/", getCartAPI);
api.post("/", addItemToCartAPI);

export default api;
