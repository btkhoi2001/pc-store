import pkg from "sequelize";
import sequelize from "../../config/database/index.js";

const { QueryTypes } = pkg;

export const getCategoryFromCategorySlug = async (contextObject) => {
    const { categorySlug } = contextObject;

    const category = await sequelize.query(
        `SELECT content
        FROM category
        WHERE slug = ?`,
        { replacements: [categorySlug], type: QueryTypes.SELECT }
    );

    return { category: category[0] };
};

export const getCategoryFromProductSlug = async (contextObject) => {
    const { productSlug } = contextObject;

    const category = await sequelize.query(
        `SELECT category.content, category.slug
        FROM category JOIN category_brand ON category.id = category_brand.categoryId JOIN product ON product.categoryBrandId = category_brand.id
        WHERE product.slug = ?`,
        { replacements: [productSlug], type: QueryTypes.SELECT }
    );

    return { category: category[0] };
};
