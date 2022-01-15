import pkg from "sequelize";
import sequelize from "../../config/database/index.js";
import OrderItem from "../orderItem.js";

const { QueryTypes } = pkg;

export const createOrderItem = async (contextObject) => {
    const { productId, orderId, quantity } = contextObject;

    const orderItem = await OrderItem.create({
        productId,
        orderId,
        quantity,
    });

    return { orderItem };
};
