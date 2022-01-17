import argon2 from "argon2";
import { updateUser } from "../models/services/userService.js";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "../config/aws/aws.js";

export const show = async (req, res) => {
    try {
        res.render("./settings/settings", {
            title: "Cài đặt",
            currentMenu: "/settings",
            error: req.flash("error"),
            success: req.flash("success"),
        });
    } catch (error) {
        console.log(error);
    }
};

export const editAccount = async (req, res) => {
    const { fullName, address, phoneNumber } = req.body;
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

        await updateUser({ userId, fullName, address, phoneNumber, avatarUrl });

        req.flash("success", "Cập nhật thông tin thành công");
        res.redirect(`/settings`);
    } catch (error) {
        req.flash("error", "Có lỗi xảy ra, vui lòng thử lại");
        res.redirect(`/settings`);
    }
};

export const changePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user.id;

    try {
        if (!currentPassword || !newPassword || !confirmPassword) {
            req.flash("error", "Nhập thiếu trường");
            res.redirect(`/settings`);
        }

        if (newPassword != confirmPassword) {
            req.flash("error", "Mật khẩu mới không trùng nhau");
            res.redirect(`/settings`);
        }

        const passwordValid = await argon2.verify(
            req.user.password,
            currentPassword
        );

        if (!passwordValid) {
            req.flash("error", "Sai mật khẩu");
            res.redirect(`/settings`);
        }

        const hashedPassword = await argon2.hash(newPassword);

        await updateUser({ userId, password: hashedPassword });

        req.session.passport.user.password = hashedPassword;
        req.session.save();

        req.flash("success", "Thay đổi mật khẩu thành công");
        res.redirect(`/settings`);
    } catch (error) {
        req.flash("error", "Có lỗi xảy ra, vui lòng thử lại");
        res.redirect(`/settings`);
    }
};
