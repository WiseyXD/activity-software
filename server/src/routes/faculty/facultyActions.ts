require("dotenv").config();
import express, { Request, Response } from "express";
import { TProtectedFaculty } from "../../types";
import { authenticateToken } from "../../middleware/authenticateToken";
import technicalEventRouter from "./facultyTechnicalEvents";

const actionsRouter = express.Router();
actionsRouter.use(authenticateToken);

actionsRouter.use("/technical", technicalEventRouter);

export default actionsRouter;
