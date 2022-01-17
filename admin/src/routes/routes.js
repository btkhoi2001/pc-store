import express from "express";
import productRouter from "./products.js";
import addProductRouter from "./addProduct.js";
import authRouter from "./auth.js";
import adminRouter from "./admin.js";
import dashboardRouter from "./dashboard.js";
import orderRouter from "./order.js";
import userRouter from "./user.js";

const router = express.Router();

router.use("/auth", authRouter);

// router.use("/", (req, res, next) => {
//     if (req.isAuthenticated()) next();
//     else res.redirect("/auth/login");
// });

router.use("/products", productRouter);
router.use("/add-product", addProductRouter);
router.use("/admins", adminRouter);
router.use("/dashboard", dashboardRouter);
router.use("/orders", orderRouter);
router.use("/users", userRouter);

router.get("/settings", (req, res) => {
    res.render("./settings/settings", { path: req.path });
});

// router.get("/", (req, res) => {
//     res.redirect("/dashboard");
// });

router.use((req, res) => {
    if (req.isAuthenticated()) res.status(404).render("404");
    else res.redirect("/");
});

export default router;
