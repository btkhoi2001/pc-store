import express from "express";
import { show } from "../controllers/admin.js";

const router = express.Router({ mergeParams: true });

router.get("/", show);

export default router;
