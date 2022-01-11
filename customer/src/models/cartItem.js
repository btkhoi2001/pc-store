import pkg from "sequelize";
import sequelize from "../config/database/index.js";
import Product from "./product.js";
import Cart from "./Cart.js";

const { DataTypes } = pkg;

const CartItem = sequelize.define(
    "cart_item",
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
        cartId: {
            type: DataTypes.INTEGER,
            references: {
                model: Cart,
                key: "id",
            },
        },
        quantity: DataTypes.INTEGER,
    },
    {
        tableName: "cart_item",
    }
);

CartItem.sync({ logging: false });

export default CartItem;
