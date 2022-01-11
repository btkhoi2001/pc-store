import express from "express";
import cors from "cors";
import * as path from "path";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { passport } from "./middlewares/auth.js";
import router from "./routes/routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
    session({
        secret: "secretString",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use(router);

export default app;
