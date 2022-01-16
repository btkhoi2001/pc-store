import pkg from "sequelize";
import sequelize from "../../config/database/index.js";
import Order from "../order.js";

const { QueryTypes } = pkg;

export const getOrders = async (contextObject) => {
    const { search, page, limit, sortBy, status } = contextObject;

    let sortQuery;

    switch (sortBy) {
        case "name-asc":
            sortQuery = "ORDER BY product.name ASC";
            break;
        case "name-desc":
            sortQuery = "ORDER BY product.name DESC";
            break;
        case "price-asc":
            sortQuery = "ORDER BY product.price ASC";
            break;
        case "price-desc":
            sortQuery = "ORDER BY product.price DESC";
            break;
        case "new":
            sortQuery = "ORDER BY product.createdAt DESC";
            break;
        case "old":
            sortQuery = "ORDER BY product.createdAt ASC";
            break;
        default:
            sortQuery = "ORDER BY `order`.id DESC";
            break;
    }

    const totalRows = await sequelize.query(
        `SELECT COUNT(*)
        FROM \`order\`
        WHERE (? OR \`order\`.fullName LIKE ? OR \`order\`.email LIKE ?) AND (? OR \`order\`.status = ?)`,
        {
            replacements: [
                search === undefined,
                `%${search}%`,
                `%${search}%`,
                status === undefined || status == "Tình trạng",
                status,
            ],
            type: QueryTypes.SELECT,
        }
    );

    const totalPages = Math.ceil(totalRows[0].rows / limit) || 1;

    const orders = await sequelize.query(
        `SELECT \`order\`.id, \`order\`.fullName, \`order\`.email, \`order\`.status, \`order\`.createdAt, SUM(order_item.quantity * product.price) AS total
        FROM \`order\` JOIN order_item ON \`order\`.id = order_item.orderId JOIN product ON order_item.productId = product.id
        WHERE (? OR \`order\`.fullName LIKE ? OR \`order\`.email LIKE ?) AND (? OR \`order\`.status = ?)
        GROUP BY \`order\`.id, \`order\`.fullName, \`order\`.email, \`order\`.status, \`order\`.createdAt
        ${sortQuery}
        LIMIT ? OFFSET ?`,
        {
            replacements: [
                search === undefined,
                `%${search}%`,
                `%${search}%`,
                status === undefined || status == "Tình trạng",
                status,
                limit,
                (page - 1) * limit,
            ],
            type: QueryTypes.SELECT,
        }
    );

    orders.forEach((value, index, array) => {
        value.total = value.total
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        value.createdAt = value.createdAt.toLocaleDateString("vi-VN");
    });

    return { totalPages, orders };
};

export const getOrder = async (contextObject) => {
    const { orderId } = contextObject;
    const order = {};

    order.items = await sequelize.query(
        `SELECT product.slug, product.name, product.price, product.id AS 'productId', order_item.quantity, product_image.imageUrl, order_item.quantity * product.price AS 'total'
        FROM \`order\` JOIN order_item ON \`order\`.id = order_item.orderId JOIN product ON order_item.productId = product.id LEFT JOIN product_image ON product.id = product_image.productId
        WHERE \`order\`.id = ? AND (product_image.numberOrder = 1 OR 1)`,
        { replacements: [orderId], type: QueryTypes.SELECT }
    );

    Object.assign(
        order,
        (
            await sequelize.query(
                `SELECT *
                FROM \`order\`
                WHERE \`order\`.id = ?`,
                { replacements: [orderId], type: QueryTypes.SELECT }
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
    order.createdAt = order.createdAt.toLocaleDateString("vi-VN");

    return { order };
};

export const updateOrder = async (contextObject) => {
    const { orderId, status } = contextObject;

    await Order.update(
        { status },
        {
            where: {
                id: orderId,
            },
        }
    );
};
