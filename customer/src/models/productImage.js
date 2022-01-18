import pkg from "sequelize";
import sequelize from "../config/database/index.js";
import Product from "./product.js";
const { DataTypes } = pkg;

const ProductImage = sequelize.define(
    "product_image",
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
        numberOrder: DataTypes.INTEGER,
        imageUrl: DataTypes.STRING(200),
    },
    {
        tableName: "product_image",
    }
);

ProductImage.sync({ logging: false });

export default ProductImage;
