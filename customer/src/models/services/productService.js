import pkg from "sequelize";
import sequelize from "../../config/database/index.js";

const { QueryTypes } = pkg;

export const getProducts = async (contextObject) => {
    const {
        categorySlug,
        search,
        page,
        limit,
        minPrice,
        maxPrice,
        brands,
        categories,
        sortBy,
    } = contextObject;

    let sortQuery;

    switch (sortBy) {
        case "name-asc":
            sortQuery = "ORDER BY product.name ASC";
            break;
        case "name-desc":
            sortQuery = "ORDER BY product.name DESC";
            break;
        case "price-asc":
            sortQuery = "ORDER BY product.price ASC";
            break;
        case "price-desc":
            sortQuery = "ORDER BY product.price DESC";
            break;
        case "new":
            sortQuery = "ORDER BY product.createdAt DESC";
            break;
        case "old":
            sortQuery = "ORDER BY product.createdAt ASC";
            break;
        default:
            sortQuery = "ORDER BY product.name ASC";
            break;
    }

    const totalRows = await sequelize.query(
        `SELECT COUNT(*) AS 'rows'
        FROM product JOIN category_brand ON product.categoryBrandId = category_brand.id JOIN category ON category_brand.categoryId = category.id JOIN brand ON brand.id = category_brand.brandId
        WHERE (? OR product.name LIKE ?) AND (? OR category.slug = ?) AND product.archive = 0 AND (? OR brand.content IN (?)) AND (? OR category.content IN (?)) AND (? IS NULL OR product.price >= ?)  AND (? IS NULL OR product.price <= ?)`,
        {
            replacements: [
                search === undefined,
                `%${search}%`,
                categorySlug === undefined,
                categorySlug,
                brands === undefined,
                brands,
                categories == undefined,
                categories,
                minPrice,
                minPrice,
                maxPrice,
                maxPrice,
            ],
            type: QueryTypes.SELECT,
        }
    );

    const filterBrands = await sequelize.query(
        `SELECT DISTINCT brand.content
            FROM product JOIN category_brand ON product.categoryBrandId = category_brand.id JOIN category ON category_brand.categoryId = category.id JOIN brand ON brand.id = category_brand.brandId
            WHERE (? OR product.name LIKE ?) AND (? OR category.slug = ?) AND product.archive = 0 AND (? OR brand.content IN (?)) AND (? OR category.content IN (?)) AND (? IS NULL OR product.price >= ?)  AND (? IS NULL OR product.price <= ?)`,
        {
            replacements: [
                search === undefined,
                `%${search}%`,
                categorySlug === undefined,
                categorySlug,
                brands === undefined,
                brands,
                categories == undefined,
                categories,
                minPrice,
                minPrice,
                maxPrice,
                maxPrice,
            ],
            type: QueryTypes.SELECT,
        }
    );

    const filterCategories = await sequelize.query(
        `SELECT DISTINCT category.content
        FROM product JOIN category_brand ON product.categoryBrandId = category_brand.id JOIN category ON category_brand.categoryId = category.id JOIN brand ON brand.id = category_brand.brandId
        WHERE (? OR product.name LIKE ?) AND (? OR category.slug = ?) AND product.archive = 0 AND (? OR brand.content IN (?)) AND (? OR category.content IN (?)) AND (? IS NULL OR product.price >= ?)  AND (? IS NULL OR product.price <= ?)`,
        {
            replacements: [
                search === undefined,
                `%${search}%`,
                categorySlug === undefined,
                categorySlug,
                brands === undefined,
                brands,
                categories == undefined,
                categories,
                minPrice,
                minPrice,
                maxPrice,
                maxPrice,
            ],
            type: QueryTypes.SELECT,
        }
    );

    const totalPages = Math.ceil(totalRows[0].rows / limit) || 1;

    const products = await sequelize.query(
        `SELECT brand.content as 'brandContent', category.slug AS 'categorySlug', category.content AS 'categoryContent', product.id, product.name, product.slug, product.description, product.price, product_image.imageUrl, IFNULL(AVG(review.rating), 0) AS 'averageRating'
        FROM product JOIN category_brand ON product.categoryBrandId = category_brand.id JOIN category ON category_brand.categoryId = category.id JOIN product_image ON product_image.productId = product.id JOIN brand on brand.id = category_brand.brandId LEFT JOIN review ON product.id = review.productId
        WHERE (? OR product.name LIKE ?) AND (? OR category.slug = ?) AND product.archive = 0 AND (? OR brand.content IN (?)) AND (? OR category.content IN (?)) AND (? IS NULL OR product.price >= ?)  AND (? IS NULL OR product.price <= ?)
        GROUP BY category.slug, category.content, product.name, product.slug, product.description, product.price, product_image.imageUrl
        ${sortQuery}
        LIMIT ? OFFSET ?`,
        {
            replacements: [
                search === undefined,
                `%${search}%`,
                categorySlug === undefined,
                categorySlug,
                brands === undefined,
                brands,
                categories == undefined,
                categories,
                minPrice,
                minPrice,
                maxPrice,
                maxPrice,
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

    return { totalPages, products, filterBrands, filterCategories };
};

export const getRelativeProducts = async (contextObject) => {
    const { categorySlug, limit } = contextObject;

    const relativeProducts = await sequelize.query(
        `SELECT product.id, product.name, product.price, product.slug, product_image.imageUrl, IFNULL(AVG(review.rating), 0) AS 'averageRating'
        FROM product JOIN product_image ON product.id = product_image.productId JOIN category_brand ON product.categoryBrandId = category_brand.id JOIN category ON category_brand.categoryId = category.id LEFT JOIN review ON product.id = review.productId
        WHERE (? OR category.slug IN (?)) AND product_image.numberOrder = 1
        GROUP BY product.id, product.name, product.price, product.slug, product_image.imageUrl
        ORDER BY RAND()
        LIMIT ?`,
        {
            replacements: [categorySlug === undefined, categorySlug, limit],
            type: QueryTypes.SELECT,
        }
    );

    relativeProducts.forEach((value, index, array) => {
        value.price = value.price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    });

    return { relativeProducts };
};

export const getProduct = async (contextObject) => {
    const { productSlug, productId } = contextObject;

    const product = await sequelize.query(
        `SELECT product.id, product.name, product.description, product.price, product.slug, IFNULL(AVG(review.rating), 0) AS 'averageRating'
        FROM product LEFT JOIN review ON product.id = review.productId
        WHERE product.slug = ? OR product.id = ?
        GROUP BY product.id, product.name, product.description, product.price, product.slug`,
        { replacements: [productSlug, productId], type: QueryTypes.SELECT }
    );

    if (product[0] !== undefined)
        product[0].price = product[0].price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return { product: product[0] };
};
