import express from "express";
import {
    show,
    deleteProduct,
    editProduct,
    showEditProduct,
} from "../controllers/products.js";

const router = express.Router();

router.get("/", show);
router.delete("/:productId", deleteProduct);
router.get("/:productId/edit", showEditProduct);
router.post("/:productId/edit", editProduct);

export default router;
