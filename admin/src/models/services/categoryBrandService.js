import pkg from "sequelize";
import sequelize from "../../config/database/index.js";

const { QueryTypes } = pkg;

export const getCategoryBrands = async (contextObject) => {
    const categoryBrands = await sequelize.query(
        `SELECT content categoryContent, id categoryId
        FROM category`,
        { type: QueryTypes.SELECT }
    );

    for (const category of categoryBrands) {
        const brands = await sequelize.query(
            `SELECT brand.content brandContent, brand.id brandId, category_brand.id categoryBrandId
            FROM brand JOIN category_brand ON brand.id = category_brand.brandId
            WHERE category_brand.categoryId = ?`,
            { replacements: [category.categoryId], type: QueryTypes.SELECT }
        );

        category.brands = brands;
    }

    return { categoryBrands };
};

export const getCategoryBrandById = async (contextObject) => {
    const { categoryId, brandId } = contextObject;

    const categoryBrand = await sequelize.query(
        `SELECT id
        FROM category_brand
        WHERE categoryId = ? AND brandId = ?`,
        { replacements: [categoryId, brandId], type: QueryTypes.SELECT }
    );

    return { categoryBrand: categoryBrand[0] };
};
