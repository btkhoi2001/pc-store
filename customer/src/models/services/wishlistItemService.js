import pkg from "sequelize";
import sequelize from "../../config/database/index.js";
import WishlistItem from "../wishlistItem.js";

const { QueryTypes } = pkg;

export const addItemToWishlist = async (contextObject) => {
    const { productId, userId } = contextObject;

    const wishlist = await sequelize.query(
        `SELECT *
        FROM wishlist
        WHERE userId = ?`,
        { replacements: [userId], type: QueryTypes.SELECT }
    );

    const wishlistItem = await WishlistItem.findOrCreate({
        where: {
            productId,
            wishlistId: wishlist[0].id,
        },
    });

    return { wishlistItem };
};
