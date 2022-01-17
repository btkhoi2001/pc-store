import ResetPasswordToken from "../resetPasswordToken.js";

export const createVerificationToken = async (contextObject) => {
    const { userId } = contextObject;

    await VerificationToken.create({ userId });
};
