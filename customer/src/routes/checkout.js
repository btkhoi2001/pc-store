import express from "express";
import { show } from "../controllers/checkout.js";

const router = express.Router({ mergeParams: true });

router.use((req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.redirect("/auth");
});
router.get("/", show);

export default router;
