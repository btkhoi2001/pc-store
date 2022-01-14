import express from "express";
import { loggedInAPI } from "../controllers/auth.js";

const api = express.Router({ mergeParams: true });

api.post("/logged-in", loggedInAPI);

export default api;
