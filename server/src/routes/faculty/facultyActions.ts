require("dotenv").config();
import express, { Request, Response } from "express";
import { TProtectedFaculty } from "../../types";
import { authenticateToken } from "../../middleware/authenticateToken";
import technicalEventRouter from "./events/technicalEvents";
import extracurricularEventRouter from "./events/extracurricularEvents";

const actionsRouter = express.Router();
actionsRouter.use(authenticateToken);

actionsRouter.use("/technical", technicalEventRouter);
actionsRouter.use("/extracuricullar", extracurricularEventRouter);

export default actionsRouter;
