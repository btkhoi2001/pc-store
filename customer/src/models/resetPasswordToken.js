import pkg from "sequelize";
import sequelize from "../config/database/index.js";
import User from "./user.js";

const { DataTypes } = pkg;

const ResetPasswordToken = sequelize.define(
    "reset_password_token",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        tokenExpires: {
            type: DataTypes.DATE,
            defaultValue: Date.now() + 86400,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        tableName: "reset_password_token",
    }
);

ResetPasswordToken.sync({ logging: false });

export default ResetPasswordToken;
