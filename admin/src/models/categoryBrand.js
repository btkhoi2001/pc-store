import pkg from "sequelize";
import sequelize from "../config/database/index.js";
import Brand from "./brand.js";
import Category from "./category.js";

const { DataTypes } = pkg;

const CategoryBrand = sequelize.define(
    "category_brand",
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: Category,
                key: "id",
            },
        },
        brandId: {
            type: DataTypes.INTEGER,
            references: {
                model: Brand,
                key: "id",
            },
        },
    },
    {
        tableName: "category_brand",
    }
);

CategoryBrand.sync({ logging: false });

export default CategoryBrand;
