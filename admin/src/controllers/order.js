import {
    getOrder,
    getOrders,
    updateOrder,
} from "../models/services/orderService.js";
import { getUser } from "../models/services/userService.js";

export const show = async (req, res) => {
    const { search, status } = req.query;
    const currentPage = req.query.page || 1;
    const limit = req.query.limit || 10;

    try {
        const { totalPages, orders } = await getOrders({
            page: currentPage,
            limit,
            search,
            status,
        });

        res.render("./orders/orders", {
            currentMenu: "/orders",
            title: "Hóa đơn",
            currentPage,
            totalPages,
            orders,
            status,
            search,
        });
    } catch (error) {
        console.log(error);
    }
};

export const showDetail = async (req, res) => {
    const { orderId } = req.params;

    try {
        const { order } = await getOrder({ orderId });
        const { user } = await getUser({ userId: order.userId });

        res.render("./orders/order-details", {
            currentMenu: "/orders",
            title: "Đơn hàng",
            order,
            user,
            error: req.flash("error"),
            success: req.flash("success"),
        });
    } catch (error) {
        console.log(error);
    }
};

export const editOrder = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        await updateOrder({ orderId, status });

        req.flash("success", "Cập nhật trạng thái thành công");
        res.redirect(`/orders/${orderId}`);
    } catch (error) {
        req.flash("error", "Có lỗi xảy ra, vui lòng thử lại");
        res.redirect(`/orders/${orderId}`);
    }
};
