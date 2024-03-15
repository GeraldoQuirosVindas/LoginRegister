import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Messages } from "../utils/constans.js";

dotenv.config();

const jwtExport = {};

jwtExport.createToken = (user) => {
    const payload = {
        token_type: "access",
        user_id: user._id,
        userName: user.userName,
    }

    var token  = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token
}

jwtExport.verifyToken = (req, res, next) => {
    
 
    try {
                    
            const token = req.headers.authorization;

    
            if(!token){
                return res.status(401).send({ messageDetail: Messages.REQUIRED_TOKEN,isSucess:false }); 
            }


            const tokenRes = token.split(" ")[1];

            const decoded = jwt.verify(tokenRes, process.env.JWT_SECRET);
            req.user = decoded;

    } catch (err) {
        if(err.message==="jwt expired"){

            return res.status(401).send({ messageDetail: Messages.TOKEN_EXPIRED,isSucess:false }); 
        }
    
        return res.status(401).send({ error:err,messageDetail: Messages.TOKEN_INVALID,isSucess:false });
    }

    return next();
};

export default jwtExport;