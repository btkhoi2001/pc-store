import express from "express";
import { show, showDetail, editUser } from "../controllers/user.js";

const router = express.Router({ mergeParams: true });

router.get("/", show);
router.get("/:userId", showDetail);
router.post("/:userId", editUser);

export default router;
