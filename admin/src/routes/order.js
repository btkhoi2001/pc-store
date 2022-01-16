import express from "express";
import { show, showDetail, editOrder } from "../controllers/order.js";

const router = express.Router({ mergeParams: true });

router.get("/", show);
router.get("/:orderId", showDetail);
router.post("/:orderId", editOrder);

export default router;
