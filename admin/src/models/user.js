import pkg from "sequelize";
import sequelize from "../config/database/index.js";

const { DataTypes } = pkg;

const User = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        fullName: {
            type: DataTypes.STRING(150),
            default: "",
        },
        phoneNumber: {
            type: DataTypes.STRING(12),
            default: "",
        },
        address: {
            type: DataTypes.STRING(150),
            default: "",
        },
        email: {
            type: DataTypes.STRING(100),
            default: "",
        },
        avatarUrl: DataTypes.STRING(200),
        password: DataTypes.STRING(256),
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        activated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        blocked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: "user",
    }
);

User.sync({ logging: false });

export default User;
