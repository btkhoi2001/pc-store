import { getUserAdminList } from "../models/services/userService.js";

export const show = async (req, res) => {
    try {
        const { admins } = await getUserAdminList();

        res.render("./users/admins", {
            admins,
        });
    } catch (error) {
        console.log(error);
    }
};
