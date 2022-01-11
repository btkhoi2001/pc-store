import pkg from "sequelize";
import sequelize from "../config/database/index.js";
import User from "./user.js";

const { DataTypes } = pkg;

const GuestCart = sequelize.define(
    "guest_cart",
    {
        id: {
            type: DataTypes.STRING,
            unique: true,   
            primaryKey: true,
        },
        cartId: {
            type: DataTypes.INTEGER,
            references: {
                model: Cart,
                key: "id",
            },
        },
    },
    {
        tableName: "guest_cart",
    }
);

GuestCart.sync({ logging: false });

export default GuestCart;
