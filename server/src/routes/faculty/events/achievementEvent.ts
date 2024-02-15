require("dotenv").config();
import { prisma } from "../../../prisma";
import express, { Request, Response } from "express";
import { TAchievement } from "../../../types";
import {
    addParticipant,
    createAchievement,
    deleteEventById,
    deleteParticipant,
    findEventsByUserId,
    updateEventById,
    updateParticipant,
} from "../../../controllers/faculty/achievementEventControllers";

const achievementEventRouter = express.Router();

achievementEventRouter.post("/create", createAchievement);

achievementEventRouter.get("/read", findEventsByUserId);

achievementEventRouter.put("/update/:eventId", updateEventById);

achievementEventRouter.delete("/delete/:eventId", deleteEventById);

// participants route
achievementEventRouter.put(
    "/update/participant/:participantId",
    updateParticipant
);

achievementEventRouter.delete(
    "/delete/participant/:participantId",
    deleteParticipant
);

achievementEventRouter.post(
    "/create/participant/:achievementId",
    addParticipant
);

export default achievementEventRouter;
