import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { connectDb } from './DB/DBConection.js';
import authController from "./controllers/authentication.controller.js";

//Fix _dirname
import path from 'path';
import { fileURLToPath } from "url";
import jwtExport from "./middleware/jwtAuth.js";
const _dirname = path.dirname(fileURLToPath(import.meta.url));

//import { methods as authentication} from "./controllers/authentication.controller.js";
//import { methods as authorization } from "./middlewares/authorization.js";

dotenv.config();
connectDb();


//Server
const app = express();
app.set("port", process.env.PORT);
app.listen(app.get("port"));
console.log("Server running on port", app.get("port"));

//Config
app.use(express.static(_dirname + "/public"));
app.use(express.json());
app.use(cookieParser());

//Routes
app.get("/", jwtExport.verifyToken, (req, res) => res.sendFile(_dirname + "/pages/login.html"));
app.get("/register", jwtExport.verifyToken, (req, res) => res.sendFile(_dirname + "/pages/register.html"));
app.get("/admin", jwtExport.verifyToken, (req, res) => res.sendFile(_dirname + "/pages/admin/admin.html"));
app.post("/api/register", authController.createUser);
app.post("/api/login", authController.loginUser);


