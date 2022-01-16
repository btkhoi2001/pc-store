import pkg from "sequelize";
import sequelize from "../../config/database/index.js";
import User from "../user.js";

const { QueryTypes } = pkg;

export const getUser = async (contextObject) => {
    const { email, userId } = contextObject;

    const user = await sequelize.query(
        `SELECT fullName, phoneNumber, address, email, password, avatarUrl, activated, blocked, admin
        FROM user
        WHERE (? OR email = ?) AND (? OR id = ?)`,
        {
            replacements: [
                email === undefined,
                email,
                userId === undefined,
                userId,
            ],
            type: QueryTypes.SELECT,
        }
    );

    return { user: user[0] };
};

export const registerUser = async (contextObject) => {
    const { name, email, password } = contextObject;

    const newUser = await User.create({
        fullName: name,
        email,
        password,
        admin: true,
    });

    return { newUser };
};

export const getUserAdminList = async (contextObject) => {
    const admins = await sequelize.query(
        `SELECT id, fullName, email, avatarUrl, activated, createdAt
        FROM user
        WHERE admin = 1`,
        { type: QueryTypes.SELECT }
    );

    return { admins };
};
