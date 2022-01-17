import argon2 from "argon2";
import { getUser, registerUser } from "../models/services/userService.js";
import { mergeCart } from "../models/services/cartService.js";
import { createVerificationToken } from "../models/services/verificationTokenService.js";
import { sendEmail } from "../config/email/email.js";

export const show = async (req, res) => {
    res.render("./authentication/auth", {
        title: "Đăng nhập",
        loginError: req.flash("error"),
        registerError: req.flash("registerError"),
        registerSuccess: req.flash("registerSuccess"),
    });
};

export const login = async (req, res) => {
    try {
        const guestId = req.session.guestCartId;
        const userId = req.user.id;

        await mergeCart({ guestId, userId });

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

        const userId = newUser.dataValues.id;

        const { newToken } = await createVerificationToken({ userId });
        const tokenId = newToken.dataValues.id;
        const link = `${process.env.BASE_URL}/token/verification/${tokenId}`;

        if (!(await sendEmail(email, "Xác thực tài khoản", link)))
            throw "Error";

        req.flash(
            "registerSuccess",
            "Vùi lòng xác nhận tài khoản qua đường link gửi tới email trong 24 giờ"
        );
        res.redirect("/auth");
    } catch (error) {
        console.log(error);
        req.flash("registerError", "Có lỗi xảy ra. Vui lòng thử lại"),
            res.redirect("/auth");
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
