import pkg from "sequelize";
import sequelize from "../config/database/index.js";
import CategoryBrand from "./categoryBrand.js";

const { DataTypes } = pkg;

const Product = sequelize.define(
    "product",
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING(150),
        description: DataTypes.TEXT,
        categoryBrandId: {
            type: DataTypes.INTEGER,
            references: {
                model: CategoryBrand,
                key: "id",
            },
        },
        price: DataTypes.INTEGER,
        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        archive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: "product",
    }
);

Product.sync({ logging: false });

export default Product;
