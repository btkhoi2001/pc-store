import pkg from "sequelize";
import sequelize from "../../config/database/index.js";

const { QueryTypes } = pkg;

export const getProductImageFromProductSlug = async (contextObject) => {
    const { productSlug } = contextObject;

    const productImages = await sequelize.query(
        `SELECT imageUrl
        FROM product_image JOIN product ON product_image.productId = product.id
        WHERE product.slug = ?
        ORDER BY product_image.numberOrder ASC`,
        { replacements: [productSlug], type: QueryTypes.SELECT }
    );

    return { productImages };
};
