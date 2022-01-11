import Product from "../product.js";
import pkg from "sequelize";
import sequelize from "../../config/database/index.js";

const { QueryTypes } = pkg;

export const getProductQuantity = async (contextObject) => {
    const pattern = `%${contextObject.pattern}%`;

    const productQuantity = await sequelize.query(
        `SELECT COUNT(*) AS quantity
        FROM product
        WHERE name LIKE ? AND archive = 0`,
        { replacements: [pattern], type: QueryTypes.SELECT }
    );

    return { productQuantity: productQuantity[0].quantity };
};

export const getProductList = async (contextObject) => {
    const { offset, limit } = contextObject;
    const pattern = `%${contextObject.pattern}%`;

    const products = await sequelize.query(
        `SELECT product.id, product.name, product.price, product_image.imageUrl
        FROM product JOIN product_image ON product.id = product_image.productId
        WHERE product_image.numberOrder = 1 AND product.name LIKE ? AND product.archive = 0
        ORDER BY product.name DESC
        LIMIT ? OFFSET ?`,
        { replacements: [pattern, limit, offset], type: QueryTypes.SELECT }
    );

    products.forEach((value, index, array) => {
        value.price = value.price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    });

    return { products };
};

export const createNewProduct = async (contextObject) => {
    const { name, description, categoryBrandId, price, published } =
        contextObject;

    const newProduct = await Product.create({
        name,
        description,
        categoryBrandId,
        price,
        published,
    });

    return { newProduct };
};

export const deleteProductByProductId = async (contextObject) => {
    const { id } = contextObject;

    const deletedProduct = await Product.update(
        { archive: 1 },
        {
            where: {
                id,
            },
        }
    );

    return { deletedProduct };
};

export const getProductByProductId = async (contextObject) => {
    const { id } = contextObject;

    const product = await sequelize.query(
        `SELECT name, description, price, published, categoryBrandId
        FROM product
        WHERE id = ?`,
        { replacements: [id], type: QueryTypes.SELECT }
    );

    return { product: product[0] };
};
