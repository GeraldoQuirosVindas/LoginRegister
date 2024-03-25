import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";

import { Messages } from "../utils/constans.js";

dotenv.config();

function soloAdmin(req, res, next) {
    const logged = checkingCookie(req);
    if (logged) return next();
    return res.redirect("/")
};

function soloPublic(req, res, next) {
    const logged = checkingCookie(req);
    console.log(logged)
    if (!logged) return next();
    return res.redirect("/admin")
};


async function checkingCookie(req) {
    try {
        //console.log("COOKIE",req.headers.cookie)
        const cookieJWT = req.headers.cookie.split(";").find(cookie => cookie.startsWith("jwt=")).slice(4);
        //console.log("COOKIE SLICE",cookieJWT)
        const decrypt = jwt.verify(cookieJWT, process.env.JWT_SECRET);
        console.log(decrypt)
        const user = await userModel.findOne({ email: emailDB });
        console.log("x", user)
        if (!user) {
            return false;
        }
        return true;
    } catch {
        return false
    }
}
export const methods = { soloAdmin, soloPublic }