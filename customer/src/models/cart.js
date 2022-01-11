import pkg from "sequelize";
import sequelize from "../config/database/index.js";
import User from "./user.js";

const { DataTypes } = pkg;

const Cart = sequelize.define(
    "cart",
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
    },
    {
        tableName: "cart",
    }
);

Cart.sync({ logging: false });

export default Cart;
