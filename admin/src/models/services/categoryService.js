import pkg from "sequelize";
import sequelize from "../../config/database/index.js";

const { QueryTypes } = pkg;

export const getCategories = async (req, res) => {
    const categories = (
        await sequelize.query(
            `SELECT *
        FROM category`
        )
    )[0];

    return { categories };
};
