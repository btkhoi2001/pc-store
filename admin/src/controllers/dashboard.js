import { getReport } from "../models/services/orderService.js";
import { getOrders } from "../models/services/orderService.js";

export const show = async (req, res) => {
    try {
        const { report } = await getReport();
        const { orders } = await getOrders({
            page: 1,
            limit: 10,
            sortBy: "new",
        });

        res.render("./dashboard/dashboard", {
            currentMenu: "/dashboard",
            title: "Bảng điều khiển",
            report,
            orders,
        });
    } catch (error) {
        console.log(error);
    }
};
