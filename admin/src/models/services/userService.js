import pkg from "sequelize";
import sequelize from "../../config/database/index.js";
import User from "../user.js";

const { QueryTypes } = pkg;

export const getUsers = async (contextObject) => {
    const { search, page, limit, sortBy, blocked, role } = contextObject;

    let sortQuery;

    switch (sortBy) {
        case "id-asc":
            sortQuery = "ORDER BY user.id ASC";
            break;
        case "id-desc":
            sortQuery = "ORDER BY user.id DESC";
            break;
        case "name-asc":
            sortQuery = "ORDER BY user.fullName ASC";
            break;
        case "name-desc":
            sortQuery = "ORDER BY user.fullName DESC";
            break;
        case "email-asc":
            sortQuery = "ORDER BY user.email ASC";
            break;
        case "email-desc":
            sortQuery = "ORDER BY user.email DESC";
            break;
        case "new":
            sortQuery = "ORDER BY user.createdAt DESC";
            break;
        case "old":
            sortQuery = "ORDER BY user.createdAt ASC";
            break;
        default:
            sortQuery = "ORDER BY user.id ASC";
            break;
    }

    const totalRows = await sequelize.query(
        `SELECT COUNT(*) AS 'rows'
        FROM user
        WHERE (? OR user.id = ? OR user.fullName LIKE ? OR user.email LIKE ?) AND (? OR user.blocked = ?) AND user.role IN (?)`,
        {
            replacements: [
                search === undefined,
                search,
                `%${search}%`,
                `%${search}%`,
                blocked === undefined || blocked == "Tình trạng",
                blocked,
                role,
            ],
            type: QueryTypes.SELECT,
        }
    );

    console.log(totalRows[0].rows);
    const totalPages = Math.ceil(totalRows[0].rows / limit) || 1;

    const users = await sequelize.query(
        `SELECT user.id, user.fullName, user.email, user.createdAt, user.blocked, user.avatarUrl, user.address, user.phoneNumber, user.role, user.activated
        FROM user
        WHERE (? OR user.id = ? OR user.fullName LIKE ? OR user.email LIKE ?) AND (? OR user.blocked = ?) AND user.role IN (?)
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
                role,
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
        `SELECT id, fullName, phoneNumber, address, email, password, avatarUrl, activated, blocked, role
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
    const {
        userId,
        blocked,
        fullName,
        address,
        phoneNumber,
        avatarUrl,
        password,
    } = contextObject;

    await User.update(
        { blocked, fullName, address, phoneNumber, avatarUrl, password },
        {
            where: {
                id: userId,
            },
            omitNull: true,
        }
    );
};

export const updateAdmin = async (contextObject) => {
    const { adminId, activated } = contextObject;

    await User.update(
        { activated },
        {
            where: {
                id: adminId,
                role: "SubAdmin",
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
        role: "SubAdmin",
    });

    return { newUser };
};
