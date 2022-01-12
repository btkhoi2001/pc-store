import {
    createGuestCart,
    getGuestCart,
} from "../models/services/guestCartService.js";
import { getCart } from "../models/services/cartService.js";

export const sessionHandler = async (req, res, next) => {
    try {
        if (req.user === undefined) {
            const guestCartId = req.session.guestCartId;

            if (guestCartId) {
                const { guestCart } = await getGuestCart({ id: guestCartId });

                if (guestCart) {
                    const { cart } = await getCart({
                        userId: guestCart.cartId,
                    });

                    res.locals.cart = cart;

                    return next();
                }
            }

            const { newGuestCart } = await createGuestCart();
            const { cart } = await getCart({ userId: newGuestCart.cartId });

            res.locals.cart = cart;
            req.session.guestCartId = newGuestCart.id;

            return next();
        }

        const { cart } = await getCart({ userId: req.user.id });
        console.log(cart);
        res.locals.cart = cart;

        next();
    } catch (error) {
        console.log(error);
    }
};
