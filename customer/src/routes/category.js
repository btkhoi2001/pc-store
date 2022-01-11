import express from "express";
import { show } from "../controllers/category.js";

const router = express.Router({ mergeParams: true });

router.get("/:categorySlug", show);

export default router;
