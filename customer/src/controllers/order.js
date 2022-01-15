import { getOrder } from "../models/services/orderService.js";

export const show = async (req, res) => {
    const { orderId } = req.params;
    const userId = req.user.id;

    try {
        const { order } = await getOrder({ userId, orderId });

        res.render("./order/order", {
            title: "Đơn hàng",
            order,
        });
    } catch (error) {
        console.log(error);
    }
};
