import pkg from "sequelize";
import sequelize from "../../config/database/index.js";
import User from "../user.js";

const { QueryTypes } = pkg;

export const getUsers = async (contextObject) => {
    const { search, page, limit, sortBy, blocked, admin } = contextObject;

    let sortQuery;

    switch (sortBy) {
        case "name-asc":
            sortQuery = "ORDER BY `order`.fullName ASC";
            break;
        case "name-desc":
            sortQuery = "ORDER BY `order`.fullName DESC";
            break;
        case "email-asc":
            sortQuery = "ORDER BY `order`.email ASC";
            break;
        case "email-desc":
            sortQuery = "ORDER BY `order`.email DESC";
            break;
        case "total-asc":
            sortQuery = "ORDER BY `order`.total ASC";
            break;
        case "total-desc":
            sortQuery = "ORDER BY `order`.total DESC";
            break;
        case "new":
            sortQuery = "ORDER BY `order`.createdAt DESC";
            break;
        case "old":
            sortQuery = "ORDER BY `order`.createdAt ASC";
            break;
        default:
            sortQuery = "ORDER BY user.id ASC";
            break;
    }

    const totalRows = await sequelize.query(
        `SELECT COUNT(*)
        FROM user
        WHERE (? OR user.id = ? OR user.fullName LIKE ? OR user.email LIKE ?) AND (? OR blocked = ?) AND admin = ? AND user.activated = 1 AND admin = 0`,
        {
            replacements: [
                search === undefined,
                search,
                `%${search}%`,
                `%${search}%`,
                blocked === undefined || blocked == "Tình trạng",
                blocked,
                admin,
            ],
            type: QueryTypes.SELECT,
        }
    );

    const totalPages = Math.ceil(totalRows[0].rows / limit) || 1;

    const users = await sequelize.query(
        `SELECT user.id, user.fullName, user.email, user.createdAt, user.blocked, user.avatarUrl
        FROM user
        WHERE (? OR user.id = ? OR user.fullName LIKE ? OR user.email LIKE ?) AND (? OR blocked = ?) AND admin = ? AND user.activated = 1 AND admin = 0
        ${sortQuery}
        LIMIT ? OFFSET ?`,
        {
            replacements: [
                search === undefined,
                search,
                `%${search}%`,
                `%${search}%`,
                blocked === undefined || blocked == "Tình trạng",
                blocked,
                admin,
                limit,
                (page - 1) * limit,
            ],
            type: QueryTypes.SELECT,
        }
    );

    users.forEach((value, index, array) => {
        value.createdAt = value.createdAt.toLocaleDateString("vi-VN");
    });

    return { totalPages, users };
};

export const getUser = async (contextObject) => {
    const { email, userId } = contextObject;

    const user = await sequelize.query(
        `SELECT id, fullName, phoneNumber, address, email, password, avatarUrl, activated, blocked, admin
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

export const updateUser = async (contextObject) => {
    const { userId, blocked } = contextObject;

    console.log(userId, blocked);

    await User.update(
        { blocked },
        {
            where: {
                id: userId,
            },
        }
    );
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
