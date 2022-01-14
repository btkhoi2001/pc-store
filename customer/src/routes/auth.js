import express from "express";
import { show, login, register, logout } from "../controllers/auth.js";
import { passport } from "../middlewares/auth.js";

const router = express.Router({ mergeParams: true });

router.get("/", show);
router.get("/logout", logout);
router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/auth",
        failureFlash: "Thông tin đăng nhập không chính xác",
    }),
    login
);
router.post("/register", register);

export default router;
