import { createOrder } from "../models/services/orderService.js";
import { emptyCart } from "../models/services/cartItemService.js";

export const show = (req, res) => {
    res.render("./checkout/checkout", {
        title: "Thanh toán",
    });
};

export const createOrderAPI = async (req, res) => {
    const { fullName, address, email, phoneNumber } = req.body;
    const userId = req.user.id;
    const cart = res.locals.cart;

    if (!fullName || !address || !email || !phoneNumber)
        return res.status(400).json({ message: "Nhập thiếu trường" });

    if (cart.items.length == 0)
        return res.status(400).json({ message: "Giỏ hàng trống" });

    try {
        const { newOrder } = await createOrder({
            userId,
            fullName,
            address,
            email,
            phoneNumber,
        });
        await emptyCart({ cartId: cart.id });

        return res.status(201).json({ newOrder: newOrder.dataValues });
    } catch (error) {
        res.status(500).json({});
    }
};
