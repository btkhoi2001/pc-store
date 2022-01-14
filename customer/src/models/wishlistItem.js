import pkg from "sequelize";
import sequelize from "../config/database/index.js";
import Product from "./product.js";
import Wishlist from "./wishlist.js";

const { DataTypes } = pkg;

const WishlistItem = sequelize.define(
    "wishlist_item",
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
        wishlistId: {
            type: DataTypes.INTEGER,
            references: {
                model: Wishlist,
                key: "id",
            },
        },
    },
    {
        tableName: "wishlist_item",
    }
);

WishlistItem.sync({ logging: false });

export default WishlistItem;
