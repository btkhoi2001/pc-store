import pkg from "sequelize";
import sequelize from "../../config/database/index.js";

const { QueryTypes } = pkg;

export const getBrandsByCategorySlug = async (contextObject) => {
    const { categorySlug } = contextObject;

    const brands = await sequelize.query(
        `SELECT brand.content
        FROM brand JOIN category_brand ON brand.id = category_brand.brandId JOIN category ON category.id = category_brand.categoryId
        WHERE category.slug = ?`,
        { replacements: [categorySlug], type: QueryTypes.SELECT }
    );

    return { brands };
};
