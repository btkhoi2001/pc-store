import argon2 from "argon2";
import {
    getVerificationToken,
    deleteVerificationToken,
} from "../models/services/verificationTokenService.js";
import {
    createResetPasswordToken,
    getResetPasswordToken,
    deleteResetPasswordToken,
} from "../models/services/resetPasswordTokenService.js";
import { updateAccount, getUser } from "../models/services/userService.js";
import { createWishlist } from "../models/services/wishlistService.js";
import { createCart } from "../models/services/cartService.js";
import { sendEmail } from "../config/email/email.js";

export const showVerification = async (req, res) => {
    const { tokenId } = req.params;

    try {
        const { token } = await getVerificationToken({ tokenId });

        if (!token) return res.redirect("/404");

        const userId = token.userId;
        const previous = token.createdAt;
        const current = Date.now();
        const Difference_In_Time = current.getTime() - previous.getTime();
        const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        if (Difference_In_Days >= 1) return res.redirect("/404");

        await updateAccount({ activated: 1, userId });
        await createCart({ userId });
        await createWishlist({ userId });
        await deleteVerificationToken({ tokenId });

        res.render("./token/verification", {
            title: "Token",
        });
    } catch (error) {
        console.log(error);
    }
};

export const showResetPassword = async (req, res) => {
    const { tokenId } = req.params;

    try {
        const { token } = await getResetPasswordToken({ tokenId });

        if (!token) return res.redirect("/404");

        res.render("./token/reset-password", {
            title: "Token",
            tokenId,
        });
    } catch (error) {
        console.log(error);
    }
};

export const createResetPasswordTokenAPI = async (req, res) => {
    const { email } = req.body;

    try {
        const { user } = await getUser({ email });

        if (!user || !user.activated || user.role != "User")
            res.status(404).json({ message: "Không tìm thấy địa chỉ email" });

        const userId = user.id;

        const { newToken } = await createResetPasswordToken({ userId });
        const tokenId = newToken.dataValues.id;
        const link = `${process.env.BASE_URL}/token/reset-password/${tokenId}`;

        if (!(await sendEmail(email, "Quên mật khẩu", link))) throw "Error";

        res.status(200).json({});
    } catch (error) {
        res.status(500).json({});
    }
};

export const submitResetPasswordTokenAPI = async (req, res) => {
    const { tokenId } = req.params;
    const { newPassword } = req.body;

    try {
        const { token } = await getResetPasswordToken({ tokenId });
        const userId = token.userId;
        const previous = token.createdAt;
        const current = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(Math.abs((previous - current) / oneDay));

        if (diffDays >= 1) return res.status(404).json({});

        const hashedPassword = await argon2.hash(newPassword);

        await updateAccount({ userId, password: hashedPassword });
        await deleteResetPasswordToken({ tokenId });

        res.status(200).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json({});
    }
};
