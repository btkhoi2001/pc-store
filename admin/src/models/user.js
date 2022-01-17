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
        fullName: DataTypes.STRING(150),
        phoneNumber: DataTypes.STRING(12),
        address: DataTypes.STRING(150),
        email: DataTypes.STRING(100),
        avatarUrl: DataTypes.STRING(200),
        password: DataTypes.STRING(256),
        role: {
            type: DataTypes.ENUM("User", "Admin", "SubAdmin"),
            default: "User",
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
