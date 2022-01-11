import pkg from "sequelize";
import sequelize from "../config/database/index.js";
import User from "./User.js";

const { DataTypes } = pkg;

const Order = sequelize.define(
    "order",
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: "id",
            },
        },
        status: DataTypes.ENUM(
            "processing",
            "delivering",
            "cancelled",
            "delivered"
        ),
        note: DataTypes.TEXT,
    },
    {
        tableName: "order",
    }
);

Order.sync({ logging: false });

export default Order;
