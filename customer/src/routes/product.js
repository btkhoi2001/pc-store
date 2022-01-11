import express from "express";
import { showDetail } from "../controllers/products.js";

const router = express.Router({ mergeParams: true });

router.get("/:productSlug", showDetail);

export default router;
