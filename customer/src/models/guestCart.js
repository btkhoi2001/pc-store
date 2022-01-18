import pkg from "sequelize";
import sequelize from "../config/database/index.js";
import Cart from "./cart.js";

const { DataTypes } = pkg;

const GuestCart = sequelize.define(
    "guest_cart",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
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
