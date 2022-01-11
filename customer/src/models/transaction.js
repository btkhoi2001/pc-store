import pkg from "sequelize";
import sequelize from "../config/database/index.js";
import Order from "./Order.js";

const { DataTypes } = pkg;

const Transaction = sequelize.define(
    "transaction",
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        orderId: {
            type: DataTypes.INTEGER,
            references: {
                model: Order,
                key: "id",
            },
        },
        type: DataTypes.ENUM("card", "cod"),
        status: DataTypes.ENUM("unpaid", "paid"),
    },
    {
        tableName: "transaction",
    }
);

Transaction.sync({ logging: false });

export default Transaction;
