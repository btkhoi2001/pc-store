import express from "express";
import cartAPI from "./cart.js";
import productAPI from "./product.js";
import authAPI from "./auth.js";
import wishlistAPI from "./wishlist.js";

const api = express.Router();

api.use("/auth", authAPI);
api.use("/cart", cartAPI);
api.use("/product", productAPI);
api.use("/wishlist", wishlistAPI);

export default api;
