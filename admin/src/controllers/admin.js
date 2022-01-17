import {
    getUsers,
    getUser,
    updateAdmin,
} from "../models/services/userService.js";

export const show = async (req, res) => {
    const { search } = req.query;
    const currentPage = req.query.page || 1;
    const limit = req.query.limit || 10;

    try {
        const { totalPages, users } = await getUsers({
            page: currentPage,
            limit,
            search,
            role: ["Admin", "SubAdmin"],
            sortBy: "id-desc",
        });

        res.render("./users/admins", {
            title: "Quản trị viên",
            currentMenu: "/admins",
            currentPage,
            totalPages,
            users,
            search,
        });
    } catch (error) {
        console.log(error);
    }
};

export const showDetail = async (req, res) => {
    const { adminId } = req.params;

    try {
        const admin = (await getUser({ userId: adminId })).user;

        res.render("./users/admin-details", {
            currentMenu: "/admins",
            title: "Quản trị viên",
            admin,
            error: req.flash("error"),
            success: req.flash("success"),
        });
    } catch (error) {
        console.log(error);
    }
};

export const editAdmin = async (req, res) => {
    const { adminId } = req.params;
    const { activated } = req.body;

    try {
        if (req.user.role != "Admin") throw "";

        await updateAdmin({ adminId, activated });

        req.flash("success", "Cập nhật trạng thái thành công");
        res.redirect(`/admins/${adminId}`);
    } catch (error) {
        req.flash("error", "Có lỗi xảy ra, vui lòng thử lại");
        res.redirect(`/admins/${adminId}`);
    }
};
