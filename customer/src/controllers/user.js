import argon2 from "argon2";
import { updateAccount } from "../models/services/userService.js";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "../config/aws/aws.js";
import { getOrders } from "../models/services/orderService.js";

export const show = async (req, res) => {
    const userId = req.user.id;

    try {
        const { orders } = await getOrders({ userId });

        res.render("./user/user", {
            title: "Tài khoản",
            orders,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateAccountAPI = async (req, res) => {
    const { fullName, phoneNumber, address } = req.body;
    const userId = req.user.id;
    const file = req.file;
    let avatarUrl;

    try {
        if (file) {
            const avatar = req.user.avatarUrl;

            if (avatar) {
                file.key = avatar.substr(avatar.indexOf("avatar/"));
                await uploadFile(file);
            } else {
                const { originalname } = file;

                file.key =
                    "avatar/" +
                    uuidv4() +
                    originalname.substr(originalname.lastIndexOf("."));

                const uploadedFile = await uploadFile(file);

                avatarUrl = uploadedFile.Location;
            }
        }

        await updateAccount({
            userId,
            fullName,
            phoneNumber,
            address,
            avatarUrl,
        });

        if (fullName) req.session.passport.user.fullName = fullName;
        if (phoneNumber) req.session.passport.user.phoneNumber = phoneNumber;
        if (address) req.session.passport.user.address = address;
        if (avatarUrl) req.session.passport.user.avatarUrl = avatarUrl;

        req.session.save();
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({});
    }
};

export const changePasswordAPI = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user.id;

    try {
        if (!currentPassword || !newPassword || !confirmPassword)
            return res.status(400).json({ message: "Nhập thiếu trường" });

        if (newPassword != confirmPassword)
            return res
                .status(400)
                .json({ message: "Mật khẩu mới không trùng nhau" });

        const passwordValid = await argon2.verify(
            req.user.password,
            currentPassword
        );

        if (!passwordValid)
            return res.status(400).json({ message: "Sai mật khẩu" });

        const hashedPassword = await argon2.hash(newPassword);

        await updateAccount({ userId, password: hashedPassword });

        req.session.passport.user.password = hashedPassword;
        req.session.save();

        res.status(200).json({});
    } catch (error) {
        res.status(500).json({});
    }
};
