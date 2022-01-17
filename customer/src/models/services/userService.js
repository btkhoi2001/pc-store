import pkg from "sequelize";
import sequelize from "../../config/database/index.js";
import User from "../user.js";

const { QueryTypes } = pkg;

export const getUser = async (contextObject) => {
    const { email } = contextObject;

    const user = await sequelize.query(
        `SELECT id, fullName, phoneNumber, address, email, password, avatarUrl, activated, blocked, role
        FROM user
        WHERE email = ?`,
        { replacements: [email], type: QueryTypes.SELECT }
    );

    return { user: user[0] };
};

export const registerUser = async (contextObject) => {
    const { name, email, password } = contextObject;

    const newUser = await User.create({
        fullName: name,
        email,
        password,
    });

    return { newUser };
};

export const updateAccount = async (contextObject) => {
    const {
        userId,
        fullName,
        phoneNumber,
        address,
        avatarUrl,
        password,
        activated,
    } = contextObject;

    const updatedAccount = await User.update(
        {
            fullName,
            phoneNumber,
            address,
            avatarUrl,
            password,
            activated,
        },
        {
            where: {
                id: userId,
            },
            omitNull: true,
        }
    );

    return { updatedAccount };
};
