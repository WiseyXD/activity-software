require("dotenv").config();
import { prisma } from "../../prisma";
import express, { Request, Response } from "express";
import { TProtectedFaculty, TTechnicalEvent } from "../../types";
import {
    createTechnicalEvent,
    findEventsByUserId,
} from "../../controllers/faculty/technicalEventControllers";

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
    "/update",
    async (
        req: Request<{ params: string }, {}, {}, { query: string }>,
        res: Response
    ) => {
        const id = req.id;
        const createdBy = { id: req.id };
        const events = await findEventsByUserId(id);
        if (!events) res.status(500).json({ error: "No Event Created" });
        res.status(201).json({ events });
    }
);

export default technicalEventRouter;
