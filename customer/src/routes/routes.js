import express from "express";
import categoryRouter from "./category.js";
import productRouter from "./product.js";
import authRouter from "./auth.js";
import userRouter from "./user.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("./home/index", { title: "Trang chủ" });
});

router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/auth", authRouter);
router.use(
    "/user",
    (req, res, next) => {
        if (req.isAuthenticated()) next();
        else res.redirect("/auth");
    },
    userRouter
);

router.get("/cart", (req, res) => {
    res.render("./cart/cart");
});

router.get("/checkout", (req, res) => {
    res.render("./checkout/checkout");
});

router.get("/wishlist", (req, res) => {
    res.render("./wishlist/wishlist");
});

router.use((req, res) => {
    res.status(404).render("404");
});

export default router;
