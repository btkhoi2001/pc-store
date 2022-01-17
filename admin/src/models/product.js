import pkg from "sequelize";
import SequelizeSlugify from "sequelize-slugify";
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
        slug: {
            type: DataTypes.STRING,
            unique: true,
        },
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

SequelizeSlugify.slugifyModel(Product, {
    source: ["name"],
});

export default Product;
