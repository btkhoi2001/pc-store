import Product from "../product.js";
import pkg from "sequelize";
import sequelize from "../../config/database/index.js";

const { QueryTypes } = pkg;

export const getProducts = async (contextObject) => {
    const { category, search, page, limit, sortBy } = contextObject;

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
            sortQuery = "ORDER BY product.createdAt DESC";
            break;
    }

    const totalRows = await sequelize.query(
        `SELECT COUNT(*) AS 'rows'
        FROM product JOIN category_brand ON product.categoryBrandId = category_brand.id JOIN category ON category_brand.categoryId = category.id
        WHERE (? OR product.name LIKE ?) AND (? OR category.content = ?) AND product.archive = 0`,
        {
            replacements: [
                search === undefined,
                `%${search}%`,
                category === undefined || category == "Mặt hàng",
                category,
            ],
            type: QueryTypes.SELECT,
        }
    );

    const totalPages = Math.ceil(totalRows[0].rows / limit) || 1;

    const products = await sequelize.query(
        `SELECT product.id, product.name, product.slug, product.description, product.price, product_image.imageUrl
        FROM product JOIN category_brand ON product.categoryBrandId = category_brand.id JOIN category ON category_brand.categoryId = category.id LEFT JOIN product_image ON product_image.productId = product.id
        WHERE (? OR product.name LIKE ?) AND (? OR category.content = ?) AND product.archive = 0 AND (product_image.numberOrder = 1 OR product_image.numberOrder IS NULL)
        ${sortQuery}
        LIMIT ? OFFSET ?`,
        {
            replacements: [
                search === undefined,
                `%${search}%`,
                category === undefined || category == "Mặt hàng",
                category,
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

export const getProduct = async (contextObject) => {
    const { productId } = contextObject;

    const product = await sequelize.query(
        `SELECT id, name, description, price, published, categoryBrandId
        FROM product
        WHERE id = ?`,
        { replacements: [productId], type: QueryTypes.SELECT }
    );

    return { product: product[0] };
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

export const updateProduct = async (contextObject) => {
    const { productId, name, description, categoryBrandId, price, published } =
        contextObject;

    await Product.update(
        { name, description, categoryBrandId, price, published },
        {
            where: {
                id: productId,
            },
            omitNull: true,
        }
    );
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
