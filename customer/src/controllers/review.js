import { createReview, getReviews } from "../models/services/reviewService.js";

export const getReviewsAPI = async (req, res) => {
    const { productId, page, limit } = req.query;

    try {
        const { totalPages, reviews } = await getReviews({
            productId,
            page,
            limit,
        });

        res.status(200).json({ totalPages, reviews });
    } catch (error) {
        res.status(500).json({});
    }
};

export const createReviewAPI = async (req, res) => {
    const { rating, content, productId } = req.body;
    const userId = req.user.id;

    if (!content)
        return res
            .status(400)
            .json({ message: "Nhận xét không được để trống" });

    if (!rating || !productId) return res.status(400).json({});

    try {
        const { newReview } = await createReview({
            userId,
            productId,
            rating,
            content,
        });

        newReview.dataValues.fullName = req.user.fullName;

        res.status(201).json({ newReview: newReview.dataValues });
    } catch (error) {
        res.status(500).json({});
    }
};
