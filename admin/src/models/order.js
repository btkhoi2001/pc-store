import pkg from "sequelize";
import sequelize from "../config/database/index.js";
import User from "./user.js";

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
        fullName: DataTypes.STRING(150),
        phoneNumber: DataTypes.STRING(12),
        address: DataTypes.STRING(150),
        email: DataTypes.STRING(100),
        status: {
            type: DataTypes.ENUM(
                "Đang xử lý",
                "Đang giao hàng",
                "Đã giao hàng",
                "Đã hủy"
            ),
            defaultValue: "Đang xử lý",
        },
        note: DataTypes.TEXT,
    },
    {
        tableName: "order",
    }
);

Order.sync({ logging: false });

export default Order;
