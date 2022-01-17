import {
    getVerificationToken,
    deleteVerificationToken,
} from "../models/services/verificationTokenService.js";
import { updateAccount } from "../models/services/userService.js";
import { createWishlist } from "../models/services/wishlistService.js";
import { createCart } from "../models/services/cartService.js";

export const showVerification = async (req, res) => {
    const { tokenId } = req.params;

    try {
        const { token } = await getVerificationToken({ tokenId });

        if (!token) return res.redirect("/404");

        const userId = token.userId;

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
    try {
        res.render("./token/reset-password", {
            title: "Token",
        });
    } catch (error) {
        console.log(error);
    }
};
