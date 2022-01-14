import {
    createGuestCart,
    getGuestCart,
} from "../models/services/guestCartService.js";
import { getCart } from "../models/services/cartService.js";
import { getWishlist } from "../models/services/wishlistService.js";

export const sessionHandler = async (req, res, next) => {
    try {
        if (req.user === undefined) {
            const guestCartId = req.session.guestCartId;

            if (guestCartId) {
                const { guestCart } = await getGuestCart({ id: guestCartId });

                if (guestCart) {
                    const { cart } = await getCart({
                        cartId: guestCart.cartId,
                    });

                    res.locals.cart = cart;

                    return next();
                }
            }

            const { newGuestCart } = await createGuestCart();
            const { cart } = await getCart({ cartId: newGuestCart.cartId });

            res.locals.cart = cart;
            req.session.guestCartId = newGuestCart.id;

            return next();
        }

        const { cart } = await getCart({ userId: req.user.id });
        const { wishlist } = await getWishlist({ userId: req.user.id });

        res.locals.cart = cart;
        res.locals.wishlist = wishlist;

        next();
    } catch (error) {
        console.log(error);
    }
};
