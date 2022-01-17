import pkg from "sequelize";
import sequelize from "../../config/database/index.js";
import ResetPasswordToken from "../resetPasswordToken.js";

const { QueryTypes } = pkg;

export const createResetPasswordToken = async (contextObject) => {
    const { userId } = contextObject;

    const newToken = await ResetPasswordToken.upsert(
        { userId },
        {
            where: {
                userId,
            },
        }
    );

    return { newToken: newToken[0] };
};

export const getResetPasswordToken = async (contextObject) => {
    const { tokenId } = contextObject;

    const token = await sequelize.query(
        `SELECT *
        FROM reset_password_token
        WHERE id = ?`,
        { replacements: [tokenId], type: QueryTypes.SELECT }
    );

    return { token: token[0] };
};

export const deleteResetPasswordToken = async (contextObject) => {
    const { tokenId } = contextObject;

    await ResetPasswordToken.destroy({
        where: {
            id: tokenId,
        },
    });
};
