require("dotenv").config();
import { prisma } from "../../../prisma";
import express, { Request, Response } from "express";
import { TAchievement } from "../../../types";
import {
    createAchievement,
    deleteEventById,
    findEventsByUserId,
    updateEventById,
} from "../../../controllers/faculty/achievementEventControllers";

const achievementEventRouter = express.Router();

achievementEventRouter.post("/create", createAchievement);

achievementEventRouter.get(
    "/read",
    async (
        req: Request<{ params: string }, {}, TAchievement, { query: string }>,
        res: Response
    ) => {
        const id = req.id;
        const createdBy = { id: req.id };
        const events = await findEventsByUserId(id);
        if (!events) res.status(500).json({ error: "No Event Created" });
        res.status(201).json({ events });
    }
);

achievementEventRouter.put(
    "/update/:eventId",
    async (
        req: Request<{ eventId: string }, {}, TAchievement, { query: string }>,
        res: Response
    ) => {
        const id = req.params.eventId;
        const eventData = req.body;
        const event = await updateEventById(id, eventData);
        if (!event)
            res.status(500).json({ error: "Error while event updation" });
        res.status(201).json({ event });
    }
);

achievementEventRouter.delete(
    "/delete/:eventId",
    async (
        req: Request<{ eventId: string }, {}, {}, { query: string }>,
        res: Response
    ) => {
        const id = req.params.eventId;
        try {
            const event = await deleteEventById(id);

            res.status(200).json({ event });
        } catch (error: any) {
            const msg = error.message;
            res.status(500).json({ msg });
        }
    }
);

export default achievementEventRouter;
