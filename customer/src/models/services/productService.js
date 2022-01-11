import pkg from "sequelize";
import sequelize from "../../config/database/index.js";

const { QueryTypes } = pkg;

export const getProductsListByCategorySlug = async (contextObject) => {
    const { categorySlug, page, limit, brands } = contextObject;

    const totalRows = await sequelize.query(
        `SELECT COUNT(*) AS 'rows'
        FROM product JOIN category_brand ON product.categoryBrandId = category_brand.id JOIN category ON category_brand.categoryId = category.id JOIN brand ON brand.id = category_brand.brandId
        WHERE category.slug = ? AND product.archive = 0 AND (? IS NULL OR brand.content IN (?))`,
        {
            replacements: [categorySlug, brands, brands],
            type: QueryTypes.SELECT,
        }
    );

    const totalPages = Math.ceil(totalRows[0].rows / limit) || 1;

    const products = await sequelize.query(
        `SELECT product.name, product.slug, product.description, product.price, product_image.imageUrl
        FROM product JOIN category_brand ON product.categoryBrandId = category_brand.id JOIN category ON category_brand.categoryId = category.id JOIN product_image ON product_image.productId = product.id JOIN brand on brand.id = category_brand.brandId
        WHERE category.slug = ? AND product.archive = 0 AND (? IS NULL OR brand.content IN (?))
        ORDER BY product.createdAt DESC
        LIMIT ? OFFSET ?`,
        {
            replacements: [
                categorySlug,
                brands,
                brands,
                limit,
                (page - 1) * limit,
            ],
            type: QueryTypes.SELECT,
        }
    );

    products.forEach((value, index, array) => {
        value.price = value.price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    });

    return { totalPages, products };
};

export const getRelativeProductListByCategorySlug = async (contextObject) => {
    const { categorySlug, limit } = contextObject;

    const relativeProducts = await sequelize.query(
        `SELECT product.name, product.price, product.slug, product_image.imageUrl
        FROM product JOIN product_image ON product.id = product_image.productId JOIN category_brand ON product.categoryBrandId = category_brand.id JOIN category ON category_brand.categoryId = category.id
        WHERE category.slug = ? AND product_image.numberOrder = 1
        ORDER BY RAND()
        LIMIT ?`,
        { replacements: [categorySlug, limit], type: QueryTypes.SELECT }
    );

    relativeProducts.forEach((value, index, array) => {
        value.price = value.price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    });

    return { relativeProducts };
};

export const getProductByProductSlug = async (contextObject) => {
    const { productSlug } = contextObject;

    const product = await sequelize.query(
        `SELECT product.name, product.description, product.price
        FROM product
        WHERE product.slug = ?`,
        { replacements: [productSlug], type: QueryTypes.SELECT }
    );

    product[0].price = product[0].price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return { product: product[0] };
};
