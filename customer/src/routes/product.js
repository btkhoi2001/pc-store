import express from "express";
import { showDetail, show } from "../controllers/product.js";

const router = express.Router({ mergeParams: true });

router.get("/product", show);
router.get("/product/:productSlug", showDetail);

export default router;
