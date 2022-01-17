import { getUsers } from "../models/services/userService.js";

export const show = async (req, res) => {
    const { search } = req.query;
    const currentPage = req.query.page || 1;
    const limit = req.query.limit || 10;

    try {
        const { totalPages, users } = await getUsers({
            page: currentPage,
            limit,
            search,
            admin: 1,
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
