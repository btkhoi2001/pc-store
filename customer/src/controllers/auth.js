import argon2 from "argon2";
import { getUser, registerUser } from "../models/services/userService.js";

export const show = async (req, res) => {
    res.render("./authentication/auth", {
        loginError: req.flash("error"),
        registerError: req.flash("registerError"),
    });
};

export const login = async (req, res) => {
    try {
        req.session.guestCartId = "";
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
};

export const register = async (req, res) => {
    const { name, email, password, rePassword } = req.body;

    try {
        if (!name || !email || !password || !rePassword) {
            req.flash("registerError", "Yêu cầu không hợp lệ");
            return res.redirect("/auth");
        }

        if (password != rePassword) {
            req.flash("registerError", "Mật khẩu không trùng nhau");
            return res.redirect("/auth");
        }

        const { user } = await getUser({ email });

        if (user) {
            req.flash("registerError", "Địa chỉ email đã được đăng ký");
            return res.redirect("/auth");
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

export const loggedInAPI = (req, res) => {
    if (req.user) res.status(200).json({});
    else res.status(401).json({});
};
