import express from "express";
import categoryRouter from "./category.js";
import productRouter from "./product.js";
import authRouter from "./auth.js";
import userRouter from "./user.js";
import wishlistRouter from "./wishlist.js";
import { show } from "../controllers/home.js";

const router = express.Router();

router.get("/", show);

router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

router.get("/cart", (req, res) => {
    res.render("./cart/cart");
});

router.get("/checkout", (req, res) => {
    res.render("./checkout/checkout");
});

router.use("/wishlist", wishlistRouter);

router.use((req, res) => {
    res.status(404).render("404");
});

export default router;
