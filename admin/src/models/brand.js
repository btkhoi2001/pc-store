import pkg from "sequelize";
import SequelizeSlugify from "sequelize-slugify";
import sequelize from "../config/database/index.js";

const { DataTypes } = pkg;

const Brand = sequelize.define(
    "brand",
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
        tableName: "brand",
    }
);

Brand.sync({ logging: false });

SequelizeSlugify.slugifyModel(Brand, {
    source: ["content"],
});

export default Brand;
