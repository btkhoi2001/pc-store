import ProductSpecification from "../productSpecification.js";
import pkg from "sequelize";
import sequelize from "../../config/database/index.js";

const { QueryTypes } = pkg;

export const createNewProductSpecification = async (contextObject) => {
    const { productId, numberOrder, content, value } = contextObject;

    const newProductSpecification = await ProductSpecification.create({
        productId,
        numberOrder,
        content,
        value,
    });

    return { newProductSpecification: newProductSpecification[0] };
};

export const getProductSpecificationByProductId = async (contextObject) => {
    const { productId } = contextObject;

    const productSpecifications = await sequelize.query(
        `SELECT content, value, numberOrder
        FROM product_specification
        WHERE productId = ?
        ORDER BY numberOrder ASC`,
        { replacements: [productId], type: QueryTypes.SELECT }
    );

    return { productSpecifications };
};
