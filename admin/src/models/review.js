import pkg from "sequelize";
import sequelize from "../config/database/index.js";
import User from "./user.js";
import Product from "./product.js";

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
        rating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
        },
        content: DataTypes.TEXT,
    },
    {
        tableName: "review",
    }
);

Review.sync({ logging: false });

export default Review;
