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
    async (
        req: Request<
            { params: string },
            {},
            TTechnicalEvent,
            { query: string }
        >,
        res: Response
    ) => {
        const {
            title,
            department,
            endDate,
            eventLevel,
            eventType,
            orgaisedFor,
            resourcePersonDesignation,
            resourcePersonDomain,
            resourcePersonName,
            resourcePersonOrg,
            startDate,
            typeOfParticipant,
        } = req.body;
        const createdBy = { id: req.id };
        const event = await createTechnicalEvent(
            title,
            department,
            createdBy,
            endDate,
            eventLevel,
            eventType,
            orgaisedFor,
            resourcePersonDesignation,
            resourcePersonDomain,
            resourcePersonName,
            resourcePersonOrg,
            startDate,
            typeOfParticipant
        );
        if (!event) res.status(500).json({ error: "Event creation error" });
        res.status(201).json({ msg: "Successfull creation" });
    }
);

technicalEventRouter.get(
    "/read",
    async (
        req: Request<
            { params: string },
            {},
            TTechnicalEvent,
            { query: string }
        >,
        res: Response
    ) => {
        const id = req.id;
        const createdBy = { id: req.id };
        const events = await findEventsByUserId(id);
        if (!events) res.status(500).json({ error: "No Event Created" });
        res.status(201).json({ events });
    }
);

technicalEventRouter.put(
    "/update/:eventId",
    async (
        req: Request<
            { eventId: string },
            {},
            TTechnicalEvent,
            { query: string }
        >,
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

technicalEventRouter.delete(
    "/delete/:eventId",
    async (
        req: Request<{ eventId: string }, {}, {}, { query: string }>,
        res: Response
    ) => {
        const id = req.params.eventId;
        const event = await deleteEventById(id);
        if (!event)
            res.status(500).json({ error: "Error while event deletion" });
        res.status(200).json({ event });
    }
);

export default technicalEventRouter;
