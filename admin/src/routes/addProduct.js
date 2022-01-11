import express from "express";
import multer from "multer";
import { show, createProduct } from "../controllers/addProduct.js";

const router = express.Router();
const upload = multer();

router.get("/", show);
router.post("/", upload.array("images", 4), createProduct);

export default router;
