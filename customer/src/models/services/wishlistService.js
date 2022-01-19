import pkg from "sequelize";
import sequelize from "../../config/database/index.js";
import Wishlist from "../wishlist.js";

const { QueryTypes } = pkg;

export const createWishlist = async (contextObject) => {
    const { userId } = contextObject;

    await Wishlist.create({
        userId,
    });
};

export const getWishlist = async (contextObject) => {
    const { userId } = contextObject;

    const wishlist = await sequelize.query(
        `SELECT product.slug, product.name, product.price, product.id, product_image.imageUrl
        FROM wishlist JOIN wishlist_item ON wishlist.id = wishlist_item.wishlistId JOIN product ON wishlist_item.productId = product.id LEFT JOIN product_image ON product.id = product_image.productId
        WHERE wishlist.userId = ? AND (product_image.numberOrder = 1 OR product_image.numberOrder IS NULL)`,
        { replacements: [userId], type: QueryTypes.SELECT }
    );

    wishlist.forEach((value, index, array) => {
        value.price = value.price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    });

    return { wishlist };
};
