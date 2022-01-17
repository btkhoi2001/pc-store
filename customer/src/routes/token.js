import express from "express";
import { showVerification, showResetPassword } from "../controllers/token.js";

const router = express.Router({ mergeParams: true });

router.get("/verification/:tokenId", showVerification);
router.get("/reset-password/:tokenId", showResetPassword);

export default router;
