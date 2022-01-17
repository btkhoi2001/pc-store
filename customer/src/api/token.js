import express from "express";
import {
    createResetPasswordTokenAPI,
    submitResetPasswordTokenAPI,
} from "../controllers/token.js";

const api = express.Router({ mergeParams: true });

api.post("/reset-password", createResetPasswordTokenAPI);
api.post("/reset-password/:tokenId", submitResetPasswordTokenAPI);

export default api;
