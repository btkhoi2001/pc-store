import pkg from "sequelize";
import SequelizeSlugify from "sequelize-slugify";
import sequelize from "../config/database/index.js";

const { DataTypes } = pkg;

const Category = sequelize.define(
    "category",
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        content: DataTypes.STRING(50),
        slug: {
            type: DataTypes.STRING,
            unique: true,
        },
    },
    {
        tableName: "category",
    }
);

Category.sync({ logging: false });

SequelizeSlugify.slugifyModel(Category, {
    source: ["content"],
});

export default Category;
