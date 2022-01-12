import pkg from "sequelize";
import sequelize from "../../config/database/index.js";

const { QueryTypes } = pkg;

export const getCart = async (contextObject) => {
    const { userId, cartId } = contextObject;
    const cart = {};

    cart.items = await sequelize.query(
        `SELECT product.slug, product.name, product.price, cart_item.quantity, product_image.imageUrl
        FROM cart JOIN cart_item ON cart.id = cart_item.cartId JOIN product ON cart_item.productId = product.id JOIN product_image ON product.id = product_image.productId
        WHERE (cart.id = ? OR userId = ?) AND (product_image.numberOrder = 1 OR 1)`,
        { replacements: [cartId, userId], type: QueryTypes.SELECT }
    );

    cart.total = 0;
    cart.quantity = 0;

    for (const item of cart.items) {
        cart.total += item.price * item.quantity;
        cart.quantity += item.quantity;
    }

    cart.items.forEach((value, index, array) => {
        value.price = value.price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    });

    cart.total = cart.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return { cart };
};
