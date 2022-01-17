import express from "express";
import multer from "multer";
import {
    show,
    deleteProduct,
    editProduct,
    showEditProduct,
} from "../controllers/products.js";

const router = express.Router();
const upload = multer();

router.get("/", show);
router.delete("/:productId", deleteProduct);
router.get("/:productId/edit", showEditProduct);
router.post("/:productId/edit", upload.array("images", 4), editProduct);

export default router;
