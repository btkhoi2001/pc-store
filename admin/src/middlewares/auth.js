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

                if (!user || !user.admin) return done(null, false);

                const passwordValid = await argon2.verify(
                    user.password,
                    password
                );

                if (!passwordValid) return done(null, false);

                return done(null, user);
            } catch (error) {
                console.log(error);
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
