import {
    addItemToCart,
    deleteItemFromCart,
} from "../models/services/cartItemService.js";
import { getCart, getCartId } from "../models/services/cartService.js";

export const show = async (req, res) => {
    res.render("./cart/cart", {
        title: "Giỏ hàng",
    });
};

export const getCartAPI = async (req, res) => {
    let cartId;

    try {
        if (req.user) ({ cartId } = await getCartId({ userId: req.user.id }));
        else if (req.session.guestCartId)
            ({ cartId } = await getCartId({
                guestId: req.session.guestCartId,
            }));
        else return res.status(404);

        const cart = await getCart({ cartId });

        res.status(200).json({ cart });
    } catch (error) {
        return res.status(500).json({});
    }
};

export const addItemToCartAPI = async (req, res) => {
    const { productId, quantity } = req.body;
    let cartId;

    try {
        if (req.user) ({ cartId } = await getCartId({ userId: req.user.id }));
        else if (req.session.guestCartId)
            ({ cartId } = await getCartId({
                guestId: req.session.guestCartId,
            }));
        else return res.status(404);

        await addItemToCart({ productId, quantity, cartId });

        res.status(200).json({});
    } catch (error) {
        res.status(500).json({});
    }
};

export const deleteItemFromCartAPI = async (req, res) => {
    const { productId } = req.body;

    try {
        await deleteItemFromCart({ productId, cartId: res.locals.cart.id });

        res.status(200).json({});
    } catch (error) {
        res.status(500).json({});
    }
};
