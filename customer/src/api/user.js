import express from "express";
import multer from "multer";
import { updateAccountAPI, changePasswordAPI } from "../controllers/user.js";

const api = express.Router({ mergeParams: true });
const upload = multer();

api.use((req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.status(401).json({});
});

api.put("/account", upload.single("avatar"), updateAccountAPI);
api.put("/change-password", changePasswordAPI);

export default api;
