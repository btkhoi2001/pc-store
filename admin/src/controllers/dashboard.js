export const show = async (req, res) => {
    res.render("./dashboard/dashboard", { currentMenu: "/dashboard" });
};
