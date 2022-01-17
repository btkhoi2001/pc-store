import pkg from "sequelize";
import sequelize from "../../config/database/index.js";
import VerificationToken from "../verificationToken.js";

const { QueryTypes } = pkg;

export const createVerificationToken = async (contextObject) => {
    const { userId } = contextObject;

    const newToken = await VerificationToken.upsert({ userId });

    return { newToken: newToken[0] };
};

export const getVerificationToken = async (contextObject) => {
    const { tokenId } = contextObject;

    const token = await sequelize.query(
        `SELECT *
        FROM verification_token
        WHERE id = ?`,
        { replacements: [tokenId], type: QueryTypes.SELECT }
    );

    return { token: token[0] };
};

export const deleteVerificationToken = async (contextObject) => {
    const { tokenId } = contextObject;

    await VerificationToken.destroy({
        where: {
            id: tokenId,
        },
    });
};
