import express from "express";
import { getProductAPI } from "../controllers/product.js";

const api = express.Router({ mergeParams: true });

api.get("/:productId", getProductAPI);

export default api;
