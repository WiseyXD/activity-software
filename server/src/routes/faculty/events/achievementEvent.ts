require("dotenv").config();
import { prisma } from "../../../prisma";
import express, { Request, Response } from "express";
import { TAchievement } from "../../../types";
import {
    createAchievement,
    deleteEventById,
    findEventsByUserId,
    updateEventById,
    updateParticipant,
} from "../../../controllers/faculty/achievementEventControllers";

const achievementEventRouter = express.Router();

achievementEventRouter.post("/create", createAchievement);

achievementEventRouter.get("/read", findEventsByUserId);

achievementEventRouter.put("/update/:eventId", updateEventById);

achievementEventRouter.put(
    "/update/participant/:participantId",
    updateParticipant
);

achievementEventRouter.delete("/delete/:eventId", deleteEventById);

export default achievementEventRouter;
