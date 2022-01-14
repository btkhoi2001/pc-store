import express from "express";
import { showDetail } from "../controllers/product.js";

const router = express.Router({ mergeParams: true });

router.get("/:productSlug", showDetail);

export default router;
