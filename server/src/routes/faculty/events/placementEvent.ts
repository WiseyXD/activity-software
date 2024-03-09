require("dotenv").config();
import { prisma } from "../../../prisma";
import express, { Request, Response } from "express";
import { TProtectedFaculty, TPlacement } from "../../../types";
import {
    createPlacementEvent,
    deleteEventById,
    findEventsByUserId,
    updateEventById,
} from "../../../controllers/faculty/placementControllers";

const placementEventRouter = express.Router();

placementEventRouter.post(
    "/create",
    createPlacementEvent
);

placementEventRouter.get(
    "/read",
    findEventsByUserId
);

placementEventRouter.put(
    "/update/:eventId",
    updateEventById
);

placementEventRouter.delete(
    "/delete/:eventId",
    deleteEventById
);

export default placementEventRouter;
