import pkg from "sequelize";
import sequelize from "../../config/database/index.js";
import Order from "../order.js";
import { createOrderItem } from "./orderItemService.js";

const { QueryTypes } = pkg;

export const getOrders = async (contextObject) => {
    const { userId } = contextObject;

    const orders = await sequelize.query(
        `SELECT \`order\`.id, \`order\`.status, \`order\`.createdAt, SUM(order_item.quantity * product.price) AS total
        FROM \`order\` JOIN order_item ON \`order\`.id = order_item.id JOIN product ON order_item.productId = product.id
        WHERE \`order\`.userId = ?
        GROUP BY \`order\`.id, \`order\`.status, \`order\`.createdAt`,
        { replacements: [userId], type: QueryTypes.SELECT }
    );

    orders.forEach((value, index, array) => {
        value.total = value.total
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        value.createdAt = value.createdAt.toLocaleDateString("vi-VN");
    });

    return { orders };
};

export const getOrder = async (contextObject) => {
    const { userId, orderId } = contextObject;
    const order = {};

    order.items = await sequelize.query(
        `SELECT product.slug, product.name, product.price, product.id, order_item.quantity, product_image.imageUrl, order_item.quantity * product.price AS 'total'
        FROM \`order\` JOIN order_item ON \`order\`.id = order_item.orderId JOIN product ON order_item.productId = product.id LEFT JOIN product_image ON product.id = product_image.productId
        WHERE \`order\`.id = ? AND \`order\`.userId = ? AND (product_image.numberOrder = 1 OR 1)`,
        { replacements: [orderId, userId], type: QueryTypes.SELECT }
    );

    Object.assign(
        order,
        (
            await sequelize.query(
                `SELECT *
            FROM \`order\`
            WHERE \`order\`.id = ? AND \`order\`.userId = ?`,
                { replacements: [orderId, userId], type: QueryTypes.SELECT }
            )
        )[0]
    );

    order.total = 0;

    for (const item of order.items) order.total += item.total;

    order.items.forEach((value, index, array) => {
        value.price = value.price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        value.total = value.total
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    });

    order.total = order.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return { order };
};

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
