require("dotenv").config();
import { prisma } from "../../../prisma";
import express, { Request, Response } from "express";
import { TProtectedFaculty, TTechnicalEvent } from "../../../types";
import {
    createTechnicalEvent,
    deleteEventById,
    findEventsByUserId,
    updateEventById,
} from "../../../controllers/faculty/technicalEventControllers";

const technicalEventRouter = express.Router();

technicalEventRouter.post(
    "/create",
    createTechnicalEvent
);

technicalEventRouter.get(
    "/read",
    findEventsByUserId
);

technicalEventRouter.put(
    "/update/:eventId",
     updateEventById
);

technicalEventRouter.delete(
    "/delete/:eventId",
    deleteEventById
);

export default technicalEventRouter;
