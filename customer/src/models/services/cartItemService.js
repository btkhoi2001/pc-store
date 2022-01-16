import pkg from "sequelize";
import sequelize from "../../config/database/index.js";
import CartItem from "../cartItem.js";

const { QueryTypes } = pkg;

export const addItemToCart = async (contextObject) => {
    const { productId, cartId } = contextObject;
    const quantity = contextObject.quantity || 1;
    let newCartItem;

    const cartItem = await CartItem.findAll({
        where: {
            productId,
            cartId,
        },
    });

    if (cartItem.length > 0)
        newCartItem = await CartItem.increment(
            { quantity },
            { where: { productId, cartId } }
        );
    else newCartItem = await CartItem.create({ productId, quantity, cartId });

    return { newCartItem };
};

export const deleteItemFromCart = async (contextObject) => {
    const { productId, cartId } = contextObject;

    const deletedItem = await CartItem.destroy({
        where: {
            productId,
            cartId,
        },
    });

    return { deletedItem };
};

export const emptyCart = async (contextObject) => {
    const { cartId } = contextObject;

    const deletedItem = await CartItem.destroy({
        where: {
            cartId,
        },
    });

    return { deletedItem };
};
