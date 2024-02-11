require("dotenv").config();
import { prisma } from "../../prisma";
import express, { Request, Response } from "express";
import { TProtectedFaculty, TTechnicalEvent } from "../../types";
import { createTechnicalEvent } from "../../controllers/faculty/technicalEventControllers";

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

export default technicalEventRouter;
