import express from "express";
import {
    showLogin,
    showRegister,
    register,
    logout,
} from "../controllers/auth.js";
import { passport } from "../middlewares/auth.js";

const router = express.Router({ mergeParams: true });

router.get("/", (req, res, next) => {
    res.redirect("/auth/login");
});
router.get("/login", showLogin);
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/auth/login",
        failureFlash: "Thông tin đăng nhập không chính xác",
    })
);
router.get("/register", showRegister);
router.post("/register", register);
router.get("/logout", logout);

export default router;
