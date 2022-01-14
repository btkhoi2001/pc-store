import { addItemToWishlist } from "../models/services/wishlistItemService.js";
import { getWishlist } from "../models/services/wishlistService.js";

export const show = async (req, res) => {};

export const getWishlistAPI = async (req, res) => {
    try {
        const { wishlist } = await getWishlist({ userId: req.user.id });

        res.status(201).json({ wishlist });
    } catch (error) {
        res.status(500).json({});
    }
};

export const addItemToWishlistAPI = async (req, res) => {
    const { productId } = req.body;

    try {
        await addItemToWishlist({ productId, userId: req.user.id });

        res.status(201).json({});
    } catch (error) {
        res.status(500).json({ error });
    }
};
