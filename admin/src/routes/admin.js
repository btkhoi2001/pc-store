import express from "express";
import { show, showDetail, editAdmin } from "../controllers/admin.js";

const router = express.Router({ mergeParams: true });

router.get("/", show);
router.get("/:adminId", showDetail);
router.post("/:adminId", editAdmin);

export default router;
