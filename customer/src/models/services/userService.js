import pkg from "sequelize";
import sequelize from "../../config/database/index.js";
import User from "../user.js";

const { QueryTypes } = pkg;

export const getUser = async (contextObject) => {
    const { email } = contextObject;

    const user = await sequelize.query(
        `SELECT fullName, phoneNumber, address, email, password, avatarUrl, activated, blocked
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
