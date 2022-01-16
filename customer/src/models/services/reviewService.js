import pkg from "sequelize";
import sequelize from "../../config/database/index.js";
import Review from "../review.js";

const { QueryTypes } = pkg;

export const getReviews = async (contextObject) => {
    const { productId, page, limit } = contextObject;

    const totalRows = await sequelize.query(
        `SELECT COUNT(*) AS 'rows'
        FROM review JOIN user ON review.userId = user.id
        WHERE review.productId = ?`,
        { replacements: [productId], type: QueryTypes.SELECT }
    );

    const totalPages = Math.ceil(totalRows[0].rows / limit) || 1;

    const reviews = await sequelize.query(
        `SELECT user.fullName, review.rating, review.content, review.createdAt
        FROM review JOIN user ON review.userId = user.id
        WHERE review.productId = ?
        ORDER BY review.createdAt DESC
        LIMIT ? OFFSET ?`,
        {
            replacements: [productId, parseInt(limit), (page - 1) * limit],
            type: QueryTypes.SELECT,
        }
    );

    reviews.forEach((value, index, array) => {
        value.createdAt = value.createdAt.toLocaleDateString("vi-VN");
    });

    return { totalPages, reviews };
};

export const createReview = async (contextObject) => {
    const { productId, userId, content, rating } = contextObject;

    const newReview = await Review.create({
        productId,
        userId,
        content,
        rating,
    });

    newReview.dataValues.createdAt =
        newReview.dataValues.createdAt.toLocaleDateString("vi-VN");

    return { newReview };
};
