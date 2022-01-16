import express from "express";
import categoryRouter from "./category.js";
import productRouter from "./product.js";
import authRouter from "./auth.js";
import userRouter from "./user.js";
import wishlistRouter from "./wishlist.js";
import cartRouter from "./cart.js";
import checkoutRouter from "./checkout.js";
import orderRouter from "./order.js";
import { show } from "../controllers/home.js";

const router = express.Router();

router.get("/", show);

router.use("/category", categoryRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/cart", cartRouter);
router.use("/checkout", checkoutRouter);
router.use("/wishlist", wishlistRouter);
router.use("/order", orderRouter);
router.use("/", productRouter);

router.use((req, res) => {
    res.status(404).render("404");
});

export default router;
