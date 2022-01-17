import { getOrders } from "../models/services/orderService.js";
import {
    getUsers,
    getUser,
    updateUser,
} from "../models/services/userService.js";

export const show = async (req, res) => {
    const { search, blocked } = req.query;
    const currentPage = req.query.page || 1;
    const limit = req.query.limit || 10;

    try {
        const { totalPages, users } = await getUsers({
            page: currentPage,
            limit,
            search,
            blocked,
            admin: 0,
        });

        res.render("./users/users", {
            currentMenu: "/users",
            title: "Người dùng",
            currentPage,
            totalPages,
            users,
            blocked,
            search,
        });
    } catch (error) {
        console.log(error);
    }
};

export const showDetail = async (req, res) => {
    const { userId } = req.params;
    const currentPage = req.query.page || 1;

    try {
        const { totalPages, orders } = await getOrders({
            page: currentPage,
            limit: 5,
            userId,
        });
        const { user } = await getUser({ userId });

        res.render("./users/user-details", {
            currentMenu: "/users",
            title: "Người dùng",
            orders,
            user,
            currentPage,
            totalPages,
            error: req.flash("error"),
            success: req.flash("success"),
        });
    } catch (error) {
        console.log(error);
    }
};

export const editUser = async (req, res) => {
    const { userId } = req.params;
    const { blocked } = req.body;

    try {
        await updateUser({ userId, blocked });

        req.flash("success", "Cập nhật trạng thái thành công");
        res.redirect(`/users/${userId}`);
    } catch (error) {
        req.flash("error", "Có lỗi xảy ra, vui lòng thử lại");
        res.redirect(`/users/${userId}`);
    }
};
