import pkg from "sequelize";
import sequelize from "../../config/database/index.js";

const { QueryTypes } = pkg;

export const getProductSpecificationFromProductSlug = async (contextObject) => {
    const { productSlug } = contextObject;

    const productSpecifications = await sequelize.query(
        `SELECT product_specification.content, product_specification.value
        FROM product_specification JOIN product ON product_specification.productId = product.id
        WHERE product.slug = ?
        ORDER BY product_specification.numberOrder ASC`,
        { replacements: [productSlug], type: QueryTypes.SELECT }
    );

    return { productSpecifications };
};
