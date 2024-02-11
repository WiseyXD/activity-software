require("dotenv").config();
import express, { Request, Response } from "express";
import { TProtectedFaculty } from "../../types";
import { authenticateToken } from "../../middleware/authenticateToken";
import technicalEventRouter from "./events/technicalEvents";
import extracurricularEventRouter from "./events/extracurricularEvents";
import placementEventRouter from "./events/placementEvent";
import achievementEventRouter from "./events/achievementEvent";

const actionsRouter = express.Router();
actionsRouter.use(authenticateToken);

actionsRouter.use("/technical", technicalEventRouter);
actionsRouter.use("/extracuricullar", extracurricularEventRouter);
actionsRouter.use("/placement", placementEventRouter);
actionsRouter.use("/achievement", achievementEventRouter);

export default actionsRouter;
