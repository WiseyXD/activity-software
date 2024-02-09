require("dotenv").config();
import express, { Request, Response } from "express";
import authRouter from "./facultyAuth";
import actionsRouter from "./facultyActions";

const facultyRouter = express.Router();

facultyRouter.use("/auth", authRouter);
facultyRouter.use("/actions", actionsRouter);

export default facultyRouter;
