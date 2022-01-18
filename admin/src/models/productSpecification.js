import pkg from "sequelize";
import sequelize from "../config/database/index.js";
import Product from "./product.js";
const { DataTypes } = pkg;

const ProductSpecification = sequelize.define(
    "product_specification",
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
        content: DataTypes.STRING(100),
        value: DataTypes.STRING(100),
    },
    {
        tableName: "product_specification",
    }
);

ProductSpecification.sync({ logging: false });

export default ProductSpecification;
