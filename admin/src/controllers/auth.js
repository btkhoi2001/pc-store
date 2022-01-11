import argon2 from "argon2";
import { getUser, registerUser } from "../models/services/userService.js";
import { passport } from "../middlewares/auth.js";

export const showLogin = async (req, res) => {
    res.render("./authentication/login", {
        loginError: req.flash("error"),
    });
};

export const showRegister = async (req, res) => {
    res.render("./authentication/register", {
        registerError: req.flash("registerError") || "test",
    });
};

export const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        if (!name || !email || !password || !confirmPassword) {
            req.flash("registerError", "Yêu cầu không hợp lệ");
            return res.redirect("/auth/register");
        }

        if (password != confirmPassword) {
            req.flash("registerError", "Mật khẩu không trùng nhau");
            return res.redirect("/auth/register");
        }

        const { user } = await getUser({ email });

        if (user) {
            req.flash("registerError", "Địa chỉ email đã được đăng ký");
            return res.redirect("/auth/register");
        }

        const hashedPassword = await argon2.hash(password);

        const { newUser } = await registerUser({
            name,
            email,
            password: hashedPassword,
        });

        req.login(newUser, (err) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            res.redirect("/");
        });
    } catch (error) {
        console.log(error);
    }
};

export const logout = (req, res) => {
    req.logout();
    res.redirect("/");
};
