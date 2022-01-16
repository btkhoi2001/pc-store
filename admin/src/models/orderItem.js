import pkg from "sequelize";
import sequelize from "../config/database/index.js";
import Product from "./product.js";
import Order from "./Order.js";

const { DataTypes } = pkg;

const OrderItem = sequelize.define(
    "order_item",
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: Product,
                key: "id",
            },
        },
        orderId: {
            type: DataTypes.INTEGER,
            references: {
                model: Order,
                key: "id",
            },
        },
        quantity: DataTypes.INTEGER,
    },
    {
        tableName: "order_item",
    }
);

OrderItem.sync({ logging: false });

export default OrderItem;
