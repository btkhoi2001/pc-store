import express from "express";
import { show } from "../controllers/user.js";
import { passport } from "../middlewares/auth.js";

const router = express.Router({ mergeParams: true });

router.get("/", show);

export default router;
