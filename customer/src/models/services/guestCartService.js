import pkg from "sequelize";
import sequelize from "../../config/database/index.js";
import GuestCart from "../guestCart.js";
import Cart from "../cart.js";

const { QueryTypes } = pkg;

export const getGuestCart = async (contextObject) => {
    const { id } = contextObject;

    const guestCart = await sequelize.query(
        `SELECT *
        FROM guest_cart
        WHERE id = ?`,
        { replacements: [id], type: QueryTypes.SELECT }
    );

    return { guestCart: guestCart[0] };
};

export const createGuestCart = async () => {
    const newCart = await Cart.create();
    const newGuestCart = await GuestCart.create({
        cartId: newCart.id,
    });

    return { newGuestCart };
};
