import pkg from "sequelize";
import sequelize from "../../config/database/index.js";
import { addItemToCart } from "./cartItemService.js";
import Cart from "../cart.js";

const { QueryTypes } = pkg;

export const createCart = async (contextObject) => {
    const { userId } = contextObject;

    await Cart.create({
        userId,
    });
};

export const getCart = async (contextObject) => {
    const { userId, cartId } = contextObject;
    const cart = {};

    cart.items = await sequelize.query(
        `SELECT product.slug, product.name, product.price, product.id, cart_item.quantity, product_image.imageUrl, cart_item.quantity * product.price AS 'total'
        FROM cart JOIN cart_item ON cart.id = cart_item.cartId JOIN product ON cart_item.productId = product.id LEFT JOIN product_image ON product.id = product_image.productId
        WHERE (cart.id = ? OR cart.userId = ?) AND (product_image.numberOrder = 1 OR product_image.numberOrder IS NULL)`,
        { replacements: [cartId, userId], type: QueryTypes.SELECT }
    );

    cart.id = (
        await sequelize.query(
            `SELECT *
        FROM cart
        WHERE (cart.id = ? OR cart.userId = ?)`,
            { replacements: [cartId, userId], type: QueryTypes.SELECT }
        )
    )[0].id;

    cart.total = 0;
    cart.quantity = 0;

    for (const item of cart.items) {
        cart.total += item.total;
        cart.quantity += item.quantity;
    }

    cart.items.forEach((value, index, array) => {
        value.price = value.price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        value.total = value.total
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    });

    cart.total = cart.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return { cart };
};

export const getCartId = async (contextObject) => {
    const { guestId, userId } = contextObject;
    let cart;

    if (userId !== undefined) {
        cart = await sequelize.query(
            `SELECT id
            FROM cart
            WHERE userId = ?`,
            { replacements: [userId], type: QueryTypes.SELECT }
        );
    } else if (guestId !== undefined) {
        cart = await sequelize.query(
            `SELECT cartId AS id
            FROM guest_cart
            WHERE id = ?`,
            { replacements: [guestId], type: QueryTypes.SELECT }
        );
    }

    return { cartId: cart[0].id };
};

export const mergeCart = async (contextObject) => {
    const { guestId, userId } = contextObject;

    const guestCart = await sequelize.query(
        `SELECT cart_item.productId, cart_item.quantity
        FROM cart_item JOIN guest_cart ON cart_item.cartId = guest_cart.cartId
        WHERE guest_cart.id = ?`,
        { replacements: [guestId], type: QueryTypes.SELECT }
    );

    const cart = await sequelize.query(
        `SELECT id
        FROM cart
        WHERE cart.userId = ?`,
        { replacements: [userId], type: QueryTypes.SELECT }
    );

    for (const item of guestCart)
        await addItemToCart({
            cartId: cart[0].id,
            productId: item.productId,
            quantity: item.quantity,
        });
};
