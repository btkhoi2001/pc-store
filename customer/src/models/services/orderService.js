import pkg from "sequelize";
import sequelize from "../../config/database/index.js";
import Order from "../order.js";
import { createOrderItem } from "./orderItemService.js";

const { QueryTypes } = pkg;

export const createOrder = async (contextObject) => {
    const { userId, fullName, address, email, phoneNumber, note } =
        contextObject;

    const newOrder = await Order.create({
        userId,
        fullName,
        address,
        email,
        phoneNumber,
        note,
    });

    const orderId = newOrder.dataValues.id;

    const cart = await sequelize.query(
        `SELECT cart_item.productId, cart_item.quantity
        FROM cart_item JOIN cart ON cart_item.cartId = cart.id
        WHERE cart.userId = ?`,
        { replacements: [userId], type: QueryTypes.SELECT }
    );

    cart.forEach(async (value, index, array) => {
        await createOrderItem({
            orderId,
            productId: value.productId,
            quantity: value.quantity,
        });
    });

    return { newOrder };
};
