import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";

import { Messages } from "../utils/constans.js";

dotenv.config();

const jwtExport = {};

jwtExport.createToken = (user) => {
    const payload = {
        token_type: "access",
        user_id: user._id,
        userName: user.userName,
    }

    var token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    return token
}

jwtExport.verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log("tk vef", token)
        if (!token) {
            return res.status(401).send({ messageDetail: Messages.REQUIRED_TOKEN, isSucess: false });
        }


        const tokenRes = token.split(" ")[1];

        const decoded = jwt.verify(tokenRes, process.env.JWT_SECRET);
        req.user = decoded;

    } catch (err) {
        if (err.message === "jwt expired") {

            return res.status(401).send({ messageDetail: Messages.TOKEN_EXPIRED, isSucess: false });
        }

        return res.status(401).send({ error: err, messageDetail: Messages.TOKEN_INVALID, isSucess: false });
    }

    return next();
};

jwtExport.soloAdmin = (req, res, next) => {
    const logged = checkingCookie(req);
    if (logged) return next();
    return res.redirect("/")
};

jwtExport.soloPublic = (req, res, next) => {
    const logged = checkingCookie(req);
    if (!logged) return next();
    return res.redirect("/admin")
};


async function checkingCookie(req) {
    try {
        //console.log("COOKIE",req.headers.cookie)
        const cookieJWT = req.headers.cookie.split(";").find(cookie => cookie.startsWith("jwt=")).slice(4);
        //console.log("COOKIE SLICE",cookieJWT)
        const decrypt = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
        //console.log(decrypt)
        const user = await userModel.findOne({ email: emailDB });
        console.log(user)
        if (!user) {
            return false;
        }
        return true;
    } catch {
        return false
    }
}


export default jwtExport;