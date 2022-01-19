import passportPkg from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import argon2 from "argon2";
import { getUser } from "../models/services/userService.js";

export const passport = passportPkg.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const { user } = await getUser({ email });

                if (!user || user.role != "User")
                    return done(null, false, {
                        message: "Thông tin đăng nhập không chính xác",
                    });

                if (!user.activated)
                    return done(null, false, {
                        message: "Tài khoản chưa được kích hoạt",
                    });

                if (user.blocked)
                    return done(null, false, {
                        message: "Tài khoản đã bị khóa",
                    });

                const passwordValid = await argon2.verify(
                    user.password,
                    password
                );

                if (!passwordValid)
                    return done(null, false, {
                        message: "Thông tin đăng nhập không chính xác",
                    });

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    try {
        const userInDB = (await getUser({ email: user.email })).user;

        if (userInDB.password != user.password) return done(null, false);

        return done(null, userInDB);
    } catch (error) {
        return done(null, false);
    }
});
