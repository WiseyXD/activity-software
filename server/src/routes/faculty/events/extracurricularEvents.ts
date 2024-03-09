require("dotenv").config();
import { prisma } from "../../../prisma";
import express, { Request, Response } from "express";
import { TExtracurricularEvent } from "../../../types";
import {
    createExtracuricullarEvent,
    deleteEventById,
    findEventsByUserId,
    updateEventById,
} from "../../../controllers/faculty/extracuricullarEventControllers";

const extracurricularEventRouter = express.Router();

extracurricularEventRouter.post("/create", createExtracuricullarEvent);

extracurricularEventRouter.get("/read", findEventsByUserId);

extracurricularEventRouter.put("/update/:eventId", updateEventById);

extracurricularEventRouter.delete("/delete/:eventId", deleteEventById);

export default extracurricularEventRouter;
