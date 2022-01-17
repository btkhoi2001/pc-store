import express from "express";
import multer from "multer";
import { show, editAccount, changePassword } from "../controllers/setting.js";

const router = express.Router({ mergeParams: true });
const upload = multer();

router.get("/", show);
router.post("/", upload.single("avatar"), editAccount);
router.post("/change-password", changePassword);

export default router;
