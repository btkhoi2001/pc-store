import express from "express";
import cartAPI from "./cart.js";
import productAPI from "./product.js";
import authAPI from "./auth.js";
import wishlistAPI from "./wishlist.js";
import userAPI from "./user.js";
import checkoutAPI from "./checkout.js";
import reviewAPI from "./review.js";

const api = express.Router();

api.use("/auth", authAPI);
api.use("/cart", cartAPI);
api.use("/product", productAPI);
api.use("/wishlist", wishlistAPI);
api.use("/user", userAPI);
api.use("/checkout", checkoutAPI);
api.use("/review", reviewAPI);

export default api;
