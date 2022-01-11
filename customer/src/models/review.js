import pkg from "sequelize";
import sequelize from "../config/database/index.js";
import User from "./user.js";
import Product from "./Product.js";

const { DataTypes } = pkg;

const Review = sequelize.define(
    "review",
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
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: Product,
                key: "id",
            },
        },
        rating: DataTypes.INTEGER,
        content: DataTypes.TEXT,
        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: "review",
    }
);

Review.sync({ logging: false });

export default Review;
