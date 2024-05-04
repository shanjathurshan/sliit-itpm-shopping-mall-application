import express from "express";
import {  signgin, signout, signup } from "../controller/auth.controller.js";


const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signgin);
route.post('/signout', signout);

export default route;