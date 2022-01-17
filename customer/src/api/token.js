import express from "express";
import { createResetPasswordTokenAPI } from "../controllers/token.js";

const api = express.Router({ mergeParams: true });

api.get("/reset-password", createResetPasswordTokenAPI);

export default api;
