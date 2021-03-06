import pkg from "sequelize";
import sequelize from "../../config/database/index.js";

const { QueryTypes } = pkg;

export const getProductImages = async (contextObject) => {
    const { productSlug, productId } = contextObject;

    const productImages = await sequelize.query(
        `SELECT imageUrl
        FROM product_image JOIN product ON product_image.productId = product.id
        WHERE product.slug = ? OR product.id = ?
        ORDER BY product_image.numberOrder ASC`,
        { replacements: [productSlug, productId], type: QueryTypes.SELECT }
    );

    return { productImages };
};
