import userModel from "../models/userModel.js";
import bcryptjs from "bcryptjs"
import jwtExport from "../middleware/jwtAuth.js"
import dotenv from "dotenv";
import { Messages } from "../utils/constans.js";

dotenv.config();

const authController = {};

authController.createUser = async (req,res) => {
    try {
        console.log("req.body",req.body);
        const user = new userModel({
            userName: req.body.user,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
        });

        const arrayFilter = [
            {
              email: req.body.email,
              phone: req.body.phone,
            },
          ];
        console.log("arrayfilter",arrayFilter)
        const isExist = await userModel.findOne({
            $or: arrayFilter,
        });

        if (isExist) {
            console.log("isExist",isExist)
            return res.status(202).send({
                messageDetail: Messages.EXIST_USER,
                isSucess: true,
            });
        }
        console.log("user",user)
        await user.save();

        var response = {
            userName: user.userName,
            phone: user.phone,
            email: user.email,
            password: user.password
        };
        console.log("response",response)

        return res.status(200).send({ data: response, messageDetail:Messages.MSG_SUCCESS, isSucess: true, redirect:"/"});
    }catch (error){
        if (error){
            var field = null;
            for (field in error.errors) {
              if (error.errors[field].kind == "required") {
                return res.status(400).send({
                  data: error.errors[field].message,
                  messageDetail: Messages.MSG_ERROR,
                  isSucess: false,
                });
                }
            }
        }
        return res.status(500).send({
            data: [],
            messageDetail: Messages.MSG_ERROR,
            isSucess: false,
        });
    }
}

authController.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)    
        if(!email || !password){
            return res.status(400).send({
            data: "Email and password are required",
            messageDetail: Messages.MSG_ERROR,
            isSucess: false,
            });
        }
        var emailDB = email.toLowerCase();

        const user = await userModel.findOne({ email: emailDB });

        if (!user) {      
            return res.status(401).send({
            messageDetail: Messages.UNKNOWN_USER,
            isSucess: false,
            });
        }
        
        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {      
            return res.status(401).send({
            messageDetail: Messages.ERROR_CREDENTIALS,
            isSucess: false,
            });
        }
      
        var responseUser = {
            email: emailDB,
            token: jwtExport.createToken(user)
        };
        
        console.log("tk",responseUser.token)
        return res.status(200).send({
            data: responseUser,
            messageDetail: Messages.MSG_SUCCESS,
            isSucess: true,
            redirect:"/admin",
        });
    } catch (error) {    
        return res.status(500).send({
        error: error.message,
        messageDetail: Messages.MSG_ERROR,
        isSucess: false,
        });
    }
}

export default authController;
